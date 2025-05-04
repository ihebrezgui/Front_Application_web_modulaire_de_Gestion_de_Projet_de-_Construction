import { Component, OnInit } from '@angular/core';
import { TerreService } from '../TerreService.service'; // Adjust the import as per your file structure
import { Contrat } from '../ajouter-contrat/contrat'; // Import Contrat model
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-clientcontart',
  templateUrl: './clientcontart.component.html',
  styleUrls: ['./style1.css']
})
export class ClientcontartComponent implements OnInit {
  user: any; // To store logged-in user data
  contracts: Contrat[] = []; // To store contracts of the logged-in user

  constructor(private terrainService: TerreService, private router: Router) {}

  ngOnInit(): void {
    this.getLoggedInUser();
    this.getContracts();


  }

  
// Add these properties to your component class
// Component properties
showTimeModal: boolean = false;
selectedContract: any = null;
timeDifference: string = '';
countdownTime: string = 'Calculating...';
countdownPercentage: number = 100;
private countdownInterval: any;

// Methods
showRemainingTime(contract: any) {
    this.selectedContract = contract;
    this.calculateTimeDifference(contract.date_signature);
    this.startCountdown(); // Start the countdown when modal opens
    this.showTimeModal = true;
}

closeModal() {
    this.showTimeModal = false;
    if (this.countdownInterval) {
        clearInterval(this.countdownInterval); // Clear interval when modal closes
    }
}

calculateTimeDifference(signatureDate: Date) {
  const now = new Date();
  const signature = new Date(signatureDate);
  
  // Calculate the difference in milliseconds
  const diffMs = now.getTime() - signature.getTime();
  
  // Convert to days, hours, minutes, seconds
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffHrs = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  const diffSecs = Math.floor((diffMs % (1000 * 60)) / 1000);
  
  // Show positive time elapsed (removed negative signs)
  this.timeDifference = `${-diffDays} days, ${-diffHrs} hours, ${-diffMins} minutes, ${-diffSecs} seconds`;
}
startCountdown() {
    if (!this.selectedContract) return;
    
    // Calculate end date (1 year after signing as example)
    const endDate = new Date(this.selectedContract.date_signature);
    endDate.setFullYear(endDate.getFullYear()); // Adjust based on your contract duration
    
    // Update immediately first
    this.updateCountdown(endDate);
    
    // Then update every second
    this.countdownInterval = setInterval(() => {
        this.updateCountdown(endDate);
    }, 1000);
}

updateCountdown(endDate: Date) {
  const now = new Date();
  const diff = endDate.getTime() - now.getTime();
  
  // Calculate percentage
  const totalDuration = endDate.getTime() - new Date(this.selectedContract.date_signature).getTime();
  this.countdownPercentage = Math.max(0, Math.min(100, (diff / totalDuration) * 100));
  
  // Format time remaining
  if (diff <= 0) {
      this.countdownTime = 'Contract expired';
      clearInterval(this.countdownInterval);
  } else {
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      this.countdownTime = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
}

ngOnDestroy() {
    if (this.countdownInterval) {
        clearInterval(this.countdownInterval);
    }
}
  // Retrieve the logged-in user from sessionStorage
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
   viewContractDetails(id_Contrat: number) {
    this.router.navigate(['/contratfront', id_Contrat]);
  }
  
  // Get contracts for the logged-in user
  getContracts() {
    if (!this.user) {
      console.error("User not defined");
      return;
    }
  
    console.log("User:", this.user);
    console.log("Username:", this.user.username);
  
    let contractsList: Contrat[] = [];
  
    this.terrainService.getUserContracts(this.user.username).pipe(
      switchMap((contracts: Contrat[]) => {
        console.log("Contracts received:", contracts);
        contractsList = contracts; // Stocker temporairement les contrats
        
        return this.terrainService.getTerreList(); // Récupérer la liste des terrains
      })
    ).subscribe(
      (terrains: any[]) => {
        console.log("Terrains received:", terrains);
  
        // Associer chaque contrat avec son terrain, image et calculer le temps restant
        this.contracts = contractsList.map(contract => {
          const terrain = terrains.find(t => t.idTerrain === contract.idTerrain);
  
          // Calcul du temps restant en jours
          const now = new Date();
          const signatureDate = new Date(contract.date_signature);
          const diffTime = signatureDate.getTime() - now.getTime();
          const remainingDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertir en jours
  
          return {
            ...contract,
            terrainImage: terrain?.imageterre ? `${terrain.imageterre}` : 'assets/default-image.jpg', // Image ou image par défaut
            remainingTime: remainingDays > 0 ? `${remainingDays} days remaining` : "Contract is active"
          };
        });
  
        console.log("Final contracts list:", this.contracts);
      },
      (error) => {
        console.error('Error loading contracts:', error);
      }
    );
  }
  
}
