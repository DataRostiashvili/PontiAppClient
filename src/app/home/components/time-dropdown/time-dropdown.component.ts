import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-dropdown',
  templateUrl: './time-dropdown.component.html',
  styleUrls: ['./time-dropdown.component.scss']
})
export class TimeDropdownComponent implements OnInit {

  @Input() 
    public options: string[] = [];
    
  constructor() { }

  ngOnInit(): void {
  }

}
