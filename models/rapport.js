/*
const Rapport = {
    id : 0,
    Controleur : 0,
    Time : time,
    Production : "",
    Poste : "",
    Reference : "",
    Grammes_peser : "",
    Variation : "",
    Conforme : false,
    Nombre_produits : 0

} 
*/
export default function Rapport(Id,Controleur,time,Production,Poste,Reference,grammes_peser,Variation,Conforme,Nombre_produits) {
    this.Id = Id,
    this.Controleur =  Controleur,
    this.time = time,
    this.Production = Production,
    this.Poste =  Poste,
    this.Reference = Reference,
    this.grammes_peser = grammes_peser,
    this.Variation =  Variation,
    this.Conforme = Conforme,
    this.Nombre_produits = Nombre_produits
  }