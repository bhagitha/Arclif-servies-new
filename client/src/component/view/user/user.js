import React from "react";
import '../../styles/user.css'

// function App() {
//   return <UserProfile {...userProfileData} />;
// }

// export default App;

function UserProfile(props) {
  const {
    logoArclif061,
    spanText1,
    spanText2,
    vector2,
    spanText3,
    spanText4,
    spanText5,
    spanText6,
    spanText7,
    vector3,
    rectangle14,
    overlapGroup3,
    spanText8,
    group8,
    spanText9,
    spanText10,
    vector4,
    spanText11,
    spanText12,
    spanText13,
    vector5,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="user-profile-2screen">
        <div className="flex-col">
          <div className="flex-row">
            <img className="logo-arclif-06-1" src={logoArclif061} />
            <div className="group-1">
              <img className="vector" src="vector-4.png" />
              <div className="personal-detailspoppins-medium-blue-lagoon-16px">
                <span className="poppins-medium-blue-lagoon-16px">{spanText1}</span>
              </div>
            </div>
            <Group2 />
            <div className="group-container">
              <div className="overlap-group7">
                <div className="numberpoppins-normal-black-10px">
                  <span className="poppins-normal-black-10px">{spanText2}</span>
                </div>
              </div>
              <div className="group-4">
                <img className="vector-1" src={vector2} />
                <div className="your-cartpoppins-normal-black-16px">
                  <span className="poppins-normal-black-16px">{spanText3}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="rectangle-8"></div>
        </div>
        <div className="flex-row-1">
          <div className="flex-col-1">
            <div className="personal-details-1poppins-semi-bold-black-19px">
              <span className="poppins-semi-bold-black-19px">{spanText4}</span>
            </div>
            <div className="rectangle-11"></div>
            <div className="overlap-group1">
              <div className="name-of-customerpoppins-normal-boulder-16px">
                <span className="poppins-normal-boulder-16px">{spanText5}</span>
              </div>
            </div>
            <div className="overlap-group">
              <div className="mobile-numberpoppins-normal-boulder-16px">
                <span className="poppins-normal-boulder-16px">{spanText6}</span>
              </div>
            </div>
            <div className="flex-row-2">
              <div className="upload-your-own-plot-imagepoppins-semi-bold-black-19px">
                <span className="poppins-semi-bold-black-19px">{spanText7}</span>
              </div>
              <img className="vector-2" src={vector3} />
            </div>
            <div className="rectangle-18"></div>
            <img className="rectangle-14" src={rectangle14} />
            <div className="overlap-group3" style={{ backgroundImage: `url(${overlapGroup3})` }}>
              <div className="upload-photopoppins-semi-bold-white-16px">
                <span className="poppins-semi-bold-white-16px">{spanText8}</span>
              </div>
              <img className="group-8" src={group8} />
            </div>
          </div>
          <div className="overlap-group-container">
            <div className="overlap-group-1">
              <div className="adressspoppins-normal-boulder-16px">
                <span className="poppins-normal-boulder-16px">{spanText9}</span>
              </div>
            </div>
            <div className="overlap-group">
              <div className="e-mail-idpoppins-normal-boulder-16px">
                <span className="poppins-normal-boulder-16px">{spanText10}</span>
              </div>
            </div>
            <div className="overlap-group-2">
              <img className="vector-3" src={vector4} />
              <div className="add-photopoppins-medium-cod-gray-16px">
                <span className="poppins-medium-cod-gray-16px">{spanText11}</span>
              </div>
            </div>
          </div>
          <div className="overlap-group-container-1">
            <div className="overlap-group-1">
              <div className="locationpoppins-normal-boulder-16px">
                <span className="poppins-normal-boulder-16px">{spanText12}</span>
              </div>
            </div>
            <div className="overlap-group6">
              <div className="your-photospoppins-normal-boulder-16px">
                <span className="poppins-normal-boulder-16px">{spanText13}</span>
              </div>
              <img className="vector-4" src={vector5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group2() {
  return (
    <div className="group-2">
      <img className="vector-5" src="vector-11.png" />
      <div className="plan-design-detailspoppins-normal-black-16px">
        <span className="poppins-normal-black-16px">Plan &amp; Design Details</span>
      </div>
    </div>
  );
}

// const userProfileData = {
//   logoArclif061: "logo-arclif-06-1-3.png",
//   spanText1: "Personal Details",
//   spanText2: "1",
//   vector2: "vector-9.png",
//   spanText3: "Your Cart",
//   spanText4: "Personal Details",
//   spanText5: "Name of customer",
//   spanText6: "Mobile Number",
//   spanText7: "Upload Your Own Plot Image",
//   vector3: "vector-3.png",
//   rectangle14: "rectangle-14-1.png",
//   overlapGroup3: "rectangle-27-1.png",
//   spanText8: "Upload Photo",
//   group8: "group-8-1.png",
//   spanText9: "Adresss",
//   spanText10: "E mail id",
//   vector4: "vector-1.png",
//   spanText11: "Add Photo",
//   spanText12: "Location",
//   spanText13: "Your Photos",
//   vector5: "vector-2.png",
// };
export default UserProfile;