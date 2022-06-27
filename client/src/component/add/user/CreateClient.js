import React, { useEffect, useState } from "react";
import Header from "../../header";
import "./AddClient.css";
import axios from "axios";

const CreateClient = () => {

    const [location, setLocation] = useState("");

    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("");

    const [customer_name, setCustomer_name] = useState("");
    const [email, setEmail] = useState("");
    const [business_name, setBusinessname] = useState('');
    const [contact_person, setContactperson] = useState("");
    const [contact_phone, setContactphone] = useState("")
    const [officeaddress, setOfficeAddress] = useState("");
    const [Reference, setReference] = useState("")

    const storeLocation = () => {
        setLocation(document.getElementById("location").value);
    };

    useEffect(() => {
        async function getLocationDetails() {
            const endpoint = `https://api.geoapify.com/v1/geocode/autocomplete?text=${location}%20&format=json&apiKey=41ff15ef6d914c4aa4d53d1c7c848744`;

            await axios.get(endpoint).then((res) => {
                const data = res.data;
                console.log(data);
                if (data.results) {
                    setLatitude(data.results[0].lat);
                    setLongitude(data.results[0].lon);
                }
            });
        }

        if (location.length > 2) {
            getLocationDetails();
        }

    }, [location]);

    const handleFormsubmit = (e) => {
        e.preventDefault();

        const data = {
            customer_name: customer_name,
            email: email,
            business_name: business_name,
            contact_person: contact_person,
            contact_phone: contact_phone,
            officeaddress: officeaddress,
            location: location,
            longitude: longitude,
            latitude: latitude,
            Reference: Reference

        }
        console.log("users data: ", data);

        axios.post('/api/createofflineuser', { data })
        .then((response) => {
            console.log(response)
        })
    }

    return (
        <div className="addClient">
            {/* <Header /> */}
            <div className="add__client">
                <h2>Add Client</h2>
                <form onSubmit={handleFormsubmit} >
                    <div className="inputFieldContainer__addClient">

                        <div className="leftInputContainer">
                            <h3>Customer Name</h3>
                            <input type="text" onChange={(e) => setCustomer_name(e.target.value)} />
                            <h3>Business Name</h3>
                            <input type="text" onChange={(e) => setBusinessname(e.target.value)} />
                            <h3>Contact Person Name</h3>
                            <input type="text" onChange={(e) => setContactperson(e.target.value)} />
                            <h3>Contact Number</h3>
                            <input type="tel" onChange={(e) => setContactphone(e.target.value)} />
                            <h3>Email</h3>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="rightInputContainer">
                            <h3>Office Address</h3>
                            <textarea rows="5" cols="50" onChange={(e) => setOfficeAddress(e.target.value)} />
                            <h3>Location</h3>
                            <input onChange={storeLocation}  id="location" type="text" />
                            <h3>Reference</h3>
                            <input type="text" onChange={(e) => setReference(e.target.value)} />
                            
                            <input type="submit" className="submitButton submitButton__addClient" />SUBMIT
                        </div>

                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateClient;
