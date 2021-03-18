const table_rapport = document.querySelector('#table-rapport')

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