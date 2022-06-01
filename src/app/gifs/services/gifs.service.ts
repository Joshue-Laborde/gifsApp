import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGIFResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  // ----- Para guardar el historial de busqueda ----- //
  private apiKey:string = "2JFrc0mCfEX4eD44L24zdjlmzbJi962A";
  private serviceUrl:string = "https://api.giphy.com/v1/gifs";
  private _historial: string[] = [];
  
  public resultados:Gif[]=[]

  get historial(){

    return [...this._historial];
  }

  constructor(private http: HttpClient){
    //para que los valores del localestorage queden guardados y se quede almacenado en el dashboard

    //si es nulo entonces devuelve un arreglo vacio
    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    //forma tradicional
    /*if(localStorage.getItem('historial')){
      this._historial = JSON.parse(localStorage.getItem('historial')!);
    }*/
    this.resultados=JSON.parse(localStorage.getItem('resultado')!) || []
  }
  
  buscarGifd(query:string=""){
    query= query.trim().toLocaleLowerCase();
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      //limitar la cant de inserciones en el historial
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit','10')
      .set('q',query);
    this.http.get<SearchGIFResponse>(`${this.serviceUrl}/search`,{params})
      .subscribe((resp) =>{
        console.log(resp.data);
        this.resultados=resp.data;
        localStorage.setItem('resultado', JSON.stringify(this.resultados));
      });
    }
  }

    //primera foram va dentro del metodo
    /*console.log(this._historial);
    fetch('https://api.giphy.com/v1/gifs/trending?api_key=2JFrc0mCfEX4eD44L24zdjlmzbJi962A&q=dragon ball z&limit=10')
      .then(resp=>(
        resp.json().then(data=>{
          console.log(data)
        })
      ))*/

      
    //2da forma
    /*async buscarGifd1(query:string=""){
      query= query.trim().toLocaleLowerCase();
      if(!this._historial.includes(query)){
        this._historial.unshift(query);
        //limitar la cant de inserciones en el historial
        this._historial = this._historial.splice(0,10)
      }
      const resp = await fetch('https://api.giphy.com/v1/gifs/trending?api_key=2JFrc0mCfEX4eD44L24zdjlmzbJi962A&q=dragon ball z&limit=10')
      const data = await resp.json();
      console.log(data);
    }*/
