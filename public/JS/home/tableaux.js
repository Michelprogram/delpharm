//Gestion des tableaux Rapport, Produit, Référence
const table_rapport = document.querySelector('#table-rapport')
const table_utilisateur = document.querySelector('#table-utilisateur')
const table_produit = document.querySelector('#table-produit-reference')

//Remplir le tableau en question
const feed_table = (table,data) =>{
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

//Requests pour chaque tableau
Myrequest("/API/select/all_rapport","GET")
.then((data)=> feed_table(table_rapport,data) )

Myrequest("/API/select/all_controleur","GET")
.then((data)=> feed_table(table_utilisateur,data) )

Myrequest("/API/select/all_product","GET")
.then((data)=> feed_table(table_produit,data) )