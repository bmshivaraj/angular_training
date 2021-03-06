import { Component, OnInit, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-angular7',
  templateUrl: './angular7.component.html',
  styleUrls: ['./angular7.component.css']
})
export class Angular7Component implements OnInit {

  name: string = '';
  nameList: string[] = ['Shivaraj','Madhuri'];

  @Output()
  nameAdded: EventEmitter<string> = new EventEmitter();

  @Output()
  nameDeleted: EventEmitter<string> = new EventEmitter();


  constructor() { }

  ngOnInit() {
    console.log("inside Angular7Component ngOnInit");
  }

  addName() {
    this.nameList.push(this.name);
    this.nameAdded.emit(this.name);
    this.name = '';
  }

  deleteName(index)
  {
    //this.nameList.splice(index, 1);
    let n = this.nameList.splice(index, 1)[0];
    this.nameDeleted.emit(n);
  }



}
