const print_button = document.querySelector('.print-button')
const span_imprimante = document.querySelector('#status-group-button')

//Fonction cells quand on appuie sur l'onglet Rapport
const cells = () => {
    span_imprimante.textContent = ""
    const cells_tabs = document.querySelectorAll('#table-rapport > tr')

    //Animation du tr sélectionner
    cells_tabs.forEach((el) => {
        el.addEventListener('click',()=>{
            cells_tabs.forEach(element => el != element ? element.setAttribute('class','') : element.setAttribute('class','tr-active'))
        })
    })

}

//Fonction quand on appuie sur le bouton imprimante
print_button.addEventListener('click',()=>{
    const list_tr = document.querySelectorAll('#table-rapport > .tr-active')
    const params = {
        id:0,
        Controleur:0,
        Date_heure:0,
        Service_de_production:0,
        Nom_du_Poste:0,
        Reference_du_produit:0,
        Mesure:0,
        Variation:0,
        Conforme:0,
        Nombre_de_produit:0
    }
    let list_data = []
    list_tr.forEach((el)=>{
        const tempo = [...el.childNodes].map((td)=>td.textContent)
        let result = {...params}
        let i = 0
        for(const key in params){
            result[key] = tempo[i]
            i++
        }
        list_data.push(result)
    })

   Request.send("/Impression/unitaire","POST",list_data)
   .then((data)=>{
       cells_tabs.forEach(el => el.setAttribute('class',''))
        span_imprimante.textContent = data.status
   })
})

