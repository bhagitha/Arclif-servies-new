
const PaymentPlanData = require('../model/paymentplan')
const AdonServiceData = require('../model/adonservices')
const userData = require('../model/user')
const Logindata = require('../model/login')
const Requiremnts=require('../model/requirements')

//create plan
const createPlan = (req, res) => {

    console.log(req.body)
    const paymentplandata = PaymentPlanData(req.body)
    paymentplandata.save().then((response) => {
        res.status(200).json({ msg: "plan added", details: response })
    }).catch((err) => {
        console.error(err);
        res.json({ msg: `error : plan not added !! ${err}`, })
    })

}
//view all plan
const viewplan = (req, res) => {

    PaymentPlanData.find().then((response) => {
        console.log(response);
        res.status(200).json({ msg: "success", details: response })
    }).catch((err) => {
        console.error(err);
        res.json({ msg: `error : ${err}`, })
    })

}
//view single plan_name
const viewplanbyid = (req, res) => {

    const id = req.params.id;
    PaymentPlanData.findById({ _id: id }).then((response) => {
        console.log(response);
        res.status(200).json({ msg: "success", details: response })
    }).catch((err) => {
        console.error(err);
        res.json({ msg: `error : ${err}`, })
    })
}
//update plan
const updateplan = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    PaymentPlanData.findByIdAndUpdate(id, data).then((response) => {
        console.log(response);

        res.status(200).json({ msg: "plan data updated !!" })
    }).catch((err) => {
        console.error(err);
        res.json({ msg: `error : ${err}`, })
    })
}
//createadonservices
const createadonservices = (req, res) => {

    console.log(req.body)
    const adonServiceData = AdonServiceData(req.body)
    adonServiceData.save().then((response) => {
        res.status(200).json({ msg: "AdonServiceData added", details: response })
    }).catch((err) => {
        console.error(err);
        res.json({ msg: `error : AdonService not added !! ${err}`, })
    })

}

//viewadonservices
const viewadonservices = (req, res) => {
    AdonServiceData.find().then((response) => {
        console.log(response);
        res.status(200).json({ msg: "success", details: response })
    }).catch((err) => {
        console.error(err);
        res.json({ msg: `error : ${err}`, })
    })

}
//updateadonservices
const updateadonservices = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    AdonServiceData.findByIdAndUpdate(id, data).then((response) => {
        console.log(response);
        res.status(200).json({ msg: "AdonService data updated !!", })
    }).catch((err) => {
        console.error(err);
        res.json({ msg: `error : ${err}`, })
    })
}
//delete AdonServiceData
const deleteAdonServiceData = (req, res) => {
    const id = req.params.id;

    AdonServiceData.findByIdAndDelete(id).then((response) => {
        console.log(response);
        res.status(200).json({ msg: "AdonService data deleted !!", })
    }).catch((err) => {
        console.error(err);
        res.json({ msg: `error : ${err}`, })
    })
}

//create user
const createuser = (req, res) => {
    console.log(req.body)
    const userdata = userData(req.body)
    userdata.save().then((response) => {
        res.status(200).json({ msg: "user added", details: response })
    }).catch((err) => {
        console.error(err);
        res.json({ msg: `error : user not added !! ${err}`, })
    })
}
//view user
const viewuser = (req, res) => {

    userData.aggregate([
        {
            $lookup:
            {
                from: 'login_tbs',
                localField: 'login_id',
                foreignField: '_id',
                as: 'userlogindetails'
            }
        }
    ]).then((response) => {
        res.status(200).json({ msg: "success", details: response })
    })
}

//view user by id
const viewsingleuser = (req, res) => {
    const id = req.params.id;
    userData.find({ login_id: id }).then((respons) => {
        Logindata.find({ _id: id }).then((response) => {
            const data = { userdetails: respons, logindetails: response }
            console.log(response);
            res.status(200).json({ msg: "success", details: data })
        })
    }).catch((err) => {
        console.error(err);
        res.json({ msg: `error : ${err}`, })
    })
}

//update user
const updateuser = (req, res) => {
    const id = req.params.id;
    const data = req.body;

    userData.findByIdAndUpdate(id, data).then((response) => {
        console.log(response);
        res.status(200).json({ msg: "userData  updated !!", })
    }).catch((err) => {
        console.error(err);
        res.json({ msg: `error : ${err}`, })
    })
}

//setuserrequirements 
const setuserrequirements=(req, res)=>{
    console.log(req.body)
    const userRequiremnts = Requiremnts(req.body)
    userRequiremnts.save().then((response) => {
        res.status(200).json({ msg: "user added", details: response })
    }).catch((err) => {
        console.error(err);
        res.json({ msg: `error : user not added !! ${err}`, })
    })
}
//getuserrequirements
// const getuserrequirements= (req, res) => {
//     Requiremnts.aggregate([
//         {
//             $lookup:
//             {
//                 from: 'login_tbs',
//                 localField: 'login_id',
//                 foreignField: '_id',
//                 as: 'userlogindetails'
//             }
//         },{
//             $lookup:
//             {
//                 from: 'buildingdetails',
//                 localField: 'buildingdetails_id',
//                 foreignField: '_id',
//                 as: 'paymentplandetails'
//             }
//         },{
//             $lookup:
//             {
//                 from: 'paymentplan_tb',
//                 localField: 'paymentplan_id',
//                 foreignField: '_id',
//                 as: 'paymentplandetails'
//             }
//         },{

//         }
//     ])
// }
module.exports = {
    createPlan,
    viewplan,
    viewplanbyid,
    updateplan,
    createadonservices,
    viewadonservices,
    updateadonservices,
    deleteAdonServiceData,
    createuser,
    viewuser,
    viewsingleuser,
    updateuser,
    setuserrequirements,
    getuserrequirements
}