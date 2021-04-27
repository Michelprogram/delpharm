/* Class tableau pour gérer les tableaux de gauche*/
class Tableaux{

    /* Le constructeur initialise ces tableaux */
    constructor(table_rapport,table_produit,table_controleur){
        this.table_rapport = table_rapport
        this.table_produit = table_produit
        this.table_controleur = table_controleur

        this.rapport()
        this.controleur()
        this.produit()

    }
    /*  Méthode qui nettoie / vide les tableaux 
        Boucle for commence à 1 pour ne pas effacer les th
    */
    _clean_table(table){
        const nb_rows = table.rows.length
        for(let i=1;i<nb_rows;i++){
            table.removeChild(table.children[1])
        }
    }

    /* Suite à la requête à l'API le tableau se remplit */
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

    /* Requête pour le tableau rapport */
    rapport = function(){
        Myrequest("/API/select/all_rapport","GET")
        .then((data)=>{
            //Supprime T et Z dans les dates format ISO 8601
            data.forEach(element => element.Time = element.Time.replace(/T|Z/gm,' '))
            this._remplir_tableau(this.table_rapport,data)
        })
    }

    /* Requête pour le tableau produit */
    produit (){
        Myrequest("/API/select/all_product","GET")
        .then((data)=> this._remplir_tableau(this.table_produit,data) )
    }

    /* Requête pour le tableau controleur */
    controleur (){
        Myrequest("/API/select/all_controleur","GET")
        .then((data)=> this._remplir_tableau(this.table_controleur,data))
    }
    
}