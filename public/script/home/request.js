const Myrequest = (URI,method,data={}) => {
    return new Promise((resolve,reject)=>{
        const request = new XMLHttpRequest()
        request.onreadystatechange = ()=>{
            if (request.readyState == XMLHttpRequest.DONE && request.status == 200){
                data = JSON.parse(request.responseText)
                resolve(data)
            }
        }
        request.open(method,URI)
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        
        method == "POST" ? request.send(JSON.stringify(data)) : request.send()
        
    })
}
