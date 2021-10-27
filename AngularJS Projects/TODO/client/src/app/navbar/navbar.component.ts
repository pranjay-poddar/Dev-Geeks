import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public username;
  constructor() { 
    this.username = localStorage.getItem('username');
  }

  ngOnInit(): void {
  }

}
