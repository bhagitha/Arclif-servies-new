const express=require('express')
const router=express.Router();
const auth = require('../controller/auth')
const controller=require('../controller/controller')


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
router.get('/viewsingleuser/:id',controller.viewsingleuser)

//create user requiremnts
router.post('/setuserrequirements',controller.setuserrequirements)
router.post('/getuserrequirements',controller.getuserrequirements)

module.exports= router