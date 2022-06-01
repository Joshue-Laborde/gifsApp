import { Component} from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent{
  //inyeccion
  constructor(private gifsService: GifsService){}
  
  get historial(){
    return this.gifsService.historial;
  }

  buscar(termino:string){
    this.gifsService.buscarGifd(termino);
  }

}
