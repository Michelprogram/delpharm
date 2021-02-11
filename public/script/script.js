const value_slider = document.querySelector("#value-echantillion")
const slider = document.querySelector("#Nb_echantillion")
const form = document.querySelector("form")
const test = document.querySelector("#submit")


form.addEventListener('submit',(e)=>{
    console.log(e)
    const request = new XMLHttpRequest()
    request.onreadystatechange = ()=>{
        if (request.readyState == XMLHttpRequest.DONE && this.status == 200){
            console.log("request send")
        }
    }
    request.open("POST","/formulaire")
    request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    request.send(JSON.stringify({"email":"133"}))
    e.preventDefault()
})

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

const select_tab = (index) =>{

    for (let i = 1; i < 4; i++) {
        document.querySelector("#tab"+i+"-content").setAttribute("class","display-off")
        document.getElementById("tab"+i).setAttribute("class","title-off")
    }

    document.querySelector("#tab"+index+"-content").setAttribute("class","display-on")
    document.querySelector("#tab"+index).setAttribute("class","title-on")
}



slider.addEventListener('input',(e)=>{
    value_slider.innerHTML = e.target.value
})

create_list_production(65,73,"#List_production",true)
create_list_production(1,51,"#Name_post",false)

