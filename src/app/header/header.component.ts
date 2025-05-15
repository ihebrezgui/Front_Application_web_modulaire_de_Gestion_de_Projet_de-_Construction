import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  username: string | null = null;

  ngOnInit(): void {
    this.username = localStorage.getItem('username'); // ✅ Get it from storage
}
}