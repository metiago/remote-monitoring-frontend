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
  mNodeDetail = "#mNodeDetail"
  node: Node
  nodes: Node[]
  nodeForm: FormGroup
  public time = [/\d/, /\d/, ':', /\d/, /\d/]

  constructor(private formBuilder: FormBuilder,
    private materialHelper: MaterialHelper,
    private monitorService: MonitorService) { }

  ngOnInit() {

    this.nodeForm = this.formBuilder.group({
      host: ['', [Validators.required, Validators.minLength(9)]],
      port: ['', [Validators.required]],
      start: ['', [Validators.required]],
      end: ['', [Validators.required]],
      pollFrequency: ['', [Validators.required]],
      expire: ['', [Validators.required]],
    });

    this.getAll()

    var ws = new WebSocket("ws://localhost:8001");

    ws.onopen = function (event) {
      that.materialHelper.showToast("Web socket has been opened", that.materialHelper.clazzSuccess)
    };

    ws.onerror = function(event) {
      console.log(event)
      that.materialHelper.showToast("Web socket has been closed", that.materialHelper.clazzDanger)
      ws.close()
    };

    const that = this
    ws.onmessage = function (event) {
      const blb = new Blob([event.data], { type: "text/plain" });
      const reader = new FileReader();

      reader.addEventListener('loadend', (e) => {

        const result: string = reader.result as string
        
        const node: Node = JSON.parse(result);

        that.setStatus(node)

      });

      reader.readAsText(blb);
    }
  }

  openFormModal() {
    this.materialHelper.openModal(this.mNodeForm)
  }

  closeFormModal() {
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
      this.materialHelper.openModal(this.mNodeDetail)
      this.node = node;
    })
  }

  closeDetailModal() {
    this.materialHelper.closeModal(this.mNodeDetail)
  }

  delete(key: string) {
    const yes = window.confirm("Delete ?");
    if (yes === true) {
      this.monitorService.delete(key).subscribe(() => {
        this.getAll()
      })
    }
  }

  setStatus(node: Node) {
    for (let i = 0; i < this.nodes.length; i++) {
      const elem = this.nodes[i]
      if (elem.key === node.key) {
        this.nodes.splice(i, 1, node);
      }
    }
  }
  
  onSubmit() {

    if (this.nodeForm.invalid) {
      return;
    }

    this.monitorService.add(this.nodeForm.value).subscribe(res => {
      this.nodeForm.reset()
      this.closeFormModal();
      this.getAll()
    });
  }

  export() {
    this.monitorService.export().subscribe((nodes) => {
      console.log(nodes)
    })
  }

  upload(event) {

    if (event.target.files && event.target.files.length > 0) {

      let reader = new FileReader();
      let file = event.target.files[0];
      reader.readAsText(file);
      reader.onload = (e) => {
        const result: string = reader.result as string
        const nodes: Node[] = JSON.parse(result)
        for (let node of nodes) {
           this.monitorService.add(node).subscribe(() => this.getAll())          
        }
      };      
    }
  }
  
  openSideNav() {
    this.materialHelper.openSideBarMenu()
  }
}
