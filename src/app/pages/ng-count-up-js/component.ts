import { Component,  OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl:'./component.html'
})
export class NgCountUpComponent implements OnInit{
  public startVal = 1000;
  public endVal = 0;
  constructor(
  ) { }

  ngOnInit(){

  }
}