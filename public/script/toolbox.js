const create_list_production = (start,stop,element,flag) => {
    const ListProduction = document.querySelector(element)

    for (let index = start; index < stop; index++) {
        const option = document.createElement("option")

        if (flag){
            option.value = String.fromCharCode(index)
            option.text = String.fromCharCode(index)
        }else{
            option.value = String(index)
            option.text = String(index)
        }

        option.setAttribute("class","Element_list")
        ListProduction.appendChild(option)

    }
}

const valid_form = ()=>{
    if (numero_controleur.value === "" ){
        console.log("Champ controleur non complet")
    }
    else if (ref_produit.value === ""){
        console.log("Champ produit non complet")

    }
    else if (service_production.value === 'null'){
        console.log("Champ production non complet")

    }
    else if (nom_poste.value === 'null'){
        console.log("Champ poste non complet")
    }
    else if (poids.textContent === "0"){
        console.log("Poids invalid")

    }
}

create_list_production(65,73,"#List_production",true)
create_list_production(1,51,"#Name_post",false)