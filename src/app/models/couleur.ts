export class Couleur {
  public constructor(
    public id: number,
    public libelle: string,
    public code: string
  ) {}
}

// -- Data Transfret Object DTO -------------------------------------------
export interface CouleurHttpReponse {
  results: CouleurDTO[];
}

export interface CouleurDTO {
  objectId: string;
  name: string;
  hexCode: string;
  redFraction?: number;
  greenFraction?: number;
  blueFraction?: number;
  redHex?: string;
  greenHex?: string;
  blueHex?: string;
  redDecimal?: number;
  greenDecimal?: number;
  blueDecimal?: number;
  createdAt?: string;
  updatedAt?: string;
}
