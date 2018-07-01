import { Component } from '@angular/core';
import { SolicitudPage } from '../solicitud/solicitud';
import { ProgramaPage } from '../programa/programa';
import { FiltrosSolicitudesPage } from '../filtros-solicitudes/filtros-solicitudes';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FireStoreService, Query } from '../../services/firestore.service';
import { AuthService } from "../../services/auth.service";
import { GoogleApiService } from "../../services/google-api.service";

@Component({
  selector: 'page-solicitudes',
  templateUrl: 'solicitudes.html'
})

export class SolicitudesPage {
  private solicitudPage = SolicitudPage;

  public solicitudes: any[];

  constructor(public navCtrl: NavController,
    private fs: FireStoreService,
    private auth: AuthService,
    private googleApp: GoogleApiService) {


  }

  public ionViewDidLoad() {
    this.fs.setEntity('solicitudes');

    let query: Query = new Query();
    this.fs.filter(query).valueChanges().subscribe(data => {
      this.solicitudes = data;
    });

  }

  public openSolicitud() {
    this.navCtrl.push(this.solicitudPage);
  }

  public onRemove(solicitud: any) {
    this.fs.remove(solicitud);
  }

  public onEdit(solicitud: any) {
    this.navCtrl.push(this.solicitudPage, {
      item: {
        id: solicitud.id,
        uid: solicitud.uid,
        municipio_origen: solicitud.municipio_origen,
        municipio_destino: solicitud.municipio_destino,
        ruta_id: solicitud.ruta_id
      }

    })
  }



  public onAccept(item: any) {
    let programa = ProgramaPage;
    this.navCtrl.push(programa);
    this.fs.setEntity('rutas');

    let query: Query = new Query();
    query._where('id', '==', item.ruta_id);
    this.fs.filter(query).valueChanges().subscribe(data => {

      let ruta: any = data[0];
      console.log(ruta);
      this.googleApp.directions({
        lat: ruta.coordenadas_origen._lat,
        lng: ruta.coordenadas_origen._long
      }, {
        lat: ruta.coordenadas_destino._lat,
        lng: ruta.coordenadas_destino._long
      }).subscribe(data=>{
        console.log(data);
      });

    });

  }


  public onFilter() {
    let filtros = FiltrosSolicitudesPage;
    this.navCtrl.push(filtros);

  }
}
