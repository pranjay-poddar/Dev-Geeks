import { ConditionalExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { SimpleModalComponent } from 'ngx-simple-modal';
import { DataService } from '../data.service';

export interface PromptModel {
  title:string;
  id:number;
  task: string;
  due : Date;
  status: string;
}
interface ttodo{
  task : string;
  dueby: Date;
  status : string;
}

@Component({
  selector: 'prompt',
  template: `
    <div class="modal-content">
      <div class="modal-header">
        <h4>{{title || 'Prompt'}}</h4>
      </div>
      <div class="modal-body">
        <label>Task:</label>
        <input type="text" value ={{task}} class="form-control" [(ngModel)]="task" name="name" />
        <br>
        <label>Due:</label>
        <input type="date" value ={{due}} class="form-control" [(ngModel)]="due" name="name" />
        <br>
        <label>Status:</label>
        <select class="form-control" [(ngModel)]="status" name="name">
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Finished">Finished</option>
        </select>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-danger" (click)="close()">Cancel</button>
        <button type="button" class="btn btn-primary" (click)="apply($event)" id={{id}}>Confirm</button>
      </div>
    </div>
  `
})
export class PromptComponent extends SimpleModalComponent<PromptModel, string> implements PromptModel {
  title!: string;
  id!: number;
  task: string = '';
  due !: Date;
  status: string='';
  constructor(private dataService: DataService) {
    super();
  }
  async apply(event:any) {
    const todo : ttodo ={
      task:this.task,
      dueby:this.due,
      status:this.status
    }
    if (event.currentTarget.id==0) this.dataService.post(todo);
    else await this.dataService.update(event.currentTarget.id, todo);
    location.reload();
    this.close();
  }
}
