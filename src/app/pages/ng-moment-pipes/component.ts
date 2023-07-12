import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl:'./component.html'
})
export class NgMomentPipesComponent implements OnInit{
  public today = new Date();
  constructor(
  ) { }

  ngOnInit(){

  }
}