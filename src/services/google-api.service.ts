import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class GoogleApiService {

  private geolocate = "https://maps.googleapis.com/maps/api/geocode/json";
  private key = "AIzaSyBeOdQqfn5NvUzfEwD5Q5haXiBRR9wr7Eo";

  constructor(private http: Http) {}

   searchLocation(location: string): Observable < any > {

    return this.http.get(this.geolocate + "?address=" + location + "&key=" + this.key)
      .map(item => {
        return item.json();
      });

  }



   directions(origen: any, destino: any): Observable < any > {

   	let url="https://maps.googleapis.com/maps/api/directions/json"

    return this.http.get(url + "?origin=" + origen.lat + "," + origen.lng + 
    	"&destination=" + destino.lat + "," + origen.lng + 
    	"&key=" + this.key)
      .map(item => {
        return item.json();
      });



  }







}
