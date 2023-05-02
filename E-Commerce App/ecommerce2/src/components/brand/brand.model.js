const { Schema, model, Types } = require("mongoose");
const schema = Schema({
  name: {
    type: String,
    required: [true, "Brand name required"],
    trim: true,
    unique: [true, "Brand name unique"],
    minlength: [2, "too short Brand name"],
  },
  slug:{
    type:String,
    lowercase:true,
},
  image: String,
},{timestamps:true});
schema.post('init',(doc)=>{
  doc.image="http://localhost:3000/brand/"+doc.image
})
module.exports = model("barnd", schema);
