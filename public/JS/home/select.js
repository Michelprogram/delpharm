//Gestion du graphique
const selects = document.querySelectorAll('#produit-graphique,#ref-produit')


Myrequest("/API/select/all_product","GET")
.then((data) => {
    for (const key in data) {
        const name = data[key].Nom
        const reference = data[key].Reference
        for (let index = 0; index < 2; index++) {
            const option = document.createElement('option')
            if ( index == 1 ){
                option.value = reference
            } else {
                option.value = name
            }
            option.innerHTML = name
            selects[index].appendChild(option)
        }       
    }
})

