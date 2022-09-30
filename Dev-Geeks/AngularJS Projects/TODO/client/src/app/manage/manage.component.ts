import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service'
import { SimpleModalService } from 'ngx-simple-modal';
import { PromptComponent } from '../prompt/prompt.component';

interface task{
  id: number;
  task: string;
  dueby: Date;
  status: string;
}

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {

  public todos : task[];
  public apiClient:DataService;
  access : Boolean;
  constructor(private dataService: DataService,private SimpleModalService: SimpleModalService) {
    this.apiClient = dataService;
    this.todos = [];
    this.access = (localStorage.getItem('access')=='w');
   }

  async ngOnInit() {
    this.todos = await this.apiClient.manage<task[]>();
    console.log(this.todos)
  }

  async dlt(event : any) {
    await this.dataService.delete<task[]>(event.currentTarget.id);
    location.reload();
  }

  showNewPrompt(event:any) {
    var d = new Date();
    var e=d.toISOString().substr(0,10);
    this.SimpleModalService.addModal(PromptComponent, {
      title: 'Add Task',
      id: 0,
      task:'',
      due:d,
      status:''
    });
  }

  async showUpdatePrompt(event:any) {
    var t = await this.dataService.getbyid<task>(event.currentTarget.id);
    console.log(t);
    this.SimpleModalService.addModal(PromptComponent, {
      title: 'Manage Task',
      id: t["id"],
      task:t["task"],
      due:t["dueby"],
      status:t["status"]
    });
  }
}
