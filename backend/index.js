const dboperations = require('./dbOperations');

var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request,response,next)=>{
   console.log('middleware');
   next();
})

router.route('/getUsers').get((request,response)=>{
    dboperations.getUsers().then(result => {
       response.json(result != undefined ? result[0] : null);
    })
})

router.route('/getUserbyLoginID/:loginid').get((request,response)=>{
   dboperations.getUserbyLoginID(request.params.loginid).then(result => {
      response.json(result != undefined ? result[0] : null);
   })
})

router.route('/getPosts/:id').get((request,response)=>{
    dboperations.getPosts(request.params.id).then(result => {
       response.json(result != undefined ? result[0] : null);
    })
})

router.route('/savePost/:id').post((request,response)=>{
    let post = {...request.body}

    dboperations.savePost(post, request.params.id).then(result => {
       response.status(201).json(result);
    })
})

route.route('/deletePost/:id').delete(()=>{
   dboperations.deletePost(request.params.id).then(result => {
      response.json(true);
   })
})

var port = process.env.PORT || 5000;
app.listen(port);
console.log('News POrtal API is running at ' + port);



