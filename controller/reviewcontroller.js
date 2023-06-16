const review = require('../model/reviewmodel')

const fs = require('fs');

const path = require('path')

module.exports.addreview = async(req, res) => {
    return res.render('add_review')
}


module.exports.view_review = async(req, res) => {

    let reviewdata =await review.find({})
    return res.render('view_review',{
        reviewdata : reviewdata 
    })
    }
    
module.exports.insertreview = async(req, res) => {
try {
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
      });
    req.body.createdAt= nDate;
        req.body.updatedAt= nDate;
        req.body.isActive=true
    let data = await review.create(req.body)
    if (data) {
        return res.redirect('/review')
    } else {
        console.log("review data error");
    }
} catch (error) {
    console.log(error);
}
}

module.exports.isActive =async (req,res)=>{
    let data =await review.findById(req.params.id);
    if(data.isActive)
    {
        let Active = await review.findByIdAndUpdate(req.params.id,{isActive:false});
        if(Active){
            res.redirect('/review/view_review')
        }
    }
    else
    {
        let Actives = await review.findByIdAndUpdate(req.params.id,{isActive:true});
        if(Actives){
            res.redirect('/review/view_review');
        }
    }
}