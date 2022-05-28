const express = require('express')
const router = express.Router();
const auth = require('../controller/auth')
const controller = require('../controller/controller')
const path = require('path');
const multer = require('multer');
const fileupload = require('../model/fileupload');
// const ab=require('../../client/public/assets')
const Adminfilestore = require('../model/adminfiles');
const Userfilestore=require('../model/userfilestore');

router.post('/sendOTP', auth.login);
router.post('/verifyOTP', auth.verifyOTP);
router.post('/home', auth.authenticateUser, auth.home);
router.post('/refresh', auth.refresh)
router.get('/logout', auth.logout)

//create plan
router.post('/createplan', controller.createPlan)
router.get('/viewplan', controller.viewplan)
router.get('/viewsingleplan/:id', controller.viewplanbyid)
router.put('/updateplan/:id', controller.updateplan)

//create adon services
router.post('/createadonservices', controller.createadonservices)
router.get('/viewadonservices', controller.viewadonservices)
router.put('/updateadonservices/:id', controller.updateadonservices)
router.delete('/deleteadonservices/:id', controller.deleteAdonServiceData)

//create user
router.post('/createuser', controller.createuser)
router.get('/viewuser', controller.viewuser)
router.put('/updateuser/:id', controller.updateuser)
router.delete('/deleteuser', controller.deleteUser)
router.get('/viewsingleuser/:id', controller.viewsingleuser)

//create and view requiremntslist
router.post('/setrequirementslist', controller.setRequirementsList)
router.post('/getrequirementslist', controller.getRequirementsList)

//choose plan by user
router.post('/chooseplan', controller.choosePlan)
//get user choos plan
router.post('/getuserplan', controller.getuserplan)

router.post('/choosesingleplan', controller.chooseSinglePlan)
router.post('/chooseAdon', controller.chooseAdon)
router.post('/getuserAdon', controller.getuseradon)

//add building details for user
router.post('/addbuildingdetails', controller.addBuildingDetails)
//get building details for user
router.post('/getbuildingdetails', controller.getBuildingDetails)


const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './client/public/assets/files')
    },
    filename: function (req, file, callback) {
        console.log(req.body.name)
        callback(null, req.body.name)
    }
})
var upload = multer({ storage: storage })

router.post('/upload', upload.single("file"), (req, res) => {

    try {

        return res.json(
            "file uploaded..")

    } catch (err) {
        res.send(err)
    }

})
router.post('/filedataupload/:id', (req, res) => {

    try {

        console.log(req.body)
        console.log("id : ",req.params.id)
        const data={ 
            login_id:req.params.id,
            stage:req.body.stage,
            rate:req.body.rate,
            stage_Description:req.body.stage_Description,
            filename:req.body.filename,
            total_amount:req.body.total_amount,
        }
        const adminfilestoredata = Adminfilestore(data)
        adminfilestoredata.save().then((response) => {
            res.status(200).json({ msg: "file added", details: response })

        })
    } catch (err) {
        res.send(err)
    }

})
router.post('/getfiles/:id', (req, res) => {
    try {
        if (req.params.id) {
            Userfilestore.find({ login_id: req.body.id })
                .then((response) => {
                    res.send({ msg: 'added file data', response: response })
                })
        } else {
            res.send({ msg: 'error : id required !!' })
        }
    } catch (err) {
        res.send(err)
    }
})

router.post('/getfilesfromadmin', (req, res) => {
    try {
        if (req.body.id) {
            Adminfilestore.find({ login_id: req.body.id })
                .then((response) => {
                    res.send({ msg: 'added file data', response: response })
                })
        } else {
            res.send({ msg: 'error : id required !!' })
        }
    } catch (err) {
        res.send(err)
    }
})

// const upload = multer({
//     storage: multer.diskStorage({
//       destination(req, file, cb) {
//         cb(null, '../../client/public/assets');
//       },
//       filename(req, file, cb) {
//         cb(null, `${new Date().getTime()}_${file.originalname}`);
//       }
//     }),
// limits: {
//   fileSize: 10000000 // max file size 1MB = 1000000 bytes
// },
// fileFilter(req, file, cb) {
//   if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
//     return cb(
//       new Error(
//         'only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format.'
//       )
//     );
//   }
//   cb(undefined, true); // continue with upload
// }
//   });
//   const storage=multer.diskStorage({
//     destination: function(req,file,callback){
//         callback(null,'../client/public/assets')
//     },
//     filename: function(req,file,callback){
//         callback(null,req.body.name)
//     }
// })
//  var upload=multer({storage:storage})

//   router.post('/upload',upload.single("file"),(req, res) => {
//       console.log(`${req.body},${req.file}`)
//       try {
//         const { title, description } = req.body;
//         const { path, mimetype } = req.file;
//         const file = new File({

//           title:title,
//           description:description,
//           file_path: path,
//           file_mimetype: mimetype
//         });
//         console.log("file : ",file)
//          file.save();
//         res.send('file uploaded successfully.');
//       } catch (error) {
//         res.status(400).send('Error while uploading file. Try again later.');
//       }
//     },
//     (error, req, res, next) => {
//       if (error) {
//         res.status(500).send(error.message);
//       }
//     }
//   );

//   router.get('/getAllFiles',  (req, res) => {
//     try {
//       const files =  File.find({});
//       const sortedByCreationDate = files.sort(
//         (a, b) => b.createdAt - a.createdAt
//       );
//       res.send(sortedByCreationDate);
//     } catch (error) {
//       res.status(400).send('Error while getting list of files. Try again later.');
//     }
//   });

//   router.get('/download/:id',  (req, res) => {
//     try {
//       const file =  File.findById(req.params.id);
//       res.set({
//         'Content-Type': file.file_mimetype
//       });
//       res.sendFile(path.join(__dirname, '..', file.file_path));
//     } catch (error) {
//       res.status(400).send('Error while downloading file. Try again later.');
//     }
//   });


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, DIR);
//   },
//   filename: (req, file, cb) => {
//       const fileName = file.originalname.toLowerCase().split(' ').join('-');
//       cb(null,  fileName)
//   }
// });
// var upload = multer({
//   storage: storage,
// fileFilter: (req, file, cb) => {
//     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//         cb(null, true);
//     } else {
//         cb(null, false);
//         return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//     }
// }
// });

// router.post('/upload-images', upload.single('imgCollection'), (req, res, next) => {
//   const login_id=req.body.login_id;
//   const reqFiles = [];
//   const url = req.protocol + '://' + req.get('host')
//   for (var i = 0; i < req.files.length; i++) {
//       reqFiles.push(url + '/public/files' + req.files[i].filename)
//   }
//   const fileuploads = new fileupload({
//       login_id: login_id,
//       imgCollection: reqFiles
//   });
//   fileuploads.save().then(result => {
//       res.json({
//           message: "Done upload!",
//           details: {
//               _id: result._id,

//               imgCollection: result.imgCollection
//           }
//       })
//   }).catch(err => {
//       console.log(err),
//           res.status(500).json({
//               error: err
//           });
//   })
// })

module.exports = router