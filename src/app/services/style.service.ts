import { Couleur, CouleurHttpReponse } from "../models/couleur";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { map, tap } from "rxjs/operators";

@Injectable()
export class StyleService {
  public constructor(private _http: HttpClient) { }

  public recupererLesCouleurs(): Observable<Couleur[]> {
    let obs: Observable<CouleurHttpReponse> = this._http.get<CouleurHttpReponse>('https://parseapi.back4app.com/classes/Color?limit=1000', {
      headers: {
        'X-Parse-Application-Id': 'vei5uu7QWv5PsN3vS33pfc7MPeOPeZkrOcP24yNX',
        'X-Parse-Master-Key': 'aImLE6lX86EFpea2nDjq9123qJnG0hxke416U7Je'
      }
    });

    return obs.pipe(
      map(chr => chr.results.map((dto, indice) => new Couleur(indice + 1, dto.name, dto.hexCode))),
      tap(couleurs => console.log('récupération des couleurs', couleurs))
    );
  }
}
