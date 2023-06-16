const slider = require('../model/slidermodel')

const fs = require('fs');

const path = require('path')

module.exports.addslider = async (req,res)=>{
    return res.render('add_slider');
}

// module.exports.view_slider = async (req,res) =>{
//     var search = '';
//     if(req.query.search)
//     {
//         search = req.query.search;
//     }
    
//     var page =1 ;

//     var per_page = 2 ;
//     if(req.query.page)
//     {
//         page = req.query.page;

//     }
//     let sliderdata =await slider.find({
//         $or:[
//             { title: { $regex :".*"+search+".*",$options:'i'}}
//         ]
//     }).limit(per_page*1)
//     .skip((page-1)*per_page)
//     .exec();

//     let countdata =await slider.find({
//         $or:[
//             { title: { $regex :".*"+search+".*",$options:'i'}}
//         ]
//     }).countDocuments();

//     let pagenu = Math.ceil(countdata/per_page);



//     return res.render('view_slider',{
//         'sliderdata' : sliderdata,
//         pageno:pagenu,
//         cpage: page,
//         search: search
//     })
// }

module.exports.view_slider = async (req, res) => {
    try {

        if (req.query.status == 'deActive') {
            let Active = await slider.findByIdAndUpdate(req.query.id, { isActive: false });
        }
        if (req.query.status == 'Active') {
            let Active = await slider.findByIdAndUpdate(req.query.id, { isActive: true });
        }

        let search = '';
        if (req.query.search) {
            search = req.query.search;
        }

        var page = 1;
        if (req.query.page) {
            page = req.query.page;
        }
        var per_page = 2;

        let data = await slider.find({
            $or: [
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { content: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]
        }).limit(per_page * 1)
            .skip((page - 1) * per_page)
            .exec();

        let data_count = await slider.find({
            $or: [
                { title: { $regex: '.*' + search + '.*', $options: 'i' } },
                { content: { $regex: '.*' + search + '.*', $options: 'i' } }
            ]
        }).countDocuments();

        let pageNum = Math.ceil(data_count / per_page);

        if (data) {
            res.render('view_slider', ({
                data: data,
                page_Num: pageNum,
                cpage: page,
                search: search
            }));
        }
    } catch (error) {
        console.log("slider view_page err : ", error);
    }
}

module.exports.insertslider = async(req, res) => {
    try {
        const nDate = new Date().toLocaleString('en-US', {
            timeZone: 'Asia/Calcutta'
          });
        let img = slider.sliderpath + "/" + req.file.filename
        req.body.image = img;
        req.body.createdAt= nDate;
        req.body.updatedAt= nDate;
        req.body.isActive=true
        let data = await slider.create(req.body)
        if (data) {
            return res.redirect('/slider')
        } else {
            console.log("slider data error",err);
        }
        } catch (error) {
            console.log(error)
    }
}

// module.exports.isActive =async (req,res)=>{
//     let data =await slider.findById(req.params.id);
//     if(data.isActive)
//     {
//         let Active = await slider.findByIdAndUpdate(req.params.id,{isActive:false});
//         if(Active){
//             res.redirect('/slider/view_slider')
//         }
//     }
//     else
//     {
//         let Actives = await slider.findByIdAndUpdate(req.params.id,{isActive:true});
//         if(Actives){
//             res.redirect('/slider/view_slider');
//         }
//     }
// }


// module.exports.delete = async(req, res) => {
//     try {
//         let data = await slider.findByIdAndDelete(req.params.id)
//         if (data) {
//             return res.redirect('/view_slider')
//         }
//     } catch (error) {
//         console.log("data delet err in catch : ", error);
//     }
// };

// module.exports.update = async(req, res) => {
//     try {
//         let data = await slider.findById(req.params.id)
//         if (data) {
//             return res.render('update', {
//                 'data': data,
//             })
//         }
//     } catch (error) {
//         console.log('edit page lode err in catch', error);
//     }
// };

// module.exports.editrecord = async(req, res) => {
//     let sliderid = req.body.editid;

//     try {
//         if (req.file) {
//             let data = slider.findById(sliderid)
//             if (data) {
//                 var imagepath = path.join(__dirname, '..', record.image)
//                 if (imagepath) {
//                     fs.unlinkSync(imagepath)
//                 }

//                 var newpath = slider.avatarpath + '/' + req.file.filename;
//                 req.body.image = newpath

//                 req.body.name = req.body.first_name + " " + req.body.second_name;

//                 let record = await slider.findByIdAndUpdate(sliderid, req.body)
//                 if (record) {
//                     return res.redirect('/view_slider')
//                 } else {
//                     console.log('data not updated');
//                 }
//             }
//         } else {
//             let data = await slider.findById(sliderid)
//             if (data) {
//                 req.body.image = data.image;

//                 req.body.name = req.body.first_name + " " + req.body.second_name;

//                 let record = await slider.findByIdAndUpdate(sliderid, req.body)
//                 if (record) {
//                     return res.redirect('/view_slider')
//                 } else {
//                     console.log('data not updated');
//                 }
//             } else {
//                 console.log("update data not found in");
//             }
//         }
//     } catch (error) {
//         console.log("data  update err : ", error);
//     }
// }

module.exports.mulDel = async (req, res) => {
    try {
        let data = req.body.mulDel;
        data.forEach(async element => {
            let id_data = await slider.findById(element);

            let i = path.join(__dirname, '..', id_data.image);
            fs.unlinkSync(i);

            await slider.findByIdAndDelete(element);
        });
        return res.redirect('/slider/view_page');
    } catch (error) {
        console.log('multi delet err : ',error);
    }
}