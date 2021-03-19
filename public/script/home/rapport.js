const table_rapport = document.querySelector('#table-rapport')
const table_utilisateur = document.querySelector('#table-utilisateur')
const table_produit = document.querySelector('#table-produit-reference')

Myrequest("/API/select/all_rapport","GET")
.then((data)=>{
    for (const key in data) {
        const tr = document.createElement('tr')
        for (const [keys, value] of Object.entries(data[key])) {
            const td = document.createElement('td')
            const text_node = document.createTextNode(`${value}`)
            td.appendChild(text_node)
            tr.appendChild(td)
        }
        
        table_rapport.appendChild(tr)
    }
})

Myrequest("/API/select/all_controleur","GET")
.then((data)=>{
    for (const key in data) {
        const tr = document.createElement('tr')
        for (const [keys, value] of Object.entries(data[key])) {
            const td = document.createElement('td')
            const text_node = document.createTextNode(`${value}`)
            td.appendChild(text_node)
            tr.appendChild(td)
        }
        
        table_utilisateur.appendChild(tr)
    }
    console.log(data)
})


Myrequest("/API/select/all_product","GET")
.then((data)=>{
    for (const key in data) {
        const tr = document.createElement('tr')
        for (const [keys, value] of Object.entries(data[key])) {
            const td = document.createElement('td')
            const text_node = document.createTextNode(`${value}`)
            td.appendChild(text_node)
            tr.appendChild(td)
        }
        
        table_produit.appendChild(tr)
    }
    console.log(data)
})