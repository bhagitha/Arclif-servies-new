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
    const [files, setFiles] = useState([]);

    const { id } = useParams();

    const onChangeHandler = (e) => {
        const { name, value } = e.target
        setFilesData({
            ...filedata,
            [name]: value
        })
    }

    useEffect(() => {
        axios.post('http://localhost:8888/getfiles', { id: id }).then((response) => {
            console.log("Files data : ", response.data.response)
            setFiles(response.data.response)
        })
    }, [])

    const FileAdd = async (e) => {
        setFilesData({ ...filedata, login_id: id })
        e.preventDefault()

        if (file) {
            const data = new FormData();
            const filename = file.name
            data.append("name", filename)
            data.append("file", file)
            console.log(`file data :${data} :: ${filedata}`)
            axios.post('http://localhost:8888/upload', data)
                .then((response => {
                    console.log(response)
                }))
        }

        axios.post(`http://localhost:8888/filedataupload/${id}`, filedata)
            .then((response) => {
                console.log(response.data.data)
                alert("ok")

            })


    }

    const logout = () => {
        axios
            .get('http://localhost:8888/logout')
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
                                    <Form.Group className="mb-3 w-25" >
                                        <Form.Control type="text" placeholder="login_id" name='login_id' value={id} onChange={onChangeHandler} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 w-25" >
                                        <Form.Control type="text" placeholder="Stage" name='stage' onChange={onChangeHandler} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 w-25" >
                                        <Form.Control type="number" placeholder="Rate" name='rate' onChange={onChangeHandler} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 w-25" >
                                        <Form.Control type="text" placeholder="stage description" name='stage_Description' onChange={onChangeHandler} />
                                    </Form.Group>
                                    <Form.Group className="mb-3 w-25" >
                                        <Form.Control type="text" placeholder="total_amount" name='total_amount' onChange={onChangeHandler} />
                                    </Form.Group>
                                    <div className="form-group w-25">

                                        <input type="file" class="form-control" name="filename"
                                            onChange={(e) => { setFile(e.target.files[0]); setFilesData({ ...filedata, filename: e.target.files[0].name }) }} />
                                    </div>
                                    <Button variant="primary" type="submit" className='mt-2'  >Add</Button>
                                </form>
                            </div>

                            <div>

                                <h4>Uploaded files List</h4>
                                <table>
                                    <tr>
                                        <th>Stage name</th>
                                        <th>Rate in percentage</th>
                                        <th>stage Description </th>
                                        <th>files added</th>
                                        <th>Display</th>
                                    </tr>
                                    {
                                        files.map((u, i) => {
                                            return (
                                                <tr key={i}>

                                                    <td>{u.stage}</td>
                                                    <td>{u.rate}</td>
                                                    <td>{u.stage_Description}</td>
                                                    <td>{u.filename}</td>
                                                    <td><img src={`/assets/files/${u.filename}`} style={{ width: '150px', height: '150px' }} /></td>
                                                </tr>


                                            )
                                        })
                                    }
                                </table>
                            </div>
                        </div></div>
                </div>
            </div>
        </div>
    )
}

export default FileuploadComponent