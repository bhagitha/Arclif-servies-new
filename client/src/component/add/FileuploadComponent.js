import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';
import styles from '../styles/home.module.css';
import Requirements from '../requirements'
import Sidebar from '../sidebar'
import { useParams, useHistory, Link } from "react-router-dom";

function FileuploadComponent() {
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
    const [userPlan, setUserplan] = useState({ userplan: [] })
    const [planServices, setPlanservices] = useState([])
    const [files, setFiles] = useState([]);
    const [area, setArea] = useState(0)
    const [imgFile, setimgFile] = useState('')

    const { id } = useParams();

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setFilesData({
            ...filedata,
            [name]: value
        })
        // if (filedata.rate != 0 && area!=0) {

        //     console.log("area :",area)
        //    console.log("filedata.rate : ",filedata.rate);
        //    var total = (filedata.rate/ 100 )* area;
        //    console.log("total :",total)
        //     setFilesData({ total_amount: total })
        // }
    }
    const get_amount = () => {
        if (filedata.rate != 0 && area != 0) {

            console.log("area :", area)
            console.log("filedata.rate : ", filedata.rate);
            var total = (filedata.rate / 100) * area;
            console.log("total :", total)
            setFilesData({ total_amount: total })
        }
    }

    useEffect(() => {
        axios.post('/api/getfilesfromadmin', { id: id }).then((response) => {
            console.log("Files data : ", response.data.response)
            setFiles(response.data.response)
        })
  
      
        axios.post(`/api/getfiles/${id}`).then((response) => {
            console.log("Files data user uploaded : ", response.data.response)
            setFiles(response.data.response)
        })
        axios.post('/api/getbuildingdetails', { id: id })
            .then((response) => {
                setBuildingdetails(response.data.details)
                console.log("buildingdetails :", response.data.details)
            })
        axios.post('/api/getuserplan', { login_id: id })
            .then((res) => {
                console.log("plan details : ",res);
                // setUserplan({ userplan: res.data.details })
                // setPlanservices(res.data.details.plan_services)
            })
            axios.get('https://arclif-services-backend.uc.r.appspot.com/uploadfile', {headers: {
                'Content-Type': 'multipart/form-data'
              }})
                .then((response => {
                    console.log("imageupload : ", response)
                }))

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

            axios.post('/api/upload', data)
                .then((response => {
                    console.log(response)
                }))
            axios.post('https://arclif-services-backend.uc.r.appspot.com/uploadfile', data,
            {headers: {
                'Content-Type': 'multipart/form-data'
              }})
                .then((response => {
                    console.log("imageupload : ", response)
                }))
                .catch(err => {
                    console.log(`image upload to gcp error:${err}`)
                })

          
        }

        axios.post(`/api/filedataupload/${id}`, filedata)
            .then((response) => {
                console.log(response.data.data)
                alert("ok")

            })


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


    return (
        <div>
            <div className={styles}>
                <div className={styles.top}>
                    <p >AGRIHA</p>
                    <h3 style={{ marginTop: '1rem', float: "left" }}>Services upload </h3>

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

                                    <div style={{ display: 'flex' }}>
                                        <Form.Group className="mb-3 w-25" >
                                            user id
                                            <Form.Control readOnly type="text" placeholder="login_id" name='login_id' value={id} onChange={onChangeHandler} />
                                        </Form.Group>

                                        {buildingdetails.map((u, i) => {
                                            return (<div key={i}>

                                                <Form.Group className="" >
                                                    total area
                                                    <Form.Control readOnly type="text" placeholder="total area" name='total_area'
                                                        value={u.total_area} onChange={(e) => { setArea(e.target.value); console.log("area : ", area) }} />
                                                </Form.Group>

                                            </div>)
                                        })}
                                    </div>
                                    <div style={{ display: 'flex' }}>
                   
                                     
                                        <Form.Group className="mb-3 w-25" >
                                            <Form.Control type="text" placeholder="Stage" name='stage' onChange={onChangeHandler} />
                                        </Form.Group>

                                        <Form.Group className="mb-3 w-25" >
                                            <Form.Control type="number" placeholder="Rate" name='rate' onChange={onChangeHandler} />
                                        </Form.Group>
                                    </div>
                                    <div style={{ display: 'flex' }}>
                                        <Form.Group className="mb-3 w-25" >
                                            <Form.Control type="text" placeholder="stage description" name='stage_Description' onChange={onChangeHandler} />

                                        </Form.Group>
                                        {/* <button onClick={get_amount} className="btn btn-info h-25"> amount </button> */}
                                        <Form.Group className="mb-3 w-25" >

                                            <Form.Control type="text" readOnly placeholder="total_amount" name='total_amount' value={filedata.total_amount} onChange={onChangeHandler} />
                                        </Form.Group>

                                    </div>
                                    <div className="form-group w-25">

                                        <input type="file" class="form-control" name="filename"
                                            onChange={(e) => { setimgFile(e.target.files[0]); setFile(e.target.files[0]); setFilesData({ ...filedata, filename: e.target.files[0].name }) }} />
                                    
                                    
                                    </div>
                                    <Button variant="primary" type="submit" className='mt-2'  >Add</Button>
                                </form>
                            </div>

                            <div>

                                <h4>Uploaded files List</h4>
                                <table className='table'>
                                    <thead>
                                    <tr>
                                        <th scope="col" style={{ width: '10%' }}>Stage name</th>
                                        <th scope="col" style={{ width: '10%' }}>Rate in percentage</th>
                                        <th scope="col" style={{ width: '10%' }}>stage Description </th>
                                        <th scope="col" style={{ width: '10%' }}>files added</th>
                                        <th scope="col" style={{ width: '10%' }}>Display</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        files.map((u, i) => {
                                            return (
                                                <tr key={i}>

                                                    <td>{u.stage}</td>
                                                    <td>{u.rate}</td>
                                                    <td>{u.stage_Description}</td>
                                                    <td>{u.filename}</td>
                                                    <td>
                                                        <img src={`/assets/files/${u.filename}`} style={{ width: '150px', height: '150px' }} download alt="no preview available " />

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
        </div>
    )
}

export default FileuploadComponent