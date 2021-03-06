
const PaymentPlanData = require('../model/paymentplan')
const AdonServiceData = require('../model/adonservices')
const userData = require('../model/user')
const Logindata = require('../model/login')
const userPlanData = require('../model/userplan')
const BuldingDetails = require('../model/buildingdetails');
const RequirementslistData = require('../model/requirementslist');
const userAdonData = require('../model/useradonservices')
const Stages = require('../model/stages');
const OfflineusersData = require('../model/offlineusers');
const ProjectData = require('../model/projects');
const EnquiryData=require('../model/enquiry')
const PaymentData=require('../model/Payments')


//create plan
const createPlan = (req, res) => {
    try {
        console.log(req.body)
        const paymentplandata = PaymentPlanData(req.body)
        paymentplandata.save().then((response) => {
            res.status(200).json({ msg: "plan added", details: response })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : plan not added !! ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }

}
//view all plan
const viewplan = (req, res) => {
    try {
        PaymentPlanData.find().then((response) => {
            // console.log(response);
            res.status(200).json({ msg: "success", details: response })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }

}
//view single plan_name
const viewplanbyid = (req, res) => {
    try {
        const id = req.params.id;
        PaymentPlanData.findById({ _id: id }).then((response) => {
            console.log(response);
            res.status(200).json({ msg: "success", details: response })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }
}
//choose plan
const chooseSinglePlan = (req, res) => {
    try {
        const planid = req.body.planid;
        PaymentPlanData.findById({ _id: planid }).then((response) => {
            console.log(response);
            res.status(200).json({ msg: "success", details: response })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }
}
//update plan
const updateplan = (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        PaymentPlanData.findByIdAndUpdate(id, data).then((response) => {
            console.log(response);

            res.status(200).json({ msg: "plan data updated !!" })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }
}
//createadonservices
const createadonservices = (req, res) => {
    try {
        console.log(req.body)
        const adonServiceData = AdonServiceData(req.body)
        adonServiceData.save().then((response) => {
            res.status(200).json({ msg: "AdonServiceData added", details: response })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : AdonService not added !! ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }

}
//viewadonservices
const viewadonservices = (req, res) => {
    try {
        AdonServiceData.find().then((response) => {
            // console.log(response);
            res.status(200).json({ msg: "success", details: response })
        }).catch((err) => {
            // console.error(err);
            res.json({ msg: `error : ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }

}
//updateadonservices
const updateadonservices = (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        AdonServiceData.findByIdAndUpdate(id, data).then((response) => {
            console.log(response);
            res.status(200).json({ msg: "AdonService data updated !!", })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }
}
//delete AdonServiceData
const deleteAdonServiceData = (req, res) => {
    try {
        const id = req.params.id;

        AdonServiceData.findByIdAndDelete(id).then((response) => {
            console.log(response);
            res.status(200).json({ msg: "AdonService data deleted !!", })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }
}
//create user
const createuser = (req, res) => {

    try {
        console.log(req.body)
        const loginid = req.body.login_id;
        userData.findOne({ login_id: loginid })
            .then((response) => {
                console.log(response)
                if (!response) {
                    const userdata = userData(req.body)
                    userdata.save().then((response) => {
                        res.status(200).json({ msg: "userdetails added !!", details: response })
                    }).catch((err) => {
                        console.error(err);
                        res.json({ msg: `error : userdetails not added !! ${err}`, })
                    })
                } else {
                    res.json({ msg: `error : userdetails already added !!`, data: response })
                }
            }).catch((err) => {
                console.error(err);
                res.json({ msg: `error : !! ${err}`, })
            })
    } catch (err) {
        res.send(err)
    }
}
const viewlogin = (req, res) => {
    try {
        Logindata.find().then((response) => {
            console.log(response);
            res.status(200).json({ msg: "success", details: response })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }
}
//view user
const viewuser = (req, res) => {
    try {
        // const limit=35;
        // const sort = { length: -1 };
        // const limitValue = req.query.limit || 2;
        // const skipValue = req.query.skip || 0;
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
        ])
            // .limit(limitValue)
            // .skip(skipValue)
            .then((response) => {
                res
                    .status(200).json({ msg: "success", details: response })

            })
    } catch (err) {
        res.send(err)
    }

}
//view user by id
const viewsingleuser = (req, res) => {
    try {
        const id = req.params.id;
        // userData.aggregate([
        //     { $match: { login_id: id } },
        //     {
        //         $lookup:
        //         {
        //             from: 'login_tbs',
        //             localField: 'login_id',
        //             foreignField: '_id',
        //             as: 'userlogindetails'
        //         }
        //     }
        // ]).then((response) => {
        //     res.status(200).json({ msg: "success", details: response })
        // })
        // console.log(req.body.id)
        userData.find({ login_id: id }).then((respons) => {
            Logindata.find({ _id: id }).then((response) => {
                // const data = { userdetails: respons, logindetails: response }
                // console.log(response);
                res.status(200).json({ msg: "success", userdetails: respons, logindetails: response })
            })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }
}
//update user
const updateuser = (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        userData.findByIdAndUpdate(id, data).then((response) => {
            console.log(response);
            res.status(200).json({ msg: "userData  updated !!", details: response })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }
}
const deleteUser = (req, res) => {
    try {
        const userid = req.body.userid;
        const loginid = req.body.loginid;
        userData.findByIdAndDelete(userid).then((response) => {
            console.log(response);
            Logindata.findByIdAndDelete(loginid).then((response) => {
                console.log(response);
                res.status(200).json({ msg: "user data deleted !!", })
            }).catch((err) => {
                console.error(err);
                res.json({ msg: `error : ${err}`, })
            })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }
}
//setuserrequirements 
const setuserrequirements = (req, res) => {
    try {
        console.log(req.body)
        const userRequiremnts = Requiremnts(req.body)
        userRequiremnts.save().then((response) => {
            res.status(200).json({ msg: "user added", details: response })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : user not added !! ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }
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

// add building details
const addBuildingDetails = (req, res) => {
    //login_id,paymentplan_id,adonservice_id
    try {
        console.log(req.body)
        const loginid = req.body.login_id;
        BuldingDetails.findOne({ login_id: loginid })
            .then((response) => {
                console.log(response)
                if (!response) {
                    const RequirementsData = BuldingDetails(req.body)
                    RequirementsData.save().then((response) => {
                        res.status(200).json({ msg: "building data added !!", details: response })
                    }).catch((err) => {
                        console.error(err);
                        res.json({ msg: `error : building data not added !! ${err}`, })
                    })
                } else {
                    res.json({ msg: `error : building data already added !!`, data: response })
                }
            }).catch((err) => {
                console.error(err);
                res.json({ msg: `error : !! ${err}`, })
            })
    } catch (err) {
        res.send(err)
    }


}

const updateBuildingDetails = (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        BuldingDetails.findByIdAndUpdate(id, data).then((response) => {
            console.log(response);
            res.status(200).json({ msg: "Building details  updated !!", details: response })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }
}
const getBuildingDetails = (req, res) => {
    try {
        const loginid = req.body.id;
        BuldingDetails.find({ login_id: loginid }).then((response) => {
            console.log(response);
            res.status(200).json({ msg: "success", details: response })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }
}

const setRequirementsList = (req, res) => {
    //login_id,requiremnts list array : body
    try {
        console.log(req.body)
        const loginid = req.body.login_id;
        RequirementslistData.findOne({ login_id: loginid })
            .then((response) => {
                console.log(response)
                if (!response) {
                    const RequirementsData = RequirementslistData(req.body)
                    RequirementsData.save().then((response) => {
                        res.status(200).json({ msg: "Requirementslist added !!", details: response })
                    }).catch((err) => {
                        console.error(err);
                        res.json({ msg: `error : Requirementslist not added !! ${err}`, })
                    })
                } else {
                    res.json({ msg: `error : Requirementslist already added !!`, data: response })
                }
            }).catch((err) => {
                console.error(err);
                res.json({ msg: `error : !! ${err}`, })
            })
    } catch (err) {
        res.send(err)
    }

}
const getRequirementsList = (req, res) => {
    try {
        console.log(req.body)
        const loginid = req.body.login_id;
        RequirementslistData.findOne({ login_id: loginid })
            .then((response) => {
                console.log(response)
                res.status(200).json({ msg: "success", details: response })
            }).catch((err) => {
                console.error(err);
                res.json({ msg: `error : !! ${err}`, })
            })
    } catch (err) {
        res.send(err)
    }
}
const choosePlan = (req, res) => { //************************ */
    //login_id,paymentplan_id
    try {
        // console.log(req.body)
        const loginid = req.body.login_id;
        userPlanData.findOne({ login_id: loginid })
            .then((response) => {
                // console.log(response)
                if (!response) {
                    const RequirementsData = userPlanData(req.body)
                    RequirementsData.save().then((response) => {
                        res.status(200).json({ msg: "choose plan added !!", details: response })
                    }).catch((err) => {
                        console.error(err);
                        res.json({ msg: `error : choose plan not added !! ${err}`, })
                    })
                } else {
                    res.json({ msg: `error : Requirementslist already added !!`, data: response })
                }
            }).catch((err) => {
                console.error(err);
                res.json({ msg: `error : !! ${err}`, })
            })
    } catch (err) {
        res.send(err)
    }

}
const getuserplan = (req, res) => {
    try {
        // console.log(req.body)
        const loginid = req.body.login_id;
        userPlanData.findOne({ login_id: loginid })
            .then((response) => {
                // console.log(response.paymentplan_id)
                PaymentPlanData.findById({ _id: response.paymentplan_id })
                    .then((response) => {
                        res.status(200).json({ msg: "success", details: response })
                    }).catch((err) => {
                        console.error(err);
                        res.json({ msg: `Paymentplanerror : !! ${err}`, })
                    })
            }).catch((err) => {
                console.error(err);
                res.json({ msg: `userplanerror : !! ${err}`, })
            })
    } catch (err) {
        res.send(err)
    }
}
const chooseAdon = (req, res) => {
    try {
        const login_id = req.body.login_id;
        const adonservice_name = req.body.adonservice_name;
        const total_amount = req.body.total_amount;

        console.log(req.body)

        userAdonData.findOne({ login_id: login_id })
            .then((response) => {
                console.log(response)
                if (!response) {
                    const RequirementsData = userAdonData(req.body)
                    RequirementsData.save().then((response) => {
                        res.status(200).json({ msg: "user adon services added !!", details: response })
                    }).catch((err) => {
                        console.error(err);
                        res.json({ msg: `error : user adon services data not added !! ${err}`, })
                    })
                } else {
                    res.json({ msg: `error : user adon services data already added !!`, data: response })
                }
            }).catch((err) => {
                console.error(err);
                res.json({ msg: `error : !! ${err}`, })
            })
    } catch (err) {
        res.send(err)
    }

}
//get user selected adonservices
const getuseradon = (req, res) => {
    //lohin_id and adonservices name
    var details = [];
    try {
        console.log(req.body)
        const loginid = req.body.login_id;
        userAdonData.findOne({ login_id: loginid })
            .then((response) => {
                console.log(response.adonservicename)
                response.adonservicename.map((adonname, index) => {
                    AdonServiceData.find({ adonservicename: adonname })
                        .then((response) => {
                            details.push(...response)
                            res.status(200).json({ msg: "success", details: details })
                        }).catch((err) => {
                            console.error(err);
                            res.json({ msg: `Useraderror : !! ${err}`, })
                        })
                })

            }).catch((err) => {
                console.error(err);
                res.json({ msg: `userplanerror : !! ${err}`, })
            })
    } catch (err) {
        res.send(err)
    }
}

const getRate = (req, res) => {
    const stage = req.body.stages;
    try {
        PaymentPlanData.find().then((response) => {
            // console.log(response);
            res.status(200).json({ msg: "success", details: response })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }

}

const adStage = (req, res) => {
    try {
        console.log(req.body)
        const Stagesdata = Stages(req.body)
        Stagesdata.save().then((response) => {
            res.status(200).json({ msg: "stage added", details: response })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : stage not added !! ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }
}

const createOfflineUser = (req, res) => {

    try {
        console.log("req.body :: ",req.body)
        const customer_name = req.body.customer_name;
        const email = req.body.email;
        const business_name = req.body.business_name;
        const contact_person = req.body.contact_person;
        const contact_phone = req.body.contact_phone;
        const officeaddress = req.body.officeaddress;
        const location = req.body.location;
        // longitude: { type: String },
        // latitude: { type: String },
        const Reference = req.body.Reference;

        // const contact_phone = req.body.contact_phone;
        // OfflineusersData.findOne({ contact_phone: contact_phone })
        //     .then((response) => {
        //         console.log(response)
        //         // res.status(200).json({ msg: "success", details: response })
        //         if (!response) {

        const data = {
            customer_name: customer_name,
            email: email,
            business_name: business_name,
            contact_person: contact_person,
            contact_phone: contact_phone,
            officeaddress: officeaddress,
            location: location,
            // longitude: { type: String },
            // latitude: { type: String },
            Reference: Reference
        }
        const offlineuserdata = OfflineusersData(req.body)
        offlineuserdata.save().then((response) => {
            res.status(200).json({ msg: "user added !!", details: response })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : user not added !! ${err}`, })
        })
        // } else {
        //     res.json({ msg: `error : user already added !!`, data: response })
        // }
        // }).catch((err) => {
        //     console.error(err);
        //     res.json({ msg: `error : !! ${err}`, })
        // })
    } catch (err) {
        res.send(err)
    }
}

const viewOfflineuser = (req, res) => {

    try {
        OfflineusersData.find().then((response) => {
            // console.log(response);
            res.status(200).json({ msg: "success", details: response })
        }).catch((err) => {
            // console.error(err);
            res.json({ msg: `error : ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }

}

const viewsingleofflineuser = (req, res) => {
    try {
        const id = req.params.id;
        OfflineusersData.findById({ _id: id }).then((response) => {
            console.log(response);
            res.status(200).json({ msg: "success", details: response })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }
}


const createOfflineProject = (req, res) => {
    try {
        const offlineprojectdata = ProjectData(req.body)
        offlineprojectdata.save().then((response) => {
            res.status(200).json({ msg: "project added !!", details: response })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : project not added !! ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }
}


const viewProject = (req, res) => {
    try {
        const id = req.params.id;
        ProjectData.findById({ login_id: id }).then((response) => {
            console.log(response);
            res.status(200).json({ msg: "success", details: response })
        }).catch((err) => {
            console.error(err);
            res.json({ msg: `error : ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }


}

//get enquiry

const getEnquiry = (req, res) => {
    try {
    
        EnquiryData.find().then((response) => {
            // console.log(response);
            res.status(200).json({ msg: "success", details: response })
        }).catch((err) => {
            // console.error(err);
            res.json({ msg: `error : ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }


}

//get payment details
const getPaymentDetails = (req, res) => {
    try {
    
        PaymentData.find().then((response) => {
            // console.log(response);
            res.status(200).json({ msg: "success", details: response })
        }).catch((err) => {
            // console.error(err);
            res.json({ msg: `error : ${err}`, })
        })
    } catch (err) {
        res.send(err)
    }


}

module.exports = {
    createPlan,
    viewplan,
    viewplanbyid,
    updateplan,
    chooseSinglePlan,

    createadonservices,
    viewadonservices,
    updateadonservices,
    deleteAdonServiceData,

    createuser,
    viewuser,
    viewsingleuser,
    updateuser,
    deleteUser,
    viewlogin,

    createOfflineUser,
    viewOfflineuser,
    viewsingleofflineuser,
    createOfflineProject,
    viewProject,

    setuserrequirements,

    addBuildingDetails,
    // getAllBuildingDetails,
    getBuildingDetails,
    updateBuildingDetails,
    // getuserrequirements
    setRequirementsList,
    getRequirementsList,

    choosePlan,//save user plan
    getuserplan,//get user plan
    chooseAdon,//save user adon 
    getuseradon,//get user adon services
    getRate,

    adStage,
    getEnquiry,
    getPaymentDetails,
}