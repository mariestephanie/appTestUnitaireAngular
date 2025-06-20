import { Couleur, CouleurDTO, CouleurHttpReponse } from "../models/couleur";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable()
export class StyleService {

    url: string = 'https://parseapi.back4app.com/classes/Color?limit=1000';
    headers: { [key:string]: string; } = {
      'X-Parse-Application-Id': 'vei5uu7QWv5PsN3vS33pfc7MPeOPeZkrOcP24yNX',
        'X-Parse-Master-Key': 'aImLE6lX86EFpea2nDjq9123qJnG0hxke416U7Je'
    };


  public constructor(private _http: HttpClient) { }

 public transformerEnCouleur(id: number , dto: CouleurDTO) : Couleur {
    return new Couleur(id, dto.name.substring(0,1).toUpperCase()+dto.name.substring(1).toLocaleLowerCase(), dto.hexCode)
 }
  
  public preparerLaRequete(): Observable<CouleurDTO[]>{
    return this._http.get<CouleurDTO[]>(this.url, {headers : this.headers});
  }

  public recupererLesCouleurs(): Observable<Couleur[]> {

    return this.preparerLaRequete().pipe(map(dtos => dtos.map((dto, indice) => this.transformerEnCouleur(indice + 1, dto))));
  }
}
