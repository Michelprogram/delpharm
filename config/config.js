const path = require('path')

exports.conf = {
    port: 8085,
    hostname: "127.0.0.1"
}

exports.database = {
    login: "",
    password: "",
    address:"",
    port:""
}

exports.directory =  path.join(__dirname, '../views')
