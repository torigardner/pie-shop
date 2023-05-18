let fs = require('fs')
const FILE_NAME = './assets/pies.json'

let pieRepo = {
    get: function(resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err)
            }else{
                resolve(JSON.parse(data))
            }
        })
    },
    getById: function(id, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err)
            }else{
                let pie = JSON.parse(data).find(p => p.id == id)
                resolve(pie)
            }
        })
    },
    search: function(searchObject, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err)
            }else{
                let pies = JSON.parse(data)
                if(searchObject){
                    pies = pies.filter(p => (searchObject.id ? p.id == searchObject.id : true) && 
                    (searchObject.name ? p.name.toLowerCase().indexOf(searchObject.name.toLowerCase()) >= 0 : true))
                    resolve(pies)
                }else{

                }
            }
        })
    },
    insert: function(newPie, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err)
            }else{
                let pies = JSON.parse(data)
                pies.push(newPie)
                fs.writeFile(FILE_NAME, JSON.stringify(pies), function(err){
                    if(err){
                        reject(err)
                    }else{
                        resolve(newPie)
                    }
                })
            }
        })
    },
    update: function(updatedPie, id, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err)
            }else{
                let pies = JSON.parse(data)
                let pie = pies.find(p => p.id == id)
                if(pie){
                    Object.assign(pie, updatedPie)
                    fs.writeFile(FILE_NAME, JSON.stringify(pies), function(err){
                        if(err){
                            reject(err)
                        }else{
                            resolve(updatedPie)
                        }
                    })
                }else{

                }
            }
        })
    },
    delete: function(id, resolve, reject){
        fs.readFile(FILE_NAME, function(err, data){
            if(err){
                reject(err)
            }else{
                let pies = JSON.parse(data)
                let index = pies.findIndex(p=>p.id == id)
                if(index != -1){
                    pies.splice(index,1)
                    fs.writeFile(FILE_NAME, JSON.stringify(pies), function(err){
                        if(err){
                            reject(err)
                        }else{
                            resolve(index)
                        }
                    })
                }else{

                }
            }
        })
    }
}

module.exports = pieRepo