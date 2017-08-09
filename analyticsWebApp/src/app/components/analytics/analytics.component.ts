import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CkanService } from '../../services/ckan.service';

@Component({
  selector: 'analytics',
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
  instance_selected: string = "";
  radio_option_sel: string = "";
  graph_control: boolean = false;
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
      this.graph_control = true;
    }
  }

  onChangeOption(val){
    this.graph_control = false;
  }

  onChangeInstance(val){
    this.options_flag = false;
    this.graph_control = false;
  }

}
