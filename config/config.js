const path = require('path')

exports.conf = {
    server : {
        port: 8085,
        address: "127.0.0.1"
    },
    database : {
        login: "",
        password: "",
        address:"",
        port:""
    }
    
}

exports.directory =  path.join(__dirname, '../views')
