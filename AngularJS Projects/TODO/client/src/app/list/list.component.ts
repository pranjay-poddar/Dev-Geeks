import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'

interface task{
  id: number;
  task : string;
  dueby: Date;
  status : string;
}


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public todos : task[];
  access : Boolean;
  public apiClient:DataService;
  constructor(private dataService: DataService) {
    this.apiClient = dataService;
    this.todos = [];
    this.access = (localStorage.getItem('access')=='w');
   }

  async ngOnInit() {
    this.todos = await this.apiClient.get<task[]>();
    console.log(this.todos)
  }

}
