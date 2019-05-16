import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { MonitorService } from "../_services/monitor.service";
import { MaterialHelper } from "../_services/material";
import { Node } from 'src/_models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Monitoring';
  nodes: Node[];
  nodeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private materialHelper: MaterialHelper,
    private monitorService: MonitorService) { }

  ngOnInit() {

    this.nodeForm = this.formBuilder.group({
      host: ['', [Validators.required, Validators.minLength(4)]],
      port: ['', [Validators.required]],
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      pollFrequency: ['', [Validators.required]],
      expire: ['', [Validators.required]],
    });

    this.getAll()
  }

  openModal() {
    this.materialHelper.openModal("#mNodeForm")
  }

  closeModal() {
    this.materialHelper.closeModal("#mNodeForm")
  }

  get f() { return this.nodeForm.controls; }

  getAll() {
    this.monitorService.getAll().pipe(first()).subscribe(data => {
      return this.nodes = data;
    });
  }

  onSubmit() {

    if (this.nodeForm.invalid) {
      return;
    }

    this.monitorService.add(this.nodeForm.value).subscribe(resp => {

      if (resp === null || resp.status === 200) {
        this.nodeForm.reset()
        this.closeModal();
        this.getAll()
      }

    });

  }
}
