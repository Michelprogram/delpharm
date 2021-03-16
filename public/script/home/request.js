//Class Request pour envoyer à la page formulaire

const Myrequest = (URI,method) => {
    return Promise((resolve,reject)=>{
        const request = new XMLHttpRequest()
        request.onreadystatechange = ()=>{
            if (request.readyState == XMLHttpRequest.DONE && this.status == 200){
                console.log("request send")
            }
        }
        request.open(method,URI)
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        
        method == "POST" ? request.send(JSON.stringify(data)) :request.send()
        
    })
}
