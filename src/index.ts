import express from "express";
import mongoose  from "mongoose";
import bodyParser from "body-parser";
var cors=require('cors');
const app=express();
const port=3001;
const uri = "mongodb+srv://Divyansh:Divyansh@cluster0.n8u9pu6.mongodb.net/test?retryWrites=true&w=majority";
const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}





const userSchema=new mongoose.Schema({
    patient_name:String,
    patient_email:String,
    doctor_name:String,
    id:Number
});

const hashSchema=new mongoose.Schema({
    link:String
})
const Hash=mongoose.models['hashes'] || mongoose.model("hashes",hashSchema);
const User= mongoose.models['Users'] || mongoose.model("Users",userSchema);

const user=new User({
    name:"dsad Gupta",
    email:"jjbkj.com",
    doctor:"Kush",
    id:1
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());



app.get('/data',async (req,res)=>{
   await mongoose.connect(uri).then(()=>
    console.log("Mongo Atlas connected Successfully")
    ).catch(
        (err)=>console.log(err)
    );

    var result= await User.find().then((a)=>{
        res.send(a);
    }).catch((err)=>{
        console.log(err);
    })
    // console.log(result);
    mongoose.connection.close();
    
    
});


app.get('/doctor',async (req,res)=>{
   await mongoose.connect(uri).then(()=>
    console.log("Mongo Atlas connected Successfully")
    ).catch(
        (err)=>console.log(err)
    );

    var result= await User.find().then((a)=>{
        let doc=a.map((elem)=>{
            return elem.doctor_name;
        })

        res.send(doc);
    }).catch((err)=>{
        console.log(err);
    })
    // console.log(result);
    mongoose.connection.close();
    
    
});


app.post('/hash', async(req,res)=>{
    await mongoose.connect(uri).then(()=>
    console.log("Mongo Atlas connected Successfully")
    ).catch(
        (err)=>console.log(err)
    );
    const gethash=await req.body.hash;
    console.log(gethash)
    const storehash=new Hash({
        link:gethash
    });
   await storehash.save().then(
    ()=>{console.log("Hash saved successfully")}
   );
    res.json({"status":gethash})
    mongoose.connection.close();
});




app.get('/allhash',async(req,res)=>{
    await mongoose.connect(uri).then(()=>
    console.log("Mongo Atlas connected Successfully")
    ).catch(
        (err)=>console.log(err)
    );
    var result=await Hash.find().then(
        (a)=>{
            let hashresponse=a.map((elem)=>{
                return elem.link;
            })
            res.send(hashresponse);
        }
    ).catch((err)=>{console.log(err)});




    mongoose.connection.close();
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})


