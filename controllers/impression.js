const PDFDocument = require('pdfkit');
const Produit = require('../models/produit.model')
const fs = require('fs');

//Partie prototype, ajout de fonction à la class PDFDocument

//Ecriture du titre
PDFDocument.prototype.writeTitle = function(Name_product){
  this
  .fontSize(20)
  .text(`Rapport de la pesée du produit : ${Name_product}`,
  {
    align:'center'
  }
  ,50, 100)
}

//Ecriture des données
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

//Ecriture de l'image
PDFDocument.prototype.writeImage = function(){
  this
  .image("public/images/logo/logo.png",550,10,{
    width:112,
    height:102,
    scale:0.4
  })  
}

//Route quand pour imprimer un rapport
const impression_rapport_unitaire = async (req,res) =>{

    const data = req.body[0]
    const doc = new PDFDocument();

    const result = {
      status:"Nouveau PDF crée en attente d'impression"
    }


    const name = await Produit.select_product_ref(data.Reference_du_produit)

    try {
      doc.pipe(fs.createWriteStream('PDF/Rapport.pdf'))

      doc.writeTitle(name)
      doc.writeData(data)
      doc.writeImage()

      doc.end();
    }

    catch(err){
      result.status = "Une erreur est survenue !"
    }
    
    res.json(result)
}


module.exports = {
    impression_rapport_unitaire
}