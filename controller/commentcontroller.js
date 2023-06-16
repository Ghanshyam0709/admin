const comment = require('../model/commentmodle')

const fs = require('fs');

const path = require('path')

module.exports.addcomment = async (req,res)=>{
    return res.render('blog_single');
}

module.exports.view_comment = async(req,res) =>{
    let commentdata =await comment.find({})
    return res.render('view_comment',{
        commentdata :commentdata
    }); 
}

// module.exports.view_comment = async (req, res) => {
//     try {

//         if (req.query.status == 'deActive') {
//             let Active = await comment.findByIdAndUpdate(req.query.id, { isActive: false });
//         }
//         if (req.query.status == 'Active') {
//             let Active = await comment.findByIdAndUpdate(req.query.id, { isActive: true });
//         }

//         let search = '';
//         if (req.query.search) {
//             search = req.query.search;
//         }

//         var page = 1;
//         if (req.query.page) {
//             page = req.query.page;
//         }
//         var per_page = 2;

//         let data = await comment.find({
//             $or: [
//                 { title: { $regex: '.*' + search + '.*', $options: 'i' } },
//                 { content: { $regex: '.*' + search + '.*', $options: 'i' } }
//             ]
//         }).limit(per_page * 1)
//             .skip((page - 1) * per_page)
//             .exec();

//         let data_count = await comment.find({
//             $or: [
//                 { title: { $regex: '.*' + search + '.*', $options: 'i' } },
//                 { content: { $regex: '.*' + search + '.*', $options: 'i' } }
//             ]
//         }).countDocuments();

//         let pageNum = Math.ceil(data_count / per_page);

//         if (data) {
//             res.render('view_comment', ({
//                 data: data,
//                 page_Num: pageNum,
//                 cpage: page,
//                 search: search
//             }));
//         }
//     } catch (error) {
//         console.log("comment view_page err : ", error);
//     }
// }




// module.exports.mulDel = async (req, res) => {
//     try {
//         let data = req.body.mulDel;
//         data.forEach(async element => {
//             let id_data = await comment.findById(element);

//             let i = path.join(__dirname, '..', id_data.image);
//             fs.unlinkSync(i);

//             await comment.findByIdAndDelete(element);
//         });
//         return res.redirect('/comment/view_page');
//     } catch (error) {
//         console.log('multi delet err : ',error);
//     }
// }