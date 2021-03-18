const select_graphique = document.querySelector('#produit-graphique')

Myrequest("/API/select/all_product","GET")
.then((data) => {
    for (const key in data) {
        const name = data[key].Nom
        const option = document.createElement('option')
        option.value = name
        option.innerHTML = name
        select_graphique.appendChild(option)
        
    }
})