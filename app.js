const morgan = require('morgan')
const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash');
const app = express();
const { result } = require('lodash');
const { render } = require('ejs');
const blogRoutes = require('./Routes/blogRoutes');

//connecting monodb
const mongo = 'mongodb://localhost:27017/node';
mongoose.connect(mongo,{
    useNewUrlParser:true, useUnifiedTopology: true
},(err)=>{
    if(err){
        console.log(err)
    }
    else{
        //listen for requests after the db is connected
        app.listen(3000);
        console.log('connected successfully');
    }
})

//setting ejs as view engine
app.set('view engine','ejs');

//static middleware to navigate the styles folder in order to load css files and images
app.use(express.static('styles'));
//permit transfer of input data from forms 
app.use(express.urlencoded({extended: true})); 
//it enables next() to work__morgan npm
app.use(morgan('dev'));


app.get('/add-blog',(req,res)=>{
    const blog = new Blog({
        title: 'new blog 2',
        snippet: 'about my new blog',
        body: 'more about new blog with node'
             } 
    );

    blog.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    });
})

//response
app.use((req,res,next) =>{
    console.log("New Request Made");
    console.log("Host: ", req.hostname );
    console.log("URL: ", req.url);
    console.log("Method: ", req.method);
    next();
})

app.get('/',(req,res)=>{
    //res.render('index',{ title: 'Home'});
    res.redirect('/blogs')
})
app.get('/about',(req,res)=>{
    res.render('about', {title: 'About'});
   
})


//blog routes

app.get('/blogs/create',(req,res)=>{
    res.render('create', {title: 'Create A New Blog'})
})

app.use('/blogs',blogRoutes);


app.use((req,res)=>{
    res.status(404).render('404', {title: '404'})
})    