/* Animations des onglets */
const tabs_formulaire = document.querySelectorAll("#tabs-left>div")
const tabs_graphique = document.querySelectorAll("#tabs-right>div")


/* Animation pour les onglets de gauche */
tabs_formulaire.forEach((el)=>{
    el.addEventListener('click',(e)=>{
        const index = e.target.id.slice(-1)

        tabs_formulaire.forEach((sheet,i)=>{
            
            document.querySelector("#tab-content-left-"+i).style.display = "none"
            sheet.setAttribute("class","title-off")
        })

        document.querySelector("#tab-content-left-"+index).style.display = "flex"
        e.target.setAttribute("class","title-on")
        
    })
})

/* Animation pour les onglets de droite */
tabs_graphique.forEach((el)=>{
    el.addEventListener('click',(e)=>{
        const index = e.target.id.slice(-1)
        tabs_graphique.forEach((sheet,i)=>{
            if (i == 1) cells_table = document.querySelectorAll('#table-rapport > tr')
            document.querySelector("#tab-content-right-"+i).setAttribute("class","display-off")
            sheet.setAttribute("class","title-off")
        })

        document.querySelector("#tab-content-right-"+index).setAttribute("class","display-on")
        e.target.setAttribute("class","title-on")

    })
})
