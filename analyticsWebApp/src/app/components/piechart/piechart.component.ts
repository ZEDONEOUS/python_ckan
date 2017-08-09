import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

@Component({
  selector: 'piechart',
  templateUrl: './piechart.component.html',
  styleUrls: [
    './piechart.component.css',
    '../../../../node_modules/nvd3/build/nv.d3.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class PiechartComponent implements OnInit, Input {

  graph_data: Array<any>;
  graph_options: {};
  specific_data: Array<any> = [];
  @Input() data: Array<any>;
  @Input() option: string;

  constructor() { }

  ngOnInit() {
    this.actionProcess();
  }

  actionProcess(){

    var up = 0;
    var up_per = 0;
    var down = 0;
    var down_per = 0;

    for(var i = 0 ; i < this.data.length ; i++){
      if(this.data[i][this.option] == null || this.data[i][this.option] == ""){
        down++;
      }else{
        this.specific_data.push(this.data[i][this.option]);
        up++;
      }
    }

    up_per = (up * 100)/(up + down);
    down_per = (down * 100)/(up + down);

    var output_arr = [
      {
        label: "Registrado, " + up_per.toFixed(2) + "%",
        value: up
      },
      {
        label: "No registrado, " + down_per.toFixed(2) + "%",
        value: down
      }
    ];

    this.displayGraph();
    this.graph_data = output_arr;
    console.log(this.graph_data);
  }

  displayGraph(){
    this.graph_options = {
      chart: {
        type: 'pieChart',
        height: 500,
        x: function(d){return d.label;},
        y: function(d){return d.value;},
        showLabels: true,
        duration: 500,
        labelThreshold: 0.01,
        labelSunbeamLayout: false,
        legend: {
          margin: {
            top: 5,
            right: 35,
            bottom: 5,
            left: 0
          }
        }
      }
    };
    this.graph_data = [];
  }
}
