
import { Couleur, CouleurDTO } from "./models/couleur"
import { AppComponent } from "./app.component";
import { TestBed } from "@angular/core/testing";
import { StyleService } from "./services/style.service";
import { of } from "rxjs";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
jest.mock("@angular/common/http");

describe("Tests du composant App", () => {
    it('remplit la liste déroulante', () => {
        //Arrange
      let couleurs: Couleur[] = [
        new Couleur(1, '', ''),
        new Couleur(2, '', ''),
        new Couleur(3, '', ''),
        new Couleur(4, '', ''),
      ]
      let expectedOptions = 5;

      let mockStyleService = new StyleService(null!);
      mockStyleService.recupererLesCouleurs = jest.fn().mockReturnValue(of([]));
      TestBed.configureTestingModule({
        providers: [
            {provide : StyleService, useValue: mockStyleService}
        ],
        imports : [CommonModule, FormsModule],
        declarations: [AppComponent]
      })
      let fixture = TestBed.createComponent(AppComponent);
      let composant = fixture.componentInstance;
      let template : HTMLElement = fixture.nativeElement;
        //Act

    fixture.detectChanges();// ngOnInit
    composant.lesCouleurs = couleurs;
    fixture.detectChanges();//pas de ngOnInit
  
        //Assert
      let select: HTMLSelectElement | null = template.querySelector('select[data-testid="ddCouleurs"]');
      expect(select).toBeTruthy();
      expect(select?.options.length).toBe(expectedOptions);
    
    });


})