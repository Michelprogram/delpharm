const print_button = document.querySelector('.print-button')

const cells = () => {
    const cells_tabs = document.querySelectorAll('#table-rapport > tr')

    cells_tabs.forEach(el => {
        el.setAttribute('class','')
        el.addEventListener('click',()=>{
            el.getAttribute('class') == "tr-active" ? el.setAttribute('class','') : el.setAttribute('class','tr-active')
        })
    })

}

let test = 0

print_button.addEventListener('click',()=>{
    const list_tr = document.querySelectorAll('#table-rapport > .tr-active')
    const params = {
    }
        "id",'Contrôleur','Date et heure','Service de production','Nom du poste','Référence du produit','Mesure','Variation','Conforme','Nombre de produits']
    let list_data = []

    list_tr.forEach((el)=>{
        const tempo = [...el.childNodes].map((td)=>td.textContent)
        let result = {}
        //let result =  Object.assign.apply({}, params.map( (v, i) => ( {[""+v]: tempo[i]} ) ) );
        params.forEach((el,i)=> result[el.toString()] = tempo[i])
        list_data.push(result)
    })

    console.log(list_data)

   //Request.send("/Impression/unitaire","POST",list_data)

})

