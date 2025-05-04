import { Component, OnInit,AfterViewInit } from '@angular/core';
import { Terre } from '../listterre/Terre';
import { TerreService } from '../TerreService.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Contrat } from '../ajouter-contrat/contrat';
import { switchMap } from 'rxjs';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import * as L from 'leaflet';
import { SupabaseService } from '../services/supabase.service';
interface SearchHistory {
  location: string;
  searchCount: number;
}
declare var google: any;  // Declare google maps library
@Component({
  selector: 'app-terrefrontlist',
  templateUrl: './terrefrontlist.component.html',
  styleUrls: ['./style1.css']
})
export class TerrefrontlistComponent implements OnInit,AfterViewInit {
  terres: Terre[] = [];
  terres1: Terre[] = [];
  terre2: Terre[] = [];
  
  terrains:Terre[] = [];
  recommendedTerres: Terre[] = [];
  mostSearchedTerres: Terre[] = [];
  remainingTerres: Terre[] = [];
  searchHistory: SearchHistory[] = [];
  user: any;
  contracts: Contrat[] = []; // To store contracts of the logged-in user
  contracts1: Contrat[] = []; // To store contracts of the logged-in user
  totalIndice!:number
  models: any[] = [];
  constructor(
    private terreservice: TerreService, 
    private router: Router, 
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private supabase: SupabaseService
  ) {}

  ngOnInit(): void {
    this.getAllContrats();
    this.getTerrainsFromContracts();
    this.getLoggedInUser();
    this.fetchSearchHistory();
    this.fetchAllTerres();
    this.getContracts();
    this.loadModels();   
  }
  
  async loadModels() {
    this.models = await this.supabase.getAllModels();
  }

  viewModel(modelId: number) {
    this.router.navigate(['/viewer', modelId]);
  }

  navigateToClientContracts() {
    if (this.contracts.length > 0) {
      // Proceed to update the contract's indice if contracts are loaded
      this.contracts[0].indice = 0;
      this.terreservice.updateContrat(this.contracts[0]).subscribe(
        (response) => {
          console.log('Contract updated successfully:', response);
        },
        (error) => {
          console.error('Error updating contract:', error);
        }
      );
    } else {
      console.error('Contracts are not loaded yet!');
    }
  
    // Navigate after update
    this.router.navigate(['/clientcontart']);
  }
  
  
  getLoggedInUser() {
    const username = localStorage.getItem('username');
    const token = localStorage.getItem('token');
  
    if (username && token) {
      this.user = {
        username: username,
        token: token
      };
      return this.user;
    }
    return null; // No user found
  }

  fetchSearchHistory() {
    if (this.user?.username) {
      this.http.get<SearchHistory[]>(`http://localhost:8085/api4/terrain/searchHistory?username=${this.user.username}`)
        .subscribe(data => {
          this.searchHistory = data;
          console.log(this.searchHistory.length);
          // Check if searchHistory is empty
          if (this.searchHistory.length == 0) {
            // If search history is empty, fetch all terrains
            this.fetchAllTable();
          } else {
            // If search history has data, sort terrains
            this.sortTerres();
          }
        }, error => {
          console.error("Error fetching search history", error);
        });
    }
  }
  
  fetchAllTable() {
    // This is where you would fetch all the terrains from the API
    this.terreservice.getTerreList()
      .subscribe(data => {
        this.terre2 = data; // Assuming terre2 holds all the terrain data
        console.log("Fetched all terrains:", this.terre2);
        
      }, error => {
        console.error("Error fetching all terrains", error);
      });
      
  }
  

  fetchAllTerres() {
    this.terreservice.getTerreList().subscribe(data => {
      this.terres = data;
      this.terres1 = data;
      
      this.sortTerres();
    });
  }
  isContratSigned(idTerrain: number): boolean {
    console.log("Vérification du terrain ID:", idTerrain);

    let contrat = this.contracts1.find(c => c.idTerrain === idTerrain);
    console.log("Contrat trouvé:", contrat);

    if (!contrat) {
        console.log("Aucun contrat trouvé pour ce terrain.");
        return false;
    }


    let isSigned = !!contrat.signatureImage && !!contrat.signatureClient;
    console.log("Est signé ?", isSigned);

    return isSigned;
}


  sortTerres() {
   
  
    // Sort search history by search count (descending)
    const sortedSearches = this.searchHistory.sort((a, b) => b.searchCount - a.searchCount)
      .map(entry => entry.location);
  
    // Get the most searched location
    const mostSearchedLocation = sortedSearches.length > 0 ? sortedSearches[0] : null;
  
    // First, filter out terres that match the most searched location
    this.mostSearchedTerres = this.terres.filter(terre => terre.localisation === mostSearchedLocation);
  
    // Then, fetch recommended terrains based on the most searched location
    if (mostSearchedLocation) {
      this.terreservice.getRecommendedTerres(mostSearchedLocation).subscribe((recommendations: { location: string, distance: number }[]) => {
        // Now `recommendations` is an array of objects with location and distance
        console.log('Recommended locations:', recommendations);
  
        // Filter terres based on the recommended location
        this.recommendedTerres = this.terres1.filter(terre => {
          // Only include terres whose localisation matches a recommended location
          return recommendations.some(rec => rec.location === terre.localisation);
        });
  
        // Sort the recommended terrains by distance (ascending order)
        this.recommendedTerres.sort((a, b) => {
          const aDistance = recommendations.find(rec => rec.location === a.localisation)?.distance || Infinity;
          const bDistance = recommendations.find(rec => rec.location === b.localisation)?.distance || Infinity;
          return aDistance - bDistance;  // Sorting by distance
        });
  
        console.log('Sorted recommended terrains:', this.recommendedTerres);
  
        // Filter remaining terrains (those not in the most searched or recommended list)
        this.remainingTerres = this.terres1.filter(terre =>
          !this.mostSearchedTerres.includes(terre) && !this.recommendedTerres.includes(terre)
        );
  
        console.log('Remaining terrains:', this.remainingTerres);
  
        // Combine the results: Most Searched -> Recommended -> Remaining
        this.terre2 = [...this.mostSearchedTerres, ...this.recommendedTerres, ...this.remainingTerres];
        console.log('Combined terrains:', this.terre2);
 
        this.terres.forEach((terre) => {
   
          this.geocodeLocation(terre.localisation).then(coords => {
            const mapId = `map-${terre.idTerrain}`;
        
    
            const map = L.map(mapId).setView([coords.lat, coords.lon], 13);
          
    
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              attribution: '© OpenStreetMap contributors'
            }).addTo(map);
         
    
            L.marker([coords.lat, coords.lon]).addTo(map).bindPopup(terre.nom);
           
          }).catch(error => {
            console.error(`Erreur pour ${terre.nom}:`, error);
          });
        });
    
  
      }, error => {
        console.error('Error fetching recommended terres', error);
      });
    } else {
      // If no search history, consider all terrains as remaining
      this.remainingTerres = this.terres;
      this.terre2 = [...this.remainingTerres];
      this.terre2.forEach((terre) => {
          
     
        this.geocodeLocation(terre.localisation).then(coords => {
          const mapId = `map-${terre.idTerrain}`;
        
  
          const map = L.map(mapId).setView([coords.lat, coords.lon], 13);
       
  
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);
         
  
          L.marker([coords.lat, coords.lon]).addTo(map).bindPopup(terre.nom);
      
        }).catch(error => {
          console.error(`Erreur pour ${terre.nom}:`, error);
        });
      });
  
      
    }
  }
  
  getContracts() {
      if (!this.user) {
        console.error("User not defined");
        return;
      }
    
      console.log("User:", this.user);
      console.log("Username:", this.user.username);
    
      let contractsList: Contrat[] = [];
    
      this.terreservice.getUserContracts(this.user.username).pipe(
        switchMap((contracts: Contrat[]) => {
          console.log("Contracts received:", contracts);
          contractsList = contracts; // Temporarily store the contracts
          return this.terreservice.getTerreList(); // Fetch the terrain list
        })
      ).subscribe(
        (terrains: any[]) => {
          console.log("Terrains received:", terrains);
    
          // Associate each contract with its terrain and image
          this.contracts = contractsList.map(contract => {
            const terrain = terrains.find(t => t.idTerrain === contract.idTerrain); // Find the corresponding terrain
            return {
              ...contract,
              terrainImage: terrain?.imageterre ? `${terrain.imageterre}` : 'assets/default-image.jpg',
            };
          });
       
          // Calculate the sum of "indice" attributes from all contracts
        this.totalIndice = this.contracts.reduce((sum, contract) => sum + (contract.indice || 0), 0);
    
          console.log("Total Indice Sum:", this.totalIndice);
        },
        (error) => {
          console.error('Error loading contracts:', error);
        }
      );
    }
  
    ngAfterViewInit(): void {
      this.terre2.forEach((terre) => {
        console.log(`Starting to geocode location for: ${terre.nom}`);
        this.geocodeLocation(terre.localisation).then(coords => {
          const mapId = `map-${terre.idTerrain}`;
          console.log(`Geocoding successful. Coordinates for ${terre.nom}:`, coords);
  
          const map = L.map(mapId).setView([coords.lat, coords.lon], 13);
          console.log(`Map initialized for ${terre.nom} at coordinates:`, [coords.lat, coords.lon]);
  
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);
          console.log(`Tile layer added for ${terre.nom}`);
  
          L.marker([coords.lat, coords.lon]).addTo(map).bindPopup(terre.nom);
          console.log(`Marker added for ${terre.nom} at coordinates:`, [coords.lat, coords.lon]);
        }).catch(error => {
          console.error(`Erreur pour ${terre.nom}:`, error);
        });
      });
    }
  
    async geocodeLocation(address: string): Promise<{ lat: number, lon: number }> {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;
      console.log(`Sending request to geocode address: ${address}`);
      const response: any = await this.http.get(url).toPromise();
      if (response.length > 0) {
        console.log(`Geocode result for address ${address}:`, response[0]);
        return {
          lat: parseFloat(response[0].lat),
          lon: parseFloat(response[0].lon)
        };
      } else {
        throw new Error('Adresse introuvable');
      }
    }
    getAllContrats(): void {
      this.terreservice.getContractList().subscribe(
        (data: Contrat[]) => {
          this.contracts1 = data;
          console.log('Contrats récupéréeeeeeeeeeeeeeeeeeeeeeeees:', this.contracts1);
          
          // Loop through contracts and display idTerrain
          this.contracts1.forEach(contract => {
            console.log(`Contrat ID: ${contract.terrain.idTerrain}, Terrain ID: ${contract.idTerrain}`);
          });
        },
        (error) => {
          console.error('Erreur lors de la récupération des contrats', error);
        }
      );
    }
    getTerrainsFromContracts(): void {
      this.terreservice.getTerrefromContrat().subscribe(
        (data: Terre[]) => {
          this.terrains = data;
          console.log('Terrains récupérés:', this.terrains);
    
          // Mise à jour de l'attribut 'ban' de chaque terrain à 1
          this.terrains.forEach(terrain => {
            terrain.ban = 1;  // Met à jour l'attribut 'ban' pour chaque terrain
            this.terreservice.updateTerre(terrain).subscribe(
              (updatedTerrain) => {
                console.log('Terrain mis à jour:', updatedTerrain);
              },
              (error) => {
                console.error('Erreur lors de la mise à jour du terrain', error);
              }
            );
          });
        },
        (error) => {
          console.error('Erreur lors de la récupération des terrains', error);
        }
      );
    }
    
    
  saveSearchLocation(location: string) {
    const username = this.user?.username;
    if (username) {
      this.http.post(`http://localhost:8085/api4/terrain/add?username=${username}&location=${location}`, {}).subscribe(() => {
        console.log('Search location saved');
      }, error => {
        console.error('Error saving search location', error);
      });
    }
  }

  onTerreClick(location: string, idterrain: number): void {
    this.saveSearchLocation(location);
    this.router.navigate(['/papier', idterrain]);
  }
}
