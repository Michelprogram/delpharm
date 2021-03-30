//Fichier de configuration
const path = require('path')

exports.conf = {
    server : {
        port: 8085,
        address: "127.0.0.1"
    },
    database : {
        login: "Delpharm_user",
        password: "dNs903*NoNeck",
        address:"172.16.185.202",
        base : "Delpharm",
        port:"3306"
    }
    
}

exports.directory =  path.join(__dirname, '../views')
