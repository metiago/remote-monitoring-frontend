import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  mNodeForm = "#mNodeForm"
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
    this.materialHelper.openModal(this.mNodeForm)
  }

  closeModal() {
    this.materialHelper.closeModal(this.mNodeForm)
  }

  get f() { return this.nodeForm.controls; }

  getAll() {
    this.monitorService.getAll().subscribe((data) => {
      this.nodes = data
    })
  }

  detail(key: string) {
    this.monitorService.detail(key).subscribe((node) => {      
      this.materialHelper.openModal(this.mNodeForm)
      this.materialHelper.updateFields()
      this.nodeForm.patchValue(node);
    })
  }

  delete(key: string) {
    const yes = window.confirm("Delete ?");
    if (yes === true) {
      this.monitorService.delete(key).subscribe(() => {
        this.getAll()
      })
    }
  }

  onSubmit() {

    if (this.nodeForm.invalid) {
      return;
    }

    this.monitorService.add(this.nodeForm.value).subscribe(res => {
      this.nodeForm.reset()
      this.closeModal();
      this.getAll()
    });
  }
}
