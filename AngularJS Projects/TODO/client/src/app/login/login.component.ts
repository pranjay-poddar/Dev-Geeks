import { relativeToRootDirs } from '@angular/compiler-cli/src/transformers/util';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

interface creds{
  username : string;
  password : string;
  access : string;
}

interface response{
  cred:creds;
  status:number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!:string;
  result!:string;
  constructor(private dataService:DataService, private router: Router) { }

  ngOnInit(): void {
  }
  async apply(){
    console.log(this.username);
    console.log(this.password);
    var res : response = await this.dataService.login<response>(this.username,this.password);
    if (res["status"]==202){
      this.result="Please check your username and password";
    }
    if (res["status"]==201){
      localStorage.setItem('access', res["cred"]["access"]);
      localStorage.setItem('username',res["cred"]["username"])
      this.result="";
      this.router.navigate(['/today']);
    }
  }

}
