class Graphique{

    constructor(){
        this.select = document.querySelector('#produit-graphique')
        this.graphique =  document.querySelector('#graphique-chart')
        this.slider = document.querySelector('#Nb-echantillion')
        this.value_slider = document.querySelector('#value-echantillion')
        this.chart = null

        this.data = null

        this._init_graphique()
        this._init_slider()
        this._init_select()
    }

    _init_select(){
        Myrequest("/API/select/product_graphique","GET")
        .then((data)=>{
            for (const key in data) {
                const name = data[key].Nom
                const reference = data[key].Reference
                const option = document.createElement('option')
                option.value = reference
                option.innerHTML = name
                this.select.appendChild(option)
                
            }
        })
    }

    _set_option_graph(value){
        this.chart.config.options.plugins.annotation.annotations.line1.yMin = value
        this.chart.config.options.plugins.annotation.annotations.line1.yMax = value

        this.chart.config.data.datasets[1].label = `Poids du produit de référence ${value}g`
        this.chart.config.data.datasets[0].label = `Référencé du produit ${this.select.value}`
        
    }

    _set_config_graph(liste_poids,size){
        const nb_products = liste_poids.length
        const labels = size ? size : this._remplir_lables(nb_products)

        this.chart.data.labels = labels
        this.chart.data.datasets[0].data = liste_poids

    }

    _remplir_lables(size){
        let tab = []
        for(let i=1;i<size+1;i++)
            tab.push(i)
        
            return tab
    }

    _init_slider(){
        this.slider.value = 1
        this.value_slider.innerHTML = 1
    }

    _init_graphique(){
        const options = {
            plugins: {
                autocolors: false,
                annotation: {
                  annotations: {
                    line1: {
                      type: 'line',
                      yMin: 0,
                      yMax: 0,
                      borderColor: 'rgb(255, 99, 132)',
                      borderWidth: 2,
                    }
                  }
                }
              }
        }

        const config = {
            type: 'bar',
            data: {
                labels:[],
                datasets:[{
                    label: "Produit de référence",
                    data:[],
                    backgroundColor: "rgb(56, 173, 169)",
                },{
                    label : "Pois de référence ",
                    backgroundColor: "rgb(255, 99, 132)"
                }]
            },
            options:options
        }

        this.chart = new Chart(this.graphique,config)
    }

    _update_slider_range(size){
        this.slider.max = `${size}`
        this.slider.value = size
        this.value_slider.innerHTML = size
    }

    update_graph(data_from_request){

        this.data = data_from_request
        this._set_config_graph(this.data.liste_poids)
        this._set_option_graph(this.data.poids_reference)
        this._update_slider_range(this.data.liste_poids.length)
        this.chart.update()
    }

    update_graph_slider(size){
        this._set_config_graph(this.data.liste_poids,size)

        this.chart.update()
    }
    

}

const chart = new Graphique()

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
