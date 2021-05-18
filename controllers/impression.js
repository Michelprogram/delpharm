const PDFDocument = require('pdfkit');
const fs = require('fs');

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

const impression_rapport_unitaire = (req,res) =>{
    console.log(req.body)

    res.write('salut')
}


module.exports = {
    impression_rapport_unitaire
}