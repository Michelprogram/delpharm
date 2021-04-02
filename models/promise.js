//Fonction promesse pour les requêtes SQL
const db = require('./db')

module.exports =  My_promise = (request) =>{
    return new Promise((resolve,reject)=>{
      db.query(request,(err,result)=>{
        
        if (err){
          reject(err)
        } else {
          resolve(result)
        }
      })
    })
}
