const express=require('express')
const router=express.Router();
const auth = require('../controller/auth')
const controller=require('../controller/controller')
const path = require('path');
const multer = require('multer');
const File = require('../model/fileuploadModel');
// const ab=require('../../client/public/assets')

router.post('/sendOTP', auth.login);
router.post('/verifyOTP',auth.verifyOTP);
router.post('/home',auth.authenticateUser,auth.home);
router.post('/refresh',auth.refresh)
router.get('/logout',auth.logout)

//create plan
router.post('/createplan', controller.createPlan)
router.get('/viewplan',controller.viewplan)
router.get('/viewsingleplan/:id',controller.viewplanbyid)
router.put('/updateplan/:id',controller.updateplan)

//create adon services
router.post('/createadonservices',controller.createadonservices)
router.get('/viewadonservices',controller.viewadonservices)
router.put('/updateadonservices/:id',controller.updateadonservices)
router.delete('/deleteadonservices/:id',controller.deleteAdonServiceData)

//create user
router.post('/createuser',controller.createuser)
router.get('/viewuser',controller.viewuser)
router.put('/updateuser/:id',controller.updateuser)
router.delete('/deleteuser',controller.deleteUser)
router.get('/viewsingleuser/:id',controller.viewsingleuser)

//create and view requiremntslist
router.post('/setrequirementslist',controller.setRequirementsList)
router.post('/getrequirementslist',controller.getRequirementsList)

//choose plan by user
router.post('/chooseplan',controller.choosePlan)
//get user choos plan
router.post('/getuserplan',controller.getuserplan)

router.post('/choosesingleplan',controller.chooseSinglePlan)
router.post('/chooseAdon',controller.chooseAdon)
router.post('/getuserAdon',controller.getuseradon)

//add building details for user
router.post('/addbuildingdetails',controller.addBuildingDetails)
//get building details for user
router.post('/getbuildingdetails',controller.getBuildingDetails)

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
  const storage=multer.diskStorage({
    destination: function(req,file,callback){
        callback(null,'../client/public/assets')
    },
    filename: function(req,file,callback){
        callback(null,req.body.name)
    }
})
 var upload=multer({storage:storage})

  router.post('/upload',upload.single("file"),(req, res) => {
      console.log(`${req.body},${req.file}`)
      try {
        const { title, description } = req.body;
        const { path, mimetype } = req.file;
        const file = new File({
           
          title:title,
          description:description,
          file_path: path,
          file_mimetype: mimetype
        });
        console.log("file : ",file)
         file.save();
        res.send('file uploaded successfully.');
      } catch (error) {
        res.status(400).send('Error while uploading file. Try again later.');
      }
    },
    (error, req, res, next) => {
      if (error) {
        res.status(500).send(error.message);
      }
    }
  );
  
  router.get('/getAllFiles',  (req, res) => {
    try {
      const files =  File.find({});
      const sortedByCreationDate = files.sort(
        (a, b) => b.createdAt - a.createdAt
      );
      res.send(sortedByCreationDate);
    } catch (error) {
      res.status(400).send('Error while getting list of files. Try again later.');
    }
  });
  
  router.get('/download/:id',  (req, res) => {
    try {
      const file =  File.findById(req.params.id);
      res.set({
        'Content-Type': file.file_mimetype
      });
      res.sendFile(path.join(__dirname, '..', file.file_path));
    } catch (error) {
      res.status(400).send('Error while downloading file. Try again later.');
    }
  });

module.exports= router