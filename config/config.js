const path = require('path')

exports.conf = {
    port: 8085,
    hostname: "127.0.0.1"
}

exports.directory =  path.join(__dirname, '../views')


exports.path = {
    html : __dirname+"/public/html/index.html",
    notfound : __dirname+"/public/html/404.html",
    css : __dirname+"/public/style",
    script : __dirname+"/public/script",
    images : __dirname+"/public/images"
}
