
//Remplir les selects
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

create_list_production(65,73,"#List_production",true)
create_list_production(1,51,"#Name_post",false)