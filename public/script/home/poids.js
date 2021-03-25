const span_poids = document.querySelector('#Poids_produit')
const span_variation = document.querySelector('#Variation')

const conforme = document.querySelector('#Conforme')

const ref_produit = document.querySelector('#ref-produit')
const peser_button = document.querySelector('.peser-button')

const nb_produit = document.querySelector('#nb_produit')

peser_button.addEventListener('click',(e)=>{
    const data = {
        nom_produit: ref_produit.value,
        nombre_de_produit: nb_produit.value
    }
    
    Myrequest("/API/balance/weight","POST",data) 
    .then((data)=>{
        span_poids.innerHTML = data.poids
        span_variation.innerHTML = data.variation
        conforme.innerHTML = data.conforme
    })
})



/*
Myrequest("http://172.16.185.202:3000/api/balance","GET") //Changer URI pour la mis en service
.then((data)=>console.log(data))*/