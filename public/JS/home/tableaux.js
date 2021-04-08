//Gestion des tableaux Rapport, Produit, Référence
class Tableau{

    constructor(){
        this.table_rapport = document.querySelector('#table-rapport')
        this.table_produit = document.querySelector('#table-produit-reference')
        this.table_controleur = document.querySelector('#table-utilisateur')


    }

    _clean_table(table){
        const nb_rows = table.rows.length
        //Commence à 1 pour pas effacer les th
        for(let i=1;i<nb_rows;i++){
            table.removeChild(table.children[1])
        }
    }

    _remplir_tableau(table,data){
        this._clean_table(table)
        for (const key in data) {
            const tr = document.createElement('tr')
            tr.setAttribute('class','data-from-BDD')
            for (const [keys, value] of Object.entries(data[key])) {
                const td = document.createElement('td')
                const text_node = document.createTextNode(`${value}`)
                td.appendChild(text_node)
                tr.appendChild(td)
            }
            table.appendChild(tr)
        }
    }

    rapport = function(){
        Myrequest("/API/select/all_rapport","GET")
        .then((data)=>{
            //Supprime T et Z dans les dates format ISO 8601
            data.forEach(element => element.Time = element.Time.replace(/T|Z/gm,' '))
            this._remplir_tableau(this.table_rapport,data)
        })
    }

    produit (){
        Myrequest("/API/select/all_product","GET")
        .then((data)=> this._remplir_tableau(this.table_produit,data) )
    }

    controleur (){
        Myrequest("/API/select/all_controleur","GET")
        .then((data)=> this._remplir_tableau(this.table_controleur,data))
    }
    
}


const button_refresh = document.querySelectorAll('.refresh-button')
const animation_button_refresh = (img)=>{
    img.setAttribute('class','refresh-button-img-trigger')
    setTimeout(()=>{img.setAttribute('class','refresh-button-img')},500)
}

const tables = new Tableau()
tables.rapport()
tables.produit()
tables.controleur()

button_refresh.forEach((button)=>{
    button.addEventListener('click',(e)=>{
        animation_button_refresh(e.target)
        const id = e.target.parentNode.id.slice(-1)
        switch(id){
            case "1":
                tables.rapport()
                break
            case "2":
                tables.controleur()
                break
            case "3":
                tables.produit()
                break
        }
    })
})