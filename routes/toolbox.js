const readFile = require('fs').readFile

const render = (html,res) => {
    const headers = {
        'Content-Type': 'text/html'
    }
    readFile(html, (err, data) => {
        
        if (err) {
            res.writeHead(500,headers)
            res.write("Erreur file")
        } else {
            res.writeHead(200, headers)
            res.write(data.toString())
        }
        res.end()
    })
}

module.exports = render