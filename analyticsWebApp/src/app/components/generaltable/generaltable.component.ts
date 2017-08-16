import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'generaltable',
  templateUrl: './generaltable.component.html',
  styleUrls: ['./generaltable.component.css']
})
export class GeneraltableComponent implements OnInit , Input{

  @Input() data: Array<any>;
  table_data: Array<any> = [];

  constructor() { }

  ngOnInit() {
    this.actionProcess();
  }

  actionProcess(){
    for(let obj of this.data){
      var temp = {
        "titulo": obj.title,
        "autor": obj.author,
        "licencia": obj.license,
        "fecha_modificacion": obj.metadata_modified,
        "organizacion": obj.organization_description,
        "numero_recursos": obj.resources.length,
      }
      this.table_data.push(temp);
    }

  }
}
