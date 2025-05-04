import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TerreService } from '../TerreService.service';
import { Terre } from '../listterre/Terre';

@Component({
  selector: 'app-detailsterre',
  templateUrl: './detailsterre.component.html',
  styleUrls: ['./detailsterre.component.css']
})
export class DetailsterreComponent implements OnInit {

  id!: number;
  selectedTerre!: Terre | null;

  constructor(
    private ac: ActivatedRoute,
    private r: Router,
    private terreservice: TerreService
  ) {}

  ngOnInit(): void {
    this.id = this.ac.snapshot.params['id'];
  
    

    this.terreservice.getTerreList().subscribe(data => {
      console.log('Terrains:', data);
      this.selectedTerre = data.find((terre) => Number(terre.idTerrain) === Number(this.id)) || null;

      if (!this.selectedTerre) {
        console.error('Terrain not found!');
      }
    });
  }

  // Optionally, handle the case when there's no terre found
  navigateBack() {
    this.r.navigate(['/list-terres']);  // Or any other route to navigate back
  }
}
