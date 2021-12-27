var fs = require('fs');
var path = require('path');
var jsonPath = path.join(__dirname, '..', 'authorization.txt');
const db = require('../models')

const Log = db.Log;

const storeLogsToDB = async (req, res, next) => {



  var txtString = fs.readFileSync(jsonPath, 'utf8');



  const arrtxtString = txtString.split(",") 

  if (arrtxtString.length > 1 ) {


    const lastLog = arrtxtString[arrtxtString.length -2 ]

    const logInfo = {log: lastLog}
    
    const createLog =  async (logInfo) => { 
      await Log.create(logInfo);
      console.log(logInfo); 
    }
  
    createLog(logInfo);
  
  
    return next();

  }

 


  return next();
}

module.exports = storeLogsToDB;