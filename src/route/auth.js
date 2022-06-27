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
router.get('/viewplan', auth.authenticateUser, controller.viewplan)
router.get('/viewsingleplan/:id', auth.authenticateUser, controller.viewplanbyid)
router.put('/updateplan/:id', controller.updateplan)

//create adon services
router.post('/createadonservices', controller.createadonservices)
router.get('/viewadonservices', controller.viewadonservices)
router.put('/updateadonservices/:id', controller.updateadonservices)
router.delete('/deleteadonservices/:id', controller.deleteAdonServiceData)

//create user
router.post('/createuser', controller.createuser)
router.get('/viewuser',auth.authenticateUser, controller.viewuser)
router.get('/viewlogin', controller.viewlogin)
router.put('/updateuser/:id', controller.updateuser)
router.delete('/deleteuser', controller.deleteUser)
router.get('/viewsingleuser/:id', auth.authenticateUser, controller.viewsingleuser)

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
router.get('/getrate', controller.getRate);


router.post('/addstage', controller.adStage);

router.post('/createofflineuser',controller.createOfflineUser);
router.get('/viewofflineuser', controller.viewOfflineuser);

router.get('/viewsingleofflineuser/:id', controller.viewsingleofflineuser);
router.post('/createofflineproject', controller.createOfflineProject);
router.get('/viewproject/:id',controller.viewProject)


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

router.post('/upload', upload.single("file"), auth.authenticateUser, (req, res) => {

    try {

        return res.json(
            "file uploaded..")

    } catch (err) {
        res.send(err)
    }

})
router.post('/filedataupload/:id', auth.authenticateUser, (req, res) => {

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
            file_name:req.body.file_name
        }
        const adminfilestoredata = Adminfilestore(data)
        adminfilestoredata.save().then((response) => {
            res.status(200).json({ msg: "file added", details: response })

        })
    } catch (err) {
        res.send(err)
    }

})
router.post('/getfiles/:id', auth.authenticateUser, (req, res) => {
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


module.exports = router