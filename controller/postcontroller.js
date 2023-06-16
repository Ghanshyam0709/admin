const post = require('../model/postmodel')

const fs = require('fs');

const path = require('path')


module.exports.post = async (req, res) => {
    return res.render('add_post')
}

module.exports.view_post = async (req, res) => {
    let datapost = await post.find({})
    return res.render('view_post', {
        datapost: datapost
    })
}

module.exports.insertpost = async (req, res) => {
    try {
        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
          });
        
        let img = post.postpath + "/" + req.file.filename
        req.body.image = img;
        req.body.createdAt= nDate;
        req.body.updatedAt= nDate;
        req.body.isActive=true
        let data = await post.create(req.body)
        if (data) {
            return res.redirect('/post')
        } else {
            console.log("post data error");
        }
    } catch (error) {
        console.log("this is not added"+error);
    }
}

module.exports.isActive =async (req,res)=>{
    let data =await post.findById(req.params.id);
    if(data.isActive)
    {
        let Active = await post.findByIdAndUpdate(req.params.id,{isActive:false});
        if(Active){
            res.redirect('/post/view_post')
        }
    }
    else
    {
        let Actives = await post.findByIdAndUpdate(req.params.id,{isActive:true});
        if(Actives){
            res.redirect('/post/view_post');
        }
    }
}