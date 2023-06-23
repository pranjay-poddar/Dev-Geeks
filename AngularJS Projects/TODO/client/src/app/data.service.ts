import { Injectable } from '@angular/core';
import { AxiosInstance } from 'axios';
import { ErrorHandler } from '@angular/core';
import axios from 'axios';

interface task{
  id: number;
  task : string;
  dueby: Date;
  status : string;
}

interface creds{
  username : string;
  password : string;
  access : string;
}

interface response{
  cred:creds;
  status:number;
}

@Injectable({
  providedIn: 'root',
})


export class DataService {
  private axiosClient: AxiosInstance;
  private errorHandler: ErrorHandler;
  SERVER_URL = "https://leankloud-19049.herokuapp.com";
  constructor(errorHandler: ErrorHandler) {
    this.errorHandler = errorHandler;
    this.axiosClient = axios.create({
      timeout: 30000,
    });
  }

  public async get<T>(): Promise<T>{
    var axiosResponse = await this.axiosClient.request<T>({
      method: 'get',
      url: this.SERVER_URL+'/todos/',
    });
    return axiosResponse.data;
  }
  public async getbyid<T>(id:number): Promise<T>{
    var axiosResponse = await this.axiosClient.request<T>({
      method: 'get',
      url: this.SERVER_URL+'/todos/'+id,
    });
    return axiosResponse.data;
  }
  public async today<T>(): Promise<T>{
    var d = new Date();
    var e=d.toISOString().substr(0,10);
    var axiosResponse = await this.axiosClient.request<T>({
      method: 'get',
      url: this.SERVER_URL+'/todos/due?due_date='+e,
    });
    return axiosResponse.data;
  }
  public async manage<T>(): Promise<T>{
    var axiosResponse = await this.axiosClient.request<T>({
      method: 'get',
      url: this.SERVER_URL+'/todos/',
    });
    return axiosResponse.data;
  }
  public async overdue<T>(): Promise<T>{
    var axiosResponse = await this.axiosClient.request<T>({
      method: 'get',
      url: this.SERVER_URL+'/todos/overdue',
    });
    return axiosResponse.data;
  }
  public async finished<T>(): Promise<T>{
    var axiosResponse = await this.axiosClient.request<T>({
      method: 'get',
      url: this.SERVER_URL+'/todos/finished',
    });
    return axiosResponse.data;
  }
  public async delete<T>(id:number){
    var Url = this.SERVER_URL+'/todos/'+id;
    console.log(Url);
    var axiosResponse = await this.axiosClient.request<T>({
      method: 'delete',
      url: Url
    });
    return axiosResponse.data;
  }
  public async post<T>(todo:any){
    var Url = this.SERVER_URL+'/todos/';
    console.log(Url);
    var axiosResponse = await this.axiosClient.request<T>({
      method: 'post',
      url: Url,
      data:{
        task: todo["task"],
        dueby: todo["dueby"],
        status : todo["status"]
      },
      headers:{
        accept:"application/json",
        "Content-Type" : "application/json"
      }
    });
    console.log(axiosResponse.data);
  }
  public async update<T>(id:number, todo:any){
    var Url = this.SERVER_URL+'/todos/'+id;
    console.log(Url);
    var axiosResponse = await this.axiosClient.request<T>({
      method: 'put',
      url: Url,
      data:{
        task: todo["task"],
        dueby: todo["dueby"],
        status : todo["status"]
      }
    });
    console.log(axiosResponse.data);
  }
  public async login<response>(username:string, password:string){
    var Url = this.SERVER_URL+'/todos/login';
    console.log(Url);
    var axiosResponse = await this.axiosClient.request<creds>({
      method: 'post',
      url: Url,
      data:{
        username: username,
        password: password
      }
    });
    var cred : creds = axiosResponse.data;
    return { cred: cred, status:axiosResponse.status };
  }
}
