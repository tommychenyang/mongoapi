/**
 * Created by TommyChen on 4/7/2016.
 */
var express=require('express');
var app=express();
var bodyParser=require('body-parser');
var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port=process.env.PORT||8080;

var router=express.Router();

router.use(function(req,res,next){
    console.log('something is happening');
    next();
});
router.get('/',function(req,res){
    res.json({message:"Welcome to my mongodb api"});

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
                res.send(err);

            }
            res.json({message:'Insert gundam'+ gundam.name});
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
                res.send(err);
            res.json(gundam);
         })
    });
app.use('/api',router);

app.listen(port);
console.log('web runs on port:' + port);