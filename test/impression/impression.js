const PDFDocument = require('pdfkit');
const fs = require('fs');

const data = {
    Conforme: 1,
    Controleur: 9,
    Grammes_peser: 20.5,
    Nombre_produits: 5,
    Poste: 10,
    Production: "A",
    Reference: "03B89C",
    Nom_produit:"Brosse_magnétique",
    Time: "2012-09-16 17:04:16.000 ",
    Variation: 4.2,
    id: 41
}

PDFDocument.prototype.writeTitle = function(Name_product){
  this
  .fontSize(20)
  .text(`Rapport de la pesée du produit : ${Name_product}`,
  {
    align:'center'
  }
  ,50, 100)
}

PDFDocument.prototype.writeData = function(data){
  let space = 150
  for (const [key, value] of Object.entries(data)) {
    const text = `${key} : ${value}`
        this
        .fontSize(17)
        .text(text,50,space)
        space += 35
    }
}

PDFDocument.prototype.writeImage = function(){
  this
  .image('logo.png',550,10,{
    width:112,
    height:102,
    scale:0.4
  })  
}



// Create a document
const doc = new PDFDocument();

doc.pipe(fs.createWriteStream('Rapport.pdf'));

doc.writeTitle(data.Nom_produit)
doc.writeData(data)
doc.writeImage()

doc.end();