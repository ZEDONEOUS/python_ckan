import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable()
export class CkanService {

  constructor(public http: Http) {
    console.log("Service created!");
  }

  getInstanceMetadata(instance: string){
    return this.http.get('http://127.0.0.1:5000/' + instance).map(
      response => response.json()
    );
  }

  getNames(){
    return this.http.get('http://127.0.0.1:5000/names').map(
      response => response.json()
    );
  }

}
