import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
})
export class BusquedaComponent{

  //opereador ! significa que siempre va a estar
  @ViewChild("txtBuscar") txtBuscar!:ElementRef<HTMLInputElement>;
  //inyeccion
  constructor(private gifsService: GifsService){}
  
  buscar (){
    const valor = this.txtBuscar.nativeElement.value;
    
    //evitar vacios
    if(valor.trim().length===0) return;

    this.gifsService.buscarGifd(valor)
    this.txtBuscar.nativeElement.value="";
  }

}
