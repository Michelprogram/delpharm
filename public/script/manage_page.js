const select_tab = (index) =>{

    for (let i = 1; i < 4; i++) {
        document.querySelector("#tab"+i+"-content").setAttribute("class","display-off")
        document.getElementById("tab"+i).setAttribute("class","title-off")
    }

    document.querySelector("#tab"+index+"-content").setAttribute("class","display-on")
    document.querySelector("#tab"+index).setAttribute("class","title-on")
}

create_list_production(65,73,"#List_production",true)
create_list_production(1,51,"#Name_post",false)