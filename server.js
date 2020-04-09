const express = require('express');
const hbs = require('hbs');
const app = express();
const port = 5050; // anything above 4000 for ports is fine for  a port.

//Linking in the index.html file, has to be before all routes.
//.static is a built in middleware method. Controls what the users can see via authenitcation.
app.use(express.static(__dirname + '/public'));

//Setup hbs as view engine
//.set is the setup and 'view engine' is telling it to setup 'hbs'
app.set('view engine', 'hbs')

//use partials: tells them where to get the paritals.
hbs.registerPartials(__dirname + "/views/partials");

//Middleware method: logs to the terminal
app.use((req,res,next)=>{
    console.log(`${req.ip} - ${req.method} ${req.path}`);//this logs the IP as well as what they tried to access to the console.
    next();//tells the app to go on to the rest of my methods, can be set to do more.
});


//defines the root response
// localhost:5050/
app.get('/', (req,res)=>{
    //Transmits this as HTML, JSON, Plain Text, or some sort of file. Express will read that it is a HTML or JSON. 
    // responds with the index.html when calling from the root.
    res.sendFile(__dirname + "index.html");
})

// localhost:5050/contact
app.get('/contact',(req,res) =>{
    res.render('contact.hbs',{
        pageHeader: "Contacts",
        pageName:"Thomas",
        pagePhone:"507-555-5555"
    });
})

//route
//To get response: LocalHost:5050/faq
app.get('/faq',(req, res)=>{
    
    //.render makes it create the content from the hbm because it is not an actual HTML file.
    res.render('faq.hbs',{
        pageHeader:"Frequently Asked Questions", //inserts text intp the {{pageHeading}} in faq.hbm
        pageAuthor: "Thomas Shortall", //inserts text intp the {{pageAuthor}} in faq.hbm
        copyrights:"All Rights Reserved"//insers the footer from the footers.hbs
    });
})

//route 
//To get response: LocalHost:5050/data
app.get('/data',(req,res) => {
    res.send({'temp': 98.6, "power": "one","Enable": true})
})

//route
app.listen(port,()=>{
    // Returns this to the terminal
    console.log(`Web server listening on port ${port}`);
})