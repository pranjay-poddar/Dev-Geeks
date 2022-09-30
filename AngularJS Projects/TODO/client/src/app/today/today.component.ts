import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'

interface task{
  id: number;
  task : string;
  dueby: Date;
  status : string;
}

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css']
})
export class TodayComponent implements OnInit {

  public todos : task[];
  public apiClient:DataService;
  constructor(private dataService: DataService) {
    this.apiClient = dataService;
    this.todos = [];
   }

  async ngOnInit() {
    this.todos = await this.apiClient.today<task[]>();
    console.log(this.todos)
    console.log(localStorage.getItem('access'));
    console.log(localStorage.getItem('username'));
  }

}
