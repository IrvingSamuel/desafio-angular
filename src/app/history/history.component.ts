import { Component, OnInit} from '@angular/core';

declare function getLists(): any;

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    getLists();
  }

}
