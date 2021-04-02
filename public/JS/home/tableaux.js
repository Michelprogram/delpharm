//Gestion des tableaux Rapport, Produit, Référence
const table_rapport = document.querySelector('#table-rapport')
const table_utilisateur = document.querySelector('#table-utilisateur')
const table_produit = document.querySelector('#table-produit-reference')

//Remplir le tableau en question
const remplir_tableau = (table,data) =>{
    for (const key in data) {
        const tr = document.createElement('tr')
        for (const [keys, value] of Object.entries(data[key])) {
            const td = document.createElement('td')
            const text_node = document.createTextNode(`${value}`)
            td.appendChild(text_node)
            tr.appendChild(td)
        }
        
        table.appendChild(tr)
    }
}


//Remplir tableau rapport
Myrequest("/API/select/all_rapport","GET")
.then((data)=>{

    //Supprime T et Z dans les dates format ISO 8601
    data.forEach(element => element.Time = element.Time.replace(/T|Z/gm,' '))
    remplir_tableau(table_rapport,data) 
})

//Remplir tableau utilisateur
Myrequest("/API/select/all_controleur","GET")
.then((data)=> remplir_tableau(table_utilisateur,data) )

//Remplir tableau produit
Myrequest("/API/select/all_product","GET")
.then((data)=> remplir_tableau(table_produit,data) )

