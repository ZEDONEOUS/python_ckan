import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CkanService } from '../../services/ckan.service';
import { InstanceModel } from '../../models/ckanInstance.model';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: [
    './analytics.component.css',
    '../../../../node_modules/nvd3/build/nv.d3.css'
  ],
  encapsulation: ViewEncapsulation.None
})



export class AnalyticsComponent implements OnInit {

  instance_metadata: Array<any>;
  names_options: Array<any>;
  graph_data: Array<any>;
  graph_options: {};
  instance_selected: string = "";
  radio_option_sel: string = "";
  options_flag: boolean = false;
  loading_flag: boolean = false;

  constructor(private service: CkanService) { }

  ngOnInit() {
    this.service.getNames().subscribe(
      response => this.names_options = response['data']
    );
  }

  loadMetadata(){
    this.loading_flag = true;
    if (this.instance_selected != ""){
      this.service.getInstanceMetadata(this.instance_selected).subscribe(
        response => {
          this.instance_metadata = response['data']['packages'];
        },
        (error) => {
          console.log("An error has ocurred getting the metadata");
        },
        () => {
          this.loading_flag = false;
          this.options_flag = true;
        }
      );
    }

  }

  actionProcess(){
    if(this.radio_option_sel != ""){
      var raw_arr = [];
      var output_arr = [];

      for(var i = 0 ; i < this.instance_metadata.length ; i++){
        raw_arr.push(this.instance_metadata[i][this.radio_option_sel]);
      }

      raw_arr.sort();
      var licence_temp = "";
      var filtered_arr = [];

      for(let licence of raw_arr){
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
        for(let raw_eml of raw_arr){
          if(filtered_elm == raw_eml){
            counter++;
          }
        }
        temp_obj.value = counter;
        output_arr.push(temp_obj);
      }

      this.displayGraph();
      this.graph_data[0].values = output_arr;
    }
  }

  displayGraph(){
    this.graph_options = {
      chart: {
        type: 'discreteBarChart',
        height: 450,
        margin: {
          top: 20,
          right: 150,
          bottom: 200,
          left: 55
        },
        x: function(d){return d.label;},
        y: function(d){return d.value;},
        showValues: true,
        valueFormat: function(d){
          return d3.format(',.0f')(d);
        },
        duration: 500,
        xAxis: {
          axisLabel: 'X Axis',
          rotateLabels: 60
        },
        yAxis: {
          axisLabel: 'Y Axis',
          axisLabelDistance: -10
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

}
