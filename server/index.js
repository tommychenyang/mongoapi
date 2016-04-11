/**
 * Created by TommyChen on 4/7/2016.
 */
var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose   = require('mongoose');
var path = require('path');
mongoose.connect('mongodb://localhost:27017/test');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port=process.env.PORT||8080;

var router=express.Router();

router.use(function(req,res,next){
    console.log('something is happening');
    next();
});


var Gundam     = require('./models/gundam');
var gundammodel = mongoose.model('gundam');
router.route('/gundam')
    .post(function(req,res){

        var gundam=new gundammodel();
        gundam.name=req.body.name;
        gundam.year=req.body.year;
        gundam.save(function(err){
            if(err)
            {
            return    res.send(err);

            }
         return   res.json({message:'Insert gundam'+ gundam.name});
        });
    })
    .get(function(req,res){
        gundammodel.find(function(err,gundams){
            if(err)
            res.send(err);
            res.json(gundams);
        })

    });
router.route('/gundam/:gundam_id')
    .get(function(req,res){
        gundammodel.findById(req.params.gundam_id,function(err,gundam){
            if(err)
                res.send(err);
            res.json(gundam);
        });
    })
    .put(function(req,res){
        gundammodel.findById(req.params.gundam_id,function(err,gundam){

            if(err)
            res.send(err);
            gundam.name=req.body.name;
            gundam.year=req.body.year;
            gundam.save(function(err){
                if(err)
                res.send(err);
                res.json({message:'Gundam updated'});

            })
        })
    })
    .delete(function(req,res){
        gundammodel.remove({_id:req.params.gundam_id},function(err,gundam){
            if(err)
           return     res.send(err);
         return   res.json(gundam);
         })
    });
var distFolder=path.resolve(__dirname, '../client/dist');
var srcFolder=path.resolve(__dirname,'../client/src');
var staticUrl='/static';
app.use(express.static(srcFolder));
app.use('/api',router);
app.use(staticUrl, express.static(distFolder));
app.use(staticUrl, function(req, res, next) {
    res.send(404); // If we get here then the request for a static file is invalid
});
app.all('/*', function(req, res) {
    // Just send the index.html for other files to support HTML5Mode
  return  res.sendFile('index.html', { root:  srcFolder });
});




app.listen(port);
console.log('web runs on port:' + port);