import React from 'react'

function users() {
    const [userdetails, setUserdetails] = useState({
        Uname: "",
        Phonenumber: "",
        Address: '',

    });

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserdetails({
            ...userdetails,
            [name]: value
        })
    }

    const handleSubmit=()=>{

    }
    return (
        <div>
            <label>Add User</label>
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label> Name: </label>
                    <input type="text" value={userdetails.Uname} onChange={handleChange} />
<div>

                                    <input type="file"  class="form-control" name="image" onChange={(e) => { setFile(e.target.files[0]); setProducts({...Products,image:e.target.files[0].name })}} />
                                </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>

        </div>
    )
}

export default users