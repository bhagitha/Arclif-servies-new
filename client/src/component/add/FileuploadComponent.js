import React, { useState, useEffect } from 'react';
import { Form, Button, Dropdown, DropdownButton } from 'react-bootstrap'
import axios from 'axios';
import styles from '../styles/home.module.css';
import Requirements from '../requirements'
import Sidebar from '../sidebar'
import { useParams, useHistory, Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from 'universal-cookie';
import App from '../../App';

const cookies = new Cookies();

function FileuploadComponent() {
    const accessToken = cookies.get('authSession');
  console.log("accessToken :", accessToken);

  function UserisLoggedin() {
    const history = useHistory();
    const [file, setFile] = useState(" ");
    const [filedata, setFilesData] = useState({
        login_id: '',
        stage: " ",
        rate: 0,
        stage_Description: "",
        filename: "",
        total_amount: 0,
    });
    const [buildingdetails, setBuildingdetails] = useState([])
    const [userPlan, setUserplan] = useState([])
    const [planamount, setPlanamount] = useState('')
    const [stages, setStages] = useState([])
    const [stageprice, setStageprice] = useState([])
    const [planServices, setPlanservices] = useState([])
    const [files, setFiles] = useState([]);
    const [area, setArea] = useState(0)
    const [imgFile, setimgFile] = useState('')
    const [initialpayment, setInitialpayment] = useState('')
    const [filename, setFilename] = useState('');
    var fileid = ''

    const { id } = useParams();

    const [value, setValue] = useState('');
    const [pricevalue, setPriceValue] = useState('');


    // if (auth.isAuthenticated) {

    // }else {
    //     history.push('/')
    // }


    const handleSelect = (e) => {
        console.log(e);
        setValue(e)


    }
    const handleSelectprice = (e) => {
        console.log(e);
        setPriceValue(e);
        get_amount();
    }
    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setFilesData({
            ...filedata,
            [name]: value
        })

    }

    const get_amount = () => {
        console.log("area :", area)
        console.log("pricevalue : ", pricevalue);
        if (pricevalue > 0 && area > 0) {

            console.log("area ::", area)
            console.log("pricevalue :: ", pricevalue);
            var total = ((area * planamount) - initialpayment) * (pricevalue / 100);
            console.log("total :", total)
            setFilesData({ total_amount: total })
        }
    }

    useEffect(() => {


        axios.post('/api/getfilesfromadmin', { id: id }, { withCredentials: true },).then((response) => {
            if (response.data.response.length != 0) {
                console.log("Files data ::> ", response.data.response)
                setFiles(response.data.response)
                setFilename(response.data.response.file_name)
                console.log("file name :", response.data.response[0].file_name)
            }

        })

        axios.get(`/files/${filename}`).then((res) => {
            console.log("files uploaded :", res)
        })

        // axios.post(`/api/getfiles/${id}`, { withCredentials: true },).then((response) => {

        //     console.log("Files data user uploaded : ", response.data.response)
        //     setFiles(response.data.response)

        // })
        axios.post('/api/getbuildingdetails', { id: id }, { withCredentials: true },)
            .then((response) => {

                setBuildingdetails(response.data.details)
                setArea(response.data.details[0].total_area);
                console.log("buildingdetails :", response.data.details)

            })
        axios.post('/api/getuserplan', { login_id: id }, { withCredentials: true },)
            .then((res) => {

                console.log("plan details : ", res.data.details);
                setUserplan(res.data.details)
                setStages(res.data.details.stages)
                setStageprice(res.data.details.stage_price)
                setPlanamount(res.data.details.plan_amount)
                setInitialpayment(res.data.details.initial_payment)


                // setPlanservices(res.data.details.plan_services)
            })
        // axios.get('https://arclif-services-backend.uc.r.appspot.com/uploadfile', {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // })
        //     .then((response => {
        //         console.log("imageupload : ", response)
        //     }))

    }, [])

    const FileAdd = async (e) => {
        setFilesData({ ...filedata, login_id: id })
        e.preventDefault()
        console.log("imgFile :", imgFile)
        if (file) {
            const data = new FormData();
            const filename = file.name
            data.append("name", filename)
            data.append("file", file)
            console.log(`file data :${data} :: ${filedata}`)

            axios.post(`/upload/${id}`, data)
                .then((response) => {
                    console.log(response)
                    fileid = response.data.file.filename
                    console.log(fileid)

                }).catch((err) => {
                    console.log("error reposnse /upload : ", err)
                })
            setTimeout(() => {
                const fileDatas = {
                    login_id: id,
                    stage: value,
                    rate: pricevalue,
                    stage_Description: filedata.stage_Description,
                    filename: filedata.filename,
                    total_amount: filedata.total_amount,
                    file_name: fileid
                }

                axios.post(`/api/filedataupload/${id}`, fileDatas)
                    .then((response) => {
                        console.log(response.data.data)
                        toast.success('file uploaded !!')
                        // window.location.reload();
                    })
            }, 2000)
        }
    }



    const logout = () => {
        axios
            .get('api/logout')
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err.response);
            });
        window.location.reload();
    };

    useEffect(() => { get_amount() }, [pricevalue])

    const downloadfile=(filename)=>{

        alert(filename)
    }

    return (
        <div>
            <div className={styles}>
                <div className={styles.top}>
                    <p >AGRIHA</p>
                    <h3 style={{ marginTop: '3rem', float: "left" }}>Services upload </h3>

                    <button onClick={logout} className={styles.logout}>
                        Log out
                    </button>
                </div>

                <div className={styles.bottom}>
                    <div style={{ width: '180px' }} >

                        <Sidebar></Sidebar>

                    </div>
                    <div style={{
                        marginLeft: "3rem", marginTop: '1rem',
                        marginBottom: '2rem', width: '100%'
                    }}>

                        <div className="container">
                            <div className="row">
                                <form onSubmit={FileAdd} encType='multipart/form-data'>

                                    <div style={{ display: 'flex', height: '36px' }}>

                                        <Button variant="outline-secondary mr-2"> User id</Button>
                                        <Form.Group className="mb-3 mr-4" >
                                            <Form.Control readOnly type="text" placeholder="login_id" name='login_id' value={id} onChange={onChangeHandler} />
                                        </Form.Group>

                                        <Button variant="outline-secondary mr-2"> Area(sq.ft)</Button>
                                        {/* {buildingdetails.map((u, i) => { */}
                                        {/* return ( */}
                                        <div>

                                            <Form.Group className="mr-4" >

                                                <Form.Control readOnly type="text" placeholder="total area"
                                                    name='total_area'
                                                    value={area} onChange={(e) => {
                                                        setArea(area); console.log("area ::: ", area)
                                                    }} />
                                            </Form.Group>

                                        </div>
                                        {/* ) */}
                                        {/* })}  */}
                                        <Button variant="outline-secondary mr-2"> Plan Rate</Button>
                                        {/* {buildingdetails.map((u, i) => { */}
                                        {/* return ( */}
                                        <div>

                                            <Form.Group className="" >

                                                <Form.Control readOnly type="text" placeholder="Plan rate"
                                                    name='plan_amount'
                                                    value={planamount}
                                                />
                                            </Form.Group>

                                        </div>
                                        {/* ) */}
                                        {/* })}  */}
                                    </div>
                                    <div style={{ display: 'flex', marginTop: '5px', height: '36px' }}>

                                        <DropdownButton variant="outline-secondary mr-1"
                                            alignRight
                                            title="Stage"
                                            id="dropdown-menu-align-right"
                                            onSelect={handleSelect}
                                        >
                                            {stages.map((items, i) => {
                                                return (<Dropdown.Item eventKey={items}>{items}</Dropdown.Item>)
                                            })}

                                        </DropdownButton>

                                        <Form.Group className="mb-3 mr-4" >
                                            <Form.Control readOnly type="text"
                                                placeholder="Stage" name='stage' value={value}
                                                onChange={onChangeHandler} />
                                        </Form.Group>


                                        <DropdownButton variant="outline-secondary mr-2"
                                            alignRight
                                            title="Rate (%)"
                                            id="dropdown-menu-align-right"
                                            onSelect={handleSelectprice}
                                        >
                                            {stageprice.map((items, i) => {
                                                return (<Dropdown.Item eventKey={items}>{items}</Dropdown.Item>)
                                            })}

                                        </DropdownButton>
                                        <Form.Group className="mb-3 mr-4" >
                                            <Form.Control readOnly type="text" placeholder="Rate percentage"
                                                name='price' value={pricevalue} onChange={onChangeHandler} />
                                        </Form.Group>

                                    </div>
                                    <div style={{ display: 'flex', marginTop: '5px', height: '36px' }}>
                                        <Button variant="outline-secondary mr-1 "> Describ </Button>
                                        <Form.Group className="mb-3 mr-4" >
                                            <Form.Control type="text" placeholder="stage description"
                                                name='stage_Description'
                                                onChange={onChangeHandler} />

                                        </Form.Group>
                                        {/* <button onClick={get_amount} className="btn btn-info h-25"> amount </button> */}
                                        <Button variant="outline-secondary mr-4">  Amount </Button>
                                        <Form.Group className="mb-3" >

                                            <Form.Control type="text" readOnly placeholder="total_amount"
                                                name='total_amount'
                                                value={filedata.total_amount} onChange={onChangeHandler} />
                                        </Form.Group>

                                    </div>
                                    <div className="form-group w-50 mt-2">

                                        <input type="file" class="form-control" name="file" id="file"
                                            onChange={(e) => {
                                                setimgFile(e.target.files[0]);
                                                setFile(e.target.files[0]);
                                                setFilesData({ ...filedata, filename: e.target.files[0].name })
                                            }} />

                                    </div>
                                    <Button variant="primary" type="submit" className='mt-2'  > upload file</Button>
                                </form>
                            </div>
                            <hr></hr>
                            <div>

                                <h4>Uploaded files List</h4>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th scope="col" style={{ width: '10%' }}>Stage name</th>
                                            <th scope="col" style={{ width: '10%' }}>Rate in percentage</th>
                                            <th scope="col" style={{ width: '10%' }}>stage Description </th>
                                            <th scope="col" style={{ width: '10%' }}>files added</th>
                                            <th scope="col" style={{ width: '10%' }}></th>
                                            <th scope="col" style={{ width: '10%' }}>Display</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {

                                            (files) && files.map((u, i) => {
                                                // setFilename(u.file_name)
                                                // console.log("file name :", u.file_name)
                                                if (u.file_name) {
                                                    axios.get(`/files/${u.file_name}`).then((res) => {
                                                        console.log("files uploaded :", res)
                                                    })
                                                }
                                                return (
                                                    <tr key={i}>

                                                        <td>{u.stage}</td>
                                                        <td>{u.rate}</td>
                                                        <td>{u.stage_Description}</td>
                                                        <td>{u.file_name}</td>
                                                        <td><button className='btn btn-primary' onClick={()=>{downloadfile(u.file_name)}} >Download</button></td>
                                                        <td>

                                                            <img src={`/assets/files/${u.filename}`} style={{ width: '150px', height: '150px' }} alt="no preview available " />

                                                        </td>
                                                    </tr>


                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div></div>
                </div>
            </div>
            <div className="form-group">
                <ToastContainer />
            </div>
        </div>
    )
}return (accessToken) ? <UserisLoggedin /> : <App />
}

export default FileuploadComponent