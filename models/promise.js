const db = require('./db')

const My_promise = (request) =>{
    return new Promise((resolve,reject)=>{
      db.query(request,(err,result)=>{
        
        if (err){
          throw err
        } else {
          resolve(result)
        }
      })
    })
}

module.exports = My_promise