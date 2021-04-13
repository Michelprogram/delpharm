const select = document.querySelector('#produit-graphique')
const graphique =  document.querySelector('#graphique-chart')
const slider = document.querySelector('#Nb-echantillion')
const value_slider_graphique = document.querySelector('#value-echantillion')

const chart = new Graphique(select,graphique,slider,value_slider_graphique)

chart.slider.addEventListener('input',()=>{
    chart.value_slider.innerHTML = chart.slider.value
    //chart.update_graph_slider(chart.slider.value)
})

chart.select.addEventListener('change',(e)=>{
    const reference = e.target.value
    const URI = `/API/select/rapport/${reference}`
    Myrequest(URI,'GET')
    .then(data=>{
        chart.update_graph(data)
    })
})
