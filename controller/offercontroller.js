const offer = require('../model/offermodel')

const fs = require('fs');

const path = require('path')

module.exports.addoffer = async(req, res) => {
return res.render('add_offer')
}


module.exports.view_offer = async(req, res) => {

    let offerdata =await offer.find({})
    return res.render('view_offer',{
        offerdata : offerdata 
    })
    }
    
module.exports.insertoffer = async(req, res) => {
try {
    const nDate = new Date().toLocaleString('en-US', {
        timeZone: 'Asia/Calcutta'
      });
    req.body.createdAt= nDate;
        req.body.updatedAt= nDate;
        req.body.isActive=true
    let data = await offer.create(req.body)
    if (data) {
        return res.redirect('/offer')
    } else {
        console.log("offer data error");
    }
} catch (error) {
    console.log(error);
}
}

module.exports.isActive =async (req,res)=>{
    let data =await offer.findById(req.params.id);
    if(data.isActive)
    {
        let Active = await offer.findByIdAndUpdate(req.params.id,{isActive:false});
        if(Active){
            res.redirect('/offer/view_offer')
        }
    }
    else
    {
        let Actives = await offer.findByIdAndUpdate(req.params.id,{isActive:true});
        if(Actives){
            res.redirect('/offer/view_offer');
        }
    }
}