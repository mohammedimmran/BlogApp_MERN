const mongoose = require('mongoose');
//1234
const dbConnect = async () =>{

    try{

        await mongoose.connect(process.env.MONGODB_URL, {
          
            useNewUrlParser:true,
            useUnifiedTopology: true,
            // useFindAndModify:false
            
        });
        console.log("dbConnect connect success")
    }catch(e){

        console.log(e)
    };

}
module.exports = dbConnect;