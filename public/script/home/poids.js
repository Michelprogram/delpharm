const span_poids = document.querySelector('#Poids_produit')
const span_variation = document.querySelector('#Variation')

const conforme = document.querySelector('#Conforme')
const img_button = document.querySelector('#img-button-peser')
const text_button_peser = document.querySelector('#texte-peser')

const ref_produit = document.querySelector('#ref-produit')
const peser_button = document.querySelector('.peser-button')

const nb_produit = document.querySelector('#nb_produit')


const animation_button = () =>{
    text_button_peser.innerHTML = ""
    img_button.setAttribute('src','/static/images/home/load.svg')
}


peser_button.addEventListener('click',(e)=>{
    const data = {
        nom_produit: ref_produit.value,
        nombre_de_produit: nb_produit.value
    }

    animation_button()
    
    Myrequest("/API/balance/weight","POST",data) 
    .then((data)=>{
        span_poids.innerHTML = data.poids
        span_variation.innerHTML = data.variation
        data.conforme ? conforme.setAttribute('src','/static/images/home/true.svg') : conforme.setAttribute('src','/static/images/home/false.svg')
        data.conforme.style.display = "block"
    })
})



/*
Myrequest("http://172.16.185.202:3000/api/balance","GET") //Changer URI pour la mis en service
.then((data)=>console.log(data))*/