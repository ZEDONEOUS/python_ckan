import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'barchart',
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements OnInit, Input {

  specific_data: Array<any> = [];
  graph_data: Array<any>;
  graph_options: {};
  data_length: number;
  @Input() data: Array<any>;
  @Input() option: string;

  constructor() { }

  ngOnInit() {
    if(this.option == 'license'){
      this.processLicense();
    }else if(this.option == 'resources'){
      this.processResources();
    }else if(this.option == 'relationships'){
      this.processRelationships();
    }
  }

  processRelationships(){
    var raw_arr = [];
    var output_arr = [];
    var obj_rel = 0;
    var sub_rel = 0;

    for(let obj of this.data){
      if(obj.relationships_as_object.length > 0 || obj.relationships_as_subject.length > 0){
        var temp = {
          "title": obj.title,
          "obj_rel": obj.relationships_as_object.length,
          "sub_rel": obj.relationships_as_subject.length
        }
        this.specific_data.push(temp);
      }
      obj_rel += obj.relationships_as_object.length;
      sub_rel += obj.relationships_as_subject.length;
    }

    var obj = {
      "label": "Relaciones objeto",
      "value": obj_rel
    }

    var sub = {
      "label": "Relaciones sujeto",
      "value": sub_rel
    }

    output_arr.push(obj);
    output_arr.push(sub);

    this.displayGraph();
    this.graph_data[0].values = output_arr;
  }

  processResources(){
    var raw_arr = [];
    var output_arr = [];

    for(let obj of this.data){
      for(let resource of obj.resources){
        raw_arr.push(resource.format);
      }
    }

    output_arr = this.filterArrays(raw_arr.sort());
    if(output_arr.length < 10){
      this.data_length = 450;
    }else{
      this.data_length = output_arr.length * 27;
    }
    this.displayGraph();
    this.graph_data[0].values = output_arr;
  }

  processLicense(){
    var raw_arr = [];
    var output_arr = [];

    for(var i = 0 ; i < this.data.length ; i++){
      raw_arr.push(this.data[i]['license_title']);
    }

    output_arr = this.filterArrays(raw_arr.sort());
    if(output_arr.length < 10){
      this.data_length = 450;
    }else{
      this.data_length = output_arr.length * 27;
    }
    this.displayGraph();
    this.graph_data[0].values = output_arr;
  }

  displayGraph(){
    this.graph_options = {
      chart: {
        type: 'discreteBarChart',
        height: 550,
        width: this.data_length,
        margin: {
          top: 20,
          right: 10,
          bottom: 180,
          left: 90
        },
        x: function(d){return d.label;},
        y: function(d){return d.value;},
        showValues: true,
        valueFormat: function(d){
          return d3.format('0f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'X Axis',
          rotateLabels: 60
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: 10
        }
      }
    }
    this.graph_data = [
      {
        key: "Cumulative Return",
        values: []
      }
    ];
  }

  filterArrays(array_ordered){
    var output_arr = [];
    var licence_temp = "";
    var filtered_arr = [];

    for(let licence of array_ordered){
      if(licence != licence_temp){
        filtered_arr.push(licence);
        licence_temp = licence;
      }
    }

    for(let filtered_elm of filtered_arr){
      var counter = 0;
      var temp_obj = {
        "label": filtered_elm,
        "value": 0
      };
      for(let raw_eml of array_ordered){
        if(filtered_elm == raw_eml){
          counter++;
        }
      }
      temp_obj.value = counter;
      output_arr.push(temp_obj);
    }

    return output_arr;
  }

}
