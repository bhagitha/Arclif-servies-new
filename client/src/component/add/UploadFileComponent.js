import React, { Component } from 'react';
import axios from 'axios';
export default class UploadFileComponent extends Component {
    constructor(props) {
        super(props);
        this.onFileChange = this.onFileChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            login_id:'' ,
            imgCollection: ''
        }
        
    }
    onFileChange(e) {
        this.setState({ imgCollection: e.target.files })
    }
    onSubmit(e) {

        e.preventDefault()
        this.setState({login_id:this.props.id})
        // console.log("state : ",this.state)
        var formData = new FormData();
        for (const key of Object.keys(this.state.imgCollection)) {
            formData.append('imgCollection', this.state.imgCollection[key])
        }
        axios.post("/api/upload-images", {formData:formData,login_id:this.state.login_id}, {
        }).then(res => {
            console.log(res.data)
        })
    }
    render() {
        return (
            <div className="container">
                <div className="row">
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <input type="file" name="imgCollection" onChange={this.onFileChange} multiple />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary" type="submit">Upload</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}