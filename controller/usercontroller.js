
const fs = require('fs');

const path = require('path');
const slider = require('../model/slidermodel');
const offer = require('../model/offermodel')
const post = require('../model/postmodel')
const review = require('../model/reviewmodel')
const blog = require('../model/blogmodel')

module.exports.user = async (req,res)=>{
    let data =await slider.find({isActive:true});
    let datao =await offer.find({isActive:true});
    let datap =await post.find({isActive:true});
    let datare =await review.find({isActive:true});
    let databg =await blog.find({isActive:true});
    if(data){
    return res.render ('userview/u_dashboard',{
        slider:data,
        'offerdatas':datao,
        'datapost' :datap,
        'datareview' : datare,  
        'blogdata': databg

    })
}

}

