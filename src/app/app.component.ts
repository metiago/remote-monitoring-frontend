import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';

import { MonitorService } from "../_services/monitor.service";
import { Node } from 'src/_models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Monitoring';
  nodes: Node[];

  constructor(private monitorService: MonitorService) { }

  ngOnInit() {
    this.getAll()
  }

  getAll() {
    this.monitorService.getAll().pipe(first()).subscribe(data => {
      return this.nodes = data;
    });
  }
}
