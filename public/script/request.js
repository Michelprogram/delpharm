class Request{

    static formulaire(params) {
        const request = new XMLHttpRequest()
        request.onreadystatechange = ()=>{
            if (request.readyState == XMLHttpRequest.DONE && this.status == 200){
                console.log("request send")
            }
        }
        request.open("POST","/formulaire")
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify({"email":"133"}))
    }
}