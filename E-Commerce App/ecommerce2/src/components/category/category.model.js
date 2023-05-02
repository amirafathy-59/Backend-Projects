const {Schema,model}=require('mongoose')
const schema=Schema({
    name:{
        type:String,
        required:[true,'category name required'],
        trim:true,
        unique:[true,'category name unique'],
        minlength:[2,'too short category name'], 
    },
    slug:{
        type:String,
        lowercase:true,
    },
    image:String
},{timestamps:true})

schema.post('init',(doc)=>{
    doc.image="http://localhost:3000/category/"+doc.image
  })
module.exports=model('category',schema)