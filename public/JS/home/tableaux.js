/* Gestion des tableaux Rapport, Produit, Référence */
const table_rapport = document.querySelector('#table-rapport')
const table_produit = document.querySelector('#table-produit-reference')
const table_controleur = document.querySelector('#table-utilisateur')
const button_refresh = document.querySelectorAll('.refresh-button')

/* Création de l'objet Tableaux */
const tables = new Tableaux(table_rapport,table_produit,table_controleur)

/* Animation de spin pour le boutton refresh quand on click dessus*/
const animation_button_refresh = (img)=>{
    img.setAttribute('class','refresh-button-img-trigger')
    setTimeout(()=>{img.setAttribute('class','refresh-button-img')},500)
}

/* Chaque bouton refresh va actualiser son tableau qui lui est associé */
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