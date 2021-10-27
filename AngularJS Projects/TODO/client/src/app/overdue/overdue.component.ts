import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'

interface task{
  id: number;
  task : string;
  dueby: Date;
  status : string;
}

@Component({
  selector: 'app-overdue',
  templateUrl: './overdue.component.html',
  styleUrls: ['./overdue.component.css']
})
export class OverdueComponent implements OnInit {

  public todos : task[];
  public apiClient:DataService;
  constructor(private dataService: DataService) {
    this.apiClient = dataService;
    this.todos = [];
   }

  async ngOnInit() {
    this.todos = await this.apiClient.overdue<task[]>();
    console.log(this.todos)
  }

}
