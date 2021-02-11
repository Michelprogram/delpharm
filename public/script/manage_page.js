const select_tab = (index) =>{

    for (let i = 1; i < 4; i++) {
        document.querySelector("#tab"+i+"-content").setAttribute("class","display-off")
        document.getElementById("tab"+i).setAttribute("class","title-off")
    }

    document.querySelector("#tab"+index+"-content").setAttribute("class","display-on")
    document.querySelector("#tab"+index).setAttribute("class","title-on")
}

