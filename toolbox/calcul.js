class Calcul{
    constructor(){}

    static variation = (peser,reference,facteur)=>{
        peser = peser.slice(0,-2)
        return Math.abs((parseFloat(peser)/parseInt(facteur) - parseFloat(reference))).toFixed(2)
    
    }

    static conformite = (variation,reference) =>{
        return parseFloat(variation) >= 0.005 * parseFloat(reference) ? false : true
    /*
        ref = 48.89
        conforme = 0.05
        result = 0.005 * 48.89
        si le resultat est supérieur ou inférieur à la variation non conforme
    */
    }

    static date = () =>{
        const date = new Date()
        const final_date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        return final_date
    }
}

module.exports = Calcul
