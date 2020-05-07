import { JarwisService } from './../../Services/jarwis.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
    password: null
  };
  public error;
  constructor(private Jarwis:JarwisService) { }

  ngOnInit(): void {
  }
  onSubmit()
  {
    console.log("dd");
    return this.Jarwis.login(this.form).subscribe(
      data=>console.log(data),
      error=> this.handleError(error)
    );
  }
  handleError(error)
  {
    this.error=error.error.error;
  }
}
