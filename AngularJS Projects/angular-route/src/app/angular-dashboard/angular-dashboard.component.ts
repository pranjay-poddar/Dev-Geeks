import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-angular-dashboard',
  templateUrl: './angular-dashboard.component.html',
  styleUrls: ['./angular-dashboard.component.css']
})
export class AngularDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  showFiller = false;
}
