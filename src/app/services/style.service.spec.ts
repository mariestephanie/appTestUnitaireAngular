import { HttpClient } from "@angular/common/http";
import { Couleur, CouleurDTO } from "../models/couleur"
import { StyleService } from "./style.service"
import { of } from "rxjs";
jest.mock("@angular/common/http");

describe("Tests du service Style", () => {
    it('transformer un dto en model', () => {
        //Arrange
        let dto: CouleurDTO = {
            objectId: 'test',
            name: 'truc',
            hexCode: 'bidule' 
        };
        let id = 1;
        let expected = new Couleur(1, 'Truc','bidule');
        let service = new StyleService(null!);
        //Act
        let actual = service.transformerEnCouleur(id, dto);

        //Assert
        expect(actual).toEqual(expected);
    });

    it('Preparer la requête', () => {
        //Arrange
        let expectedUrl = 'toto.com';
        let expectedHeader = {un:'un', deux:'deux'}
       
        let mockHttpClient = new HttpClient(null!);
        mockHttpClient.get = jest.fn();
        let service = new StyleService(mockHttpClient);
        service.url = expectedUrl;
        service.headers = expectedHeader;
        //Act
        let actual = service.preparerLaRequete();

        //Assert
        expect(mockHttpClient.get).toBeCalledWith(expectedUrl, {headers: expectedHeader})
        
    })

    it('Recuperer les couleurs', () => {
        //Arrange
        let dtos: CouleurDTO[] = [
          {objectId: 'test',name: 'truc',hexCode: 'bidule' },
          {objectId: 'test',name: 'truc',hexCode: 'bidule' },
          {objectId: 'test',name: 'truc',hexCode: 'bidule' },
        ]
        let expectCouleursCount = 3;

        let service = new StyleService(null!);
        service.preparerLaRequete = jest.fn().mockReturnValue(of(dtos));
        service.transformerEnCouleur = jest.fn().mockReturnValue(null);
        
        //Act
        let actual = service.recupererLesCouleurs().subscribe(models => {
            expect(models.length).toBe(expectCouleursCount);
            expect(service.preparerLaRequete).toBeCalledTimes(1);
            expect(service.recupererLesCouleurs).toBeCalledTimes(3);
        });

    });

})