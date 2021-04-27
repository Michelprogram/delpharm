class Graphique{

    constructor(select,graphique){
        this.select = select
        this.graphique = graphique
        this.chart = null

        this.data = null

        this._init_graphique()
        this._init_select()
    }

    _init_select(){
        Request.send("/API/select/product_graphique","GET")
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

    _set_config_graph(liste_poids){
        const labels = [...Array(liste_poids.length)].map((_,i)=>i)
        this.chart.data.labels = labels
        this.chart.data.datasets[0].data = liste_poids

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

    update_graph(data_from_request){

        this.data = data_from_request
        this._set_config_graph(this.data.liste_poids)
        this._set_option_graph(this.data.poids_reference)
        this.chart.update()
    }
}