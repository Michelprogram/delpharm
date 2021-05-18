const balance = require('../balance/balance')
const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest
const Produit = require('../models/produit.model')
const calcul = require('../toolbox/calcul')

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




const weight =  async (req,res) =>{

    const body = req.body

    let result = {
        poids:0,
        variation:0,
        conforme:false
    }

    const nom_produit = body.nom_produit
    const nb_produit = body.nombre_de_produit

    console.log(nom_produit,nb_produit)

    const poids_reference = await Produit.poids_name(nom_produit)
    const poids_peser = await Myrequest("http://172.16.185.202:3000/api/balance","GET") //Remplacer sur la mise en prod
    //const poids_peser = await Myrequest("http://192.168.1.61:3000/api/balance","GET") //Remplacer sur la mise en prod

    result.poids = poids_peser.poids
    result.variation = calcul.variation(poids_peser.poids,poids_reference,nb_produit)
    result.conforme = calcul.conformite(result.variation,poids_reference)

    res.json(result)
}



module.exports = weight