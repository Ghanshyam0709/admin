const admin = require('../model/model')

const fs = require('fs');

const path = require('path')

// login-logqut

module.exports.login = async(req, res) => {
    if(req.isAuthenticated()){
        return res.redirect('/dashboard')
    }else{
        return res.render('login')
    }
};

module.exports.checkLogin = async(req, res) => {
    return res.redirect('/dashboard')
        }

        module.exports.Logout = async(req, res) => {

            req.logout((err) => {
                if (err) {
                    console.log(err);
                } else {
                    return res.redirect('/')
                }
            });
        
        }

// login-logqut

// password
module.exports.Logout = async(req, res) => {

    req.logout((err) => {
        if (err) {
            console.log(err);
        } else {
            return res.redirect('/')
        }
    });

}

module.exports.password = async(req, res) => {

    return res.render('password')
}

module.exports.modifypassword = async(req, res) => {
    try {
        if (await req.user.password == req.body.cupass) {
            if (req.body.cupass != req.body.npass) {
                if (req.body.npass == req.body.copass) {
                    let newpass = await admin.findByIdAndUpdate(req.user.id, {
                        password: req.body.npass
                    })
                    if (newpass) {
                        return res.redirect('/logout')

                    } else {
                        console.log("not mach");
                        return res.redirect('back')
                    }
                } else {
                    console.log("npass and copass in not mach");
                }
            } else {
                console.log("npass and cupass is same");
                return res.redirect('back')
            }
        } else {
            console.log("cupass is not mach");
            return res.redirect('back')
        }
    } catch (error) {
        console.log('some');
    }
}

// module.exports.modifypassword = async(req, res) => {
//     try {
//         if (await req.user.password == req.body.cupass) {
//             if (req.body.cupass != req.body.npass) {
//                 if (req.body.npass == req.body.copass) {
//                     let newpass = await admin.findByIdAndUpdate(req.user.id, {
//                         password: req.body.npass
//                     })
//                     if (newpass) {
//                         return res.redirect('/logout')

//                     } else {
//                         console.log("not mach");
//                         return res.redirect('back')
//                     }
//                 } else {
//                     console.log("npass and copass in not mach");
//                 }
//             } else {
//                 console.log("npass and cupass is same");
//                 return res.redirect('back')
//             }
//         } else {
//             console.log("cupass is not mach");
//             return res.redirect('back')
//         }
//     } catch (error) {
//         console.log('some');
//     }
// }
    // password

// profile
module.exports.profile = async(req, res) => {

    return res.render('profile')
}


module.exports.readmore = async(req, res) => {

    return res.render('readmore')
}
    // profile

module.exports.dashboard = async(req, res) => {
    return res.render('dashboard')
};

module.exports.addadmin = async(req, res) => {
    return res.render('add_admin')
}

module.exports.insertrecord = async(req, res) => {
    try {
        var imagepath = '';
        if (req.file) {
            imagepath = admin.avatarpath + "/" + req.file.filename;
        }
        req.body.image = imagepath;
        req.body.name = req.body.first_name + " " + req.body.second_name;

        let data = await admin.create(req.body)
        if (data) {
            return res.redirect('back')
        } else {
            console.log(err)
        }
    } catch (error) {
        console.log("insert err in catch ", err);
    }
};

module.exports.viewadmin = async(req, res) => {

    try {
        let data = await admin.find({})
        if (data) {

            return res.render('view_admin', {
                'admindata': data,

            })
        } else {
            console.log("admin veiw data find err");
        }
    } catch (error) {
        console.log("admin_view err in catch : ");
    }
};

module.exports.delete = async(req, res) => {
    try {
        let data = await admin.findByIdAndDelete(req.params.id)
        if (data) {
            return res.redirect('/view_admin')
        }
    } catch (error) {
        console.log("data delet err in catch : ", error);
    }
};

module.exports.update = async(req, res) => {
    try {
        let data = await admin.findById(req.params.id)
        if (data) {
            return res.render('update', {
                'data': data,
            })
        }
    } catch (error) {
        console.log('edit page lode err in catch', error);
    }
};

module.exports.editrecord = async(req, res) => {
    let adminid = req.body.editid;

    try {
        if (req.file) {
            let data = admin.findById(adminid)
            if (data) {
                var imagepath = path.join(__dirname, '..', record.image)
                if (imagepath) {
                    fs.unlinkSync(imagepath)
                }

                var newpath = admin.avatarpath + '/' + req.file.filename;
                req.body.image = newpath

                req.body.name = req.body.first_name + " " + req.body.second_name;

                let record = await admin.findByIdAndUpdate(adminid, req.body)
                if (record) {
                    return res.redirect('/view_admin')
                } else {
                    console.log('data not updated');
                }
            }
        } else {
            let data = await admin.findById(adminid)
            if (data) {
                req.body.image = data.image;

                req.body.name = req.body.first_name + " " + req.body.second_name;

                let record = await admin.findByIdAndUpdate(adminid, req.body)
                if (record) {
                    return res.redirect('/view_admin')
                } else {
                    console.log('data not updated');
                }
            } else {
                console.log("update data not found in");
            }
        }
    } catch (error) {
        console.log("data  update err : ", error);
    }
}