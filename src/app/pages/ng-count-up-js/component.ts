import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl:'./component.html'
})
export class NgCountUpComponent implements OnInit{
  public betAmount = 1000;
  constructor(
  ) { }

  ngOnInit(){

  }
}