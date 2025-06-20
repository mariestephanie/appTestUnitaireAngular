import { Component } from '@angular/core';
import { Couleur } from './models/couleur';
import { StyleService } from './services/style.service.old';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  private _titre = 'Mon Application <mark>Angular</mark>';
  public get titre(): string { return this._titre; }

  private _prenom: string = 'Mickey';
  public get prenom(): string { return this._prenom; }
  public set prenom(prenom: string) { this._prenom = prenom; }

  private _lesCouleurs: Couleur[] = [];
  public get lesCouleurs(): Couleur[] { return this._lesCouleurs; }
  public set lesCouleurs(lesCouleurs: Couleur[]) {
    this._lesCouleurs = lesCouleurs.sort((c1, c2) => c1.libelle.localeCompare(c2.libelle));
  }

  private _laCouleur: Couleur | null = null;
  public get laCouleur(): Couleur | null { return this._laCouleur; }
  public set laCouleur(laCouleur: Couleur | null) { this._laCouleur = laCouleur; }

  public get estMessageAffichable(): boolean { return this.prenom !== '' && this.laCouleur !== null; }
  public get message(): string { return this.estMessageAffichable ? `Bonjour ${this.prenom} !` : ''; }

  public constructor(private _styleService: StyleService) { }

  public ngOnInit(): void {
    this.chargerCouleurs();
  }

  public chargerCouleurs(): void {
    this._styleService.recupererLesCouleurs().subscribe(
      couleurs => this.lesCouleurs = couleurs,
      erreur => console.warn('Ooops', erreur)
    );
  }
}
