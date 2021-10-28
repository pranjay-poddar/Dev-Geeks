import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'

interface task{
  id: number;
  task : string;
  dueby: Date;
  status : string;
}

@Component({
  selector: 'app-finished',
  templateUrl: './finished.component.html',
  styleUrls: ['./finished.component.css']
})
export class FinishedComponent implements OnInit {

  public todos : task[];
  public apiClient:DataService;
  constructor(private dataService: DataService) {
    this.apiClient = dataService;
    this.todos = [];
   }

  async ngOnInit() {
    this.todos = await this.apiClient.finished<task[]>();
    console.log(this.todos)
  }

}
