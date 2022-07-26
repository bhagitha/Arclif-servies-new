import React, { useState } from "react";
import Header from "../../header";
import "./AddProject.css";
import Sidebar from '../../sidebar';

const AddProject = () => {
  const [requirements, setRequirements] = useState([]);

  const addRequirements = () => {
    document.getElementById("plusIconContainer").style.display = "none";
    document.getElementById("inputFieldHidden").style.display = "flex";
  };

  const cancelRequirements = () => {
    document.getElementById("plusIconContainer").style.display = "flex";
    document.getElementById("inputFieldHidden").style.display = "none";
  };

  const storeValues = () => {
    const inputValue = document.getElementById("inputField").value;
    if (inputValue !== "") {
      setRequirements([...requirements, inputValue]);
    }
  };

  
  return (
    <div className="addProject">
      <Header />
      <div style={{ display: 'flex', }}>
        <div style={{ width: '180px' }} >

          <Sidebar></Sidebar>

        </div>
        <div className="add__ProjectContainer">

          <div className="AddProjectsContainer">
            <h1>Add Project</h1>
            <div className="projectidContainer">
              <h5>
                Project ID : <span> </span>
              </h5>
            </div>
            <h2>Project Description</h2>
            <div className="dropdown__container">
              <h5>Project Type  </h5>
              <div className="select__dropdowns">
                <select id="selects" name="categories">
                  <option value="Residential Architecture">Residential Architecture</option>
                  <option value="Interior Design">Interior Design</option>
                  <option value="Refurbishment">Refurbishment</option>
                  <option value="Cultural Architecture">Cultural Architecture</option>
                  <option value="Commercial and offices">Commercial and offices</option>
                  <option value="Hospitality Architecture">Hospitality Architecture</option>
                </select>
              </div>
            </div>
            <div className="total__area">
              <h5>Total Area  </h5>
              <input type="number" />
            </div>
            <div className="total__area">
              <h5>Total budget  </h5>
              <input type="text" />
            </div>
            <div className="location">
              <h5>Project Location  </h5>
              <input type="text" />
            </div>
          </div>
          <div className="requirementsContainer">
            <div className="requirements">
              <h5>Space Requirements</h5>
              <div
                onClick={addRequirements}
                id="plusIconContainer"
                className="requirements__image__container"
              >
                <img
                  src="https://cdn-icons.flaticon.com/png/512/3524/premium/3524388.png?token=exp=1655804548~hmac=bdf1ed5385d391bb3ed2bcc7b464b04a"
                  alt=""
                />
              </div>
              <div id="inputFieldHidden" className="inputFieldsContainer">
                <input id="inputField" type="text" />
                <div onClick={storeValues} className="checkImageContainer">
                  <img
                    src="https://cdn-icons.flaticon.com/png/512/1055/premium/1055183.png?token=exp=1655806011~hmac=271cc99a6e558489c8710d2859e7df1a"
                    alt=""
                  />
                </div>
                <div
                  onClick={cancelRequirements}
                  className="checkImageContainer cancelImageContainer"
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1828/1828778.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="display__requirements">
              {requirements.map((requirements, index) => {
                return (
                  <div key={index}>
                    <span>{index + 1}. </span> <p key={index}> {requirements}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="submitContainer">
          <div className="submitButton">SUBMIT</div>
        </div>
      </div>
    </div>
  );
};

export default AddProject;
