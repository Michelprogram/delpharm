/* Gestion du graphique */
const select = document.querySelector('#produit-graphique')
const graphique =  document.querySelector('#graphique-chart')
const value_slider_graphique = document.querySelector('#value-echantillion')

/* Déclaration de l'objet graphique */
const chart = new Graphique(select,graphique)

/* A chaque changement dans la select box, met à jour le graphique */
chart.select.addEventListener('change',(e)=>{
    const reference = e.target.value
    const URI = `/API/select/rapport/${reference}`
    Request.send(URI,'GET')
    .then(data=>{
        chart.update_graph(data)
    })
})
