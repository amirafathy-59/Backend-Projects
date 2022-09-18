const dataMethods=['body','params','query','file','headers']
const validation=(schema)=>{
    const validationArr=[]
    return(req,res,next)=>{
    try {
        dataMethods.forEach(key=>{
            if(schema[key]){
                 const validationResult= schema[key].validate(req[key],{abortEearly:false});
                  if (validationResult.error) {
                    validationArr.push(validationResult.error.details)
                  }
            }
         })
    
      if(validationArr.length){
        res.status(400).json({message:"validation error",validationArr})
      }
      else{
        next();
      }
    } catch (error) {
        res.status(500).json({message:"catch error",error})
    }

    }
}

module.exports={
    validation,
}