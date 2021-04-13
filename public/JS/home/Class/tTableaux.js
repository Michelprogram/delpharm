class Tableau{

    constructor(table_rapport,table_produit,table_controleur){
        this.table_rapport = table_rapport
        this.table_produit = table_produit
        this.table_controleur = table_controleur

        this.rapport()
        this.controleur()
        this.produit()

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
            
            for (const [keys, value] of Object.entries(data[key])) {
                const td = document.createElement('td')
                td.setAttribute('class','data-from-BDD')
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