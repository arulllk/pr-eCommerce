const port = 4000;
const express = require('express');
const app = express();
const mongoose =  require('mongoose');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const cors = require('cors');
 

app.use(express.json())
app.use(cors())

//database connection
mongoose.connect('mongodb+srv://arulllk:1234@nodeexpressprojects.0zp0qgr.mongodb.net/ECOMMERCE-PR');

//api creation
app.get("/",(req,res)=>{
    res.send('Express app is running')
})


//Image creation engine

const storage = multer.diskStorage({
    // destination:function(req,file,cb){
    //     return cb(null,'./upload/images')
    // },
    destination:'./upload/images',
    filename:function(req,file,cb) {
        return cb(null,`${file.fieldname}_${Date.now()}-${ path.extname(file.originalname)}`)
    }
})

const upload = multer({storage})

// creating upload endpoint for images
app.use('/images',express.static('upload/images'))
app.post('/upload',upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})


//schema for adding product
const productSChema = mongoose.Schema({
    id:{ type:Number , required:true},
    name:{ type:String, required:true},
    image: { type: String, required: true },
    category:{type:String,required:true},
    new_price:{type:Number,required:true},
    old_price:{type:Number,required:true},
    date:{type:Date, default:Date.now},
    available:{type:Boolean, default:true}
})

const Product = mongoose.model('Product',productSChema)

app.post('/addproduct',async(req,res)=>{
    console.log(`req.body` , req.body);
    const {name,image,category,new_price,old_price} = req.body
    console.log('image ' , image);
    let products = await Product.find({})
    let id = 1;
    if(products.length>0) {
        let lastProductArray = products.slice(-1);
        let lastProduct = lastProductArray[0];
        id = lastProduct.id+1
    } 
     
    const product = new Product({
        id:id,
        name:name,
        image:image,
        category:category,
        new_price:new_price,
        old_price:old_price
    })

    await product.save(); // adding product to database     
    res.json({
        success:true, product : product
    }) 
})

//creating api for deleting product
app.post('/removeproduct',async(req,res)=>{    
    await Product.findOneAndDelete({id:req.body.id});
    console.log('Removed');
    res.json({
        success:true,
        name:req.body.name
    })
})


app.get('/allproducts',async(req,res)=>{
    let products = await Product.find({});
    res.send(products);
})

app.listen(port,(error)=>{
    if(!error){
        console.log(`Server runnion on port ${port}`);
    }else {
        console.log(`Error is ${error}`)
    }
})
