const balance = require('../balance/balance')

const get_poids = () => {

    return new Promise((resolve, reject) => {

        balance.on("data", (line) => {

            line = line.replace(/\s/g, '')

            poids = line.slice(2)

            resolve(poids)

        });

    })

}

const weight = (req,res) =>{
    get_poids()
    .then((poids) => {
        res.json({
            poids : poids
        })
    })
    return 
}

module.exports = weight