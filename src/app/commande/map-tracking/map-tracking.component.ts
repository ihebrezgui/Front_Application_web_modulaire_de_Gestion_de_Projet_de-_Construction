import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-map-tracking',
  templateUrl: './map-tracking.component.html',
  styleUrls: ['./style1.css']
})
export class MapTrackingComponent implements OnInit {
  private map!: L.Map;
  private livreurMarker!: L.Marker;
  private routeControl: any;
  private livreurIndex = 0;
  private routeCoords: any[] = [];
  private clientMarker!: L.Marker | null;
  private livreurInitialPosition: L.LatLng = L.latLng(36.8, 10.2); // Position initiale du livreur

  public idCommande: number = 0;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idCommande = +this.route.snapshot.paramMap.get('id')!;
    this.initMap();
  }

  initMap(): void {
    this.map = L.map('map').setView([34.0, 9.0], 7); // Tunisie

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Marqueur du livreur avec position initiale
    this.livreurMarker = L.marker(this.livreurInitialPosition, {
      icon: L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/1076/1076928.png',
        iconSize: [30, 30]
      })
    }).addTo(this.map).bindPopup('🚚 Livreur');

    this.loadCommandeData();

    // Permettre au client de définir sa position sur la carte
    this.map.on('click', (e: L.LeafletMouseEvent) => this.setClientPosition(e));
  }

  loadCommandeData(): void {
    // Simuler les données de la commande
    const commande = {
      id: this.idCommande,
      clientPosition: { lat: 36.0, lng: 9.5 },
      livreurPosition: { lat: 36.8, lng: 10.2 }
    };

    const clientPosition = commande.clientPosition;
    this.addClientMarker(clientPosition);

    const livreurPosition = commande.livreurPosition;
    this.planRoute(
      L.latLng(livreurPosition.lat, livreurPosition.lng),
      L.latLng(clientPosition.lat, clientPosition.lng)
    );
  }

  addClientMarker(position: any): void {
    this.clientMarker = L.marker([position.lat, position.lng], {
      icon: L.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
        iconSize: [30, 30]
      })
    }).addTo(this.map).bindPopup('📍 Client').openPopup();
  }

  cancelClientPosition(): void {
    if (this.clientMarker) {
      this.map.removeLayer(this.clientMarker);  // Supprimer le marqueur du client
      this.clientMarker = null;  // Réinitialiser la référence
    }

    if (this.routeControl) {
      this.map.removeControl(this.routeControl);  // Supprimer la route
      this.routeControl = null;
    }

    // Ramener le livreur à sa position initiale
    this.livreurMarker.setLatLng(this.livreurInitialPosition);
    this.livreurIndex = 0;
    this.routeCoords = [];
  }

  setClientPosition(e: L.LeafletMouseEvent): void {
    const latLng = e.latlng;

    // Si le client a déjà un marqueur, le mettre à jour
    if (this.clientMarker) {
      this.clientMarker.setLatLng(latLng);  // Mettre à jour la position du client
    } else {
      // Ajouter un nouveau marqueur pour le client
      this.addClientMarker({ lat: latLng.lat, lng: latLng.lng });
    }

    // Replanifier l'itinéraire avec la nouvelle position du client
    if (this.routeControl) {
      this.map.removeControl(this.routeControl);  // Supprimer l'itinéraire précédent
    }

    const livreurPosition = this.livreurMarker.getLatLng();
    this.planRoute(livreurPosition, latLng);
  }

  planRoute(from: L.LatLng, to: L.LatLng): void {
    if (this.routeControl) this.map.removeControl(this.routeControl);

    this.routeControl = L.Routing.control({
      waypoints: [from, to],
      createMarker: () => null,
      lineOptions: {
        styles: [{ color: 'blue', weight: 5 }],
        extendToWaypoints: true,
        missingRouteTolerance: 10
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: false
    } as any).addTo(this.map);

    this.routeControl.on('routesfound', (e: any) => {
      this.routeCoords = e.routes[0].coordinates;
      this.livreurIndex = 0;
      this.moveLivreur();
    });
  }

  moveLivreur(): void {
    if (this.livreurIndex >= this.routeCoords.length) {
      this.showArrivalNotification();
      return;
    }

    const step = this.routeCoords[this.livreurIndex];
    this.livreurMarker.setLatLng([step.lat, step.lng]);
    this.livreurIndex++;

    setTimeout(() => this.moveLivreur(), 1000);
  }
  showArrivalNotification(): void {
    const audio = new Audio('assets/notification.mp3'); // Assurez-vous que le fichier audio est dans le dossier assets
    audio.play();

    Swal.fire({
      icon: 'success',
      title: 'Commande livrée',
      text: 'Votre commande est bien arrivée à destination !',
      confirmButtonText: 'OK'
    });
  }
}
