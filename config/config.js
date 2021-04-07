//Fichier de configuration
const path = require('path')

exports.conf = {
    server : {
        port: 8085,
        address: "127.0.0.1"
    },
    database : {
        host:"192.168.1.61",
        //host:"172.16.185.202",
        user: "Delpharm_user",
        password: "dNs903*NoNeck",
        database : "Delpharm"
    }
    
}

exports.directory =  path.join(__dirname, '../views')
