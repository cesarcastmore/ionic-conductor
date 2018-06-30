import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';
import { SolicitudesPage } from '../solicitudes/solicitudes.page';
import { ProgramasPage } from '../programas/programas';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})


export class MainPage {
  @ViewChild('nav') nav: NavController;

  private rootPage;
  private perfilPage = PerfilPage;
  private solicitudesPage = SolicitudesPage;
  private programasPage = ProgramasPage;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams) {
    this.rootPage = PerfilPage;


  }

  openPage(p) {
    this.nav.setRoot(p);

  }

}
