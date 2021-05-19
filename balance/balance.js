const serialPort = require("serialport")

const Readline = require("@serialport/parser-readline")
const parser = new Readline();

const Parameters = {
    autoOpen: false,
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1
}

const balance = new serialPort('/dev/ttyUSB0',Parameters)

balance.pipe(parser);

balance.open((err) => {

    err ? console.log("Erreur de connexion Serialport", err) : console.log("Connecté à la balance")

})


const get_poids = () => {

    return new Promise((resolve, reject) => {

        balance.on("data", (line) => {

            line = line.replace(/\s/g, '')

            poids = line.slice(2)

            resolve(poids)

        });

    })

}

module.exports = {
    get_poids
}


 
 
