const select = document.querySelector('#produit-graphique')
const graphique =  document.querySelector('#graphique-chart')
const value_slider_graphique = document.querySelector('#value-echantillion')

const chart = new Graphique(select,graphique)

chart.select.addEventListener('change',(e)=>{
    const reference = e.target.value
    const URI = `/API/select/rapport/${reference}`
    Myrequest(URI,'GET')
    .then(data=>{
        chart.update_graph(data)
    })
})
