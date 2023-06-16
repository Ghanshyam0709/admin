const blog = require('../model/blogmodel')
const comment = require('../model/commentmodle');
const fs = require('fs');

const path = require('path')

module.exports.addblog = async (req,res)=>{
    return res.render('add_blog');
}

module.exports.view_blog = async (req,res) =>{
    let blogdata =await blog.find({})
    return res.render('view_blog',{
        'blogdata' : blogdata,
    })
}

module.exports.insertblog = async(req, res) => {
    try {
        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
          });
       
        let img = blog.blogpath + "/" + req.file.filename
        req.body.image = img;
        req.body.createdAt= nDate;
        req.body.updatedAt= nDate;
        req.body.isActive=true
        let data = await blog.create(req.body)
        if (data) {
            return res.redirect('/blog')
        } else {
            console.log("blog data error",err);
        }
        } catch (error) {
            console.log(error)
    }
}

module.exports.isActive =async (req,res)=>{
    let data =await blog.findById(req.params.id);
    if(data.isActive)
    {
        let Active = await blog.findByIdAndUpdate(req.params.id,{isActive:false});
        if(Active){
            res.redirect('/blog/view_blog')
        }
    }
    else
    {
        let Actives = await blog.findByIdAndUpdate(req.params.id,{isActive:true});
        if(Actives){
            res.redirect('/blog/view_blog');
        }
    }
}

module.exports.read_more = async (req,res)=>{
    let id= req.query.id ;
    try{
        let data = await blog.findById(id);
        if(data){
            return res.render('userview/blog_single',{
                data : data
            })
        }
    }
    catch (err){
        console.log(err);
    }
};

module.exports.insertcomment = async(req, res) => {
    try {
        let img = ''
        if(req.file){
            img = comment.commentpath + "/" + req.file.filename
        }
        req.body.image = img;       

        let data = await comment.create(req.body)
        if (data) {
            return res.redirect('back')
        } else {
            console.log("comment data error",err);
        }
        } catch (error) {
            console.log(error)
    }
}

