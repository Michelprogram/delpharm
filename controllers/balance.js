const balance = require('../balance/balance')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const Produit = require('../models/produit.model')

const get_poids = () => {

    return new Promise((resolve, reject) => {

        balance.on("data", (line) => {

            line = line.replace(/\s/g, '')

            poids = line.slice(2)

            resolve(poids)

        });

    })

}

const Myrequest = (URI,method,data={}) => {
    return new Promise((resolve,reject)=>{
        const request = new XMLHttpRequest()
        request.onreadystatechange = ()=>{
            if (request.readyState == 4 && request.status == 200){
                data = JSON.parse(request.responseText)
                resolve(data)
            }
        }
        request.open(method,URI)
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        
        method == "POST" ? request.send(JSON.stringify(data)) : request.send()
        
    })
}

const variation = (peser,reference,facteur)=>{
    peser = peser.slice(0,-2)
    return Math.abs((parseFloat(peser)/parseInt(facteur) - parseFloat(reference))).toFixed(2)

}

const conformite = (variation,reference) =>{
    return parseFloat(variation) >= 0.005 * parseFloat(reference) ? false : true
/*
    ref = 48.89
    conforme = 0.05
    result = 0.005 * 48.89
    si le resultat est supérieur ou inférieur à la variation non conforme
*/
}


const weight =  async (req,res) =>{

    let result = {
        poids:0,
        variation:0,
        conforme:false
    }

    const nom_produit = req.body.nom_produit
    const nb_produit = req.body.nombre_de_produit

    const poids_reference = await Produit.select_Produit_name(nom_produit)
    const poids_peser = await Myrequest("http://172.16.185.202:3000/api/balance","GET") //Remplacer sur la mise en prod

    result.poids = poids_peser.poids
    result.variation = variation(poids_peser.poids,poids_reference,nb_produit)
    result.conforme = conformite(result.variation,poids_reference)

    res.json(result)
     

    //Test raspberry
    /*
    get_poids()
    .then((poids) => {
        res.json({
            poids : poids
        })
    })
    return */
}





module.exports = weight