const mongoose  = require("mongoose")

const Connect=()=>{
    mongoose.connect(process.env.MONGODB_URL , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log(`Database connected successfully on ${mongoose.connection.host}`);
    }).catch((err)=>{
        console.log(`Failed to connect to MongoDB database ${err.message}`);
    })
}

module.exports=Connect