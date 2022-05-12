import React from "react";

// function App() {
//   return <UserProfile22 {...userProfile22Data} />;
// }

// export default App;

function UserProfile22(props) {
  const {
    logoArclif061,
    spanText1,
    vector2,
    spanText2,
    spanText3,
    spanText4,
    spanText5,
    spanText6,
    spanText7,
    spanText8,
    spanText9,
    spanText10,
    spanText11,
    spanText12,
    spanText13,
    spanText14,
    spanText15,
    spanText16,
    spanText17,
  } = props;

  return (
    <div className="container-center-horizontal">
      <div className="user-profilescreen">
        <div className="flex-col">
          <div className="flex-row">
            <img className="logo-arclif-06-1" src={logoArclif061} />
            <div className="overlap-group3">
              <div className="group-7">
                <Group6 />
                <div className="overlap-group-2">
                  <div className="rectangle-6"></div>
                  <div className="group-2">
                    <img className="vector" src="vector-8.png" />
                    <div className="plan-design-detailspoppins-normal-jelly-bean-16px">
                      <span className="poppins-normal-jelly-bean-16px">{spanText1}</span>
                    </div>
                  </div>
                </div>
                <div className="group-5">
                  <img className="vector-1" src={vector2} />
                  <div className="your-cartpoppins-normal-black-16px">
                    <span className="poppins-normal-black-16px">{spanText2}</span>
                  </div>
                </div>
              </div>
              <div className="ellipse-7"></div>
              <div className="numberpoppins-normal-black-10px">
                <span className="poppins-normal-black-10px">{spanText3}</span>
              </div>
            </div>
          </div>
          <div className="rectangle-8"></div>
        </div>
        <div className="flex-row-1">
          <div className="flex-col-1">
            <div className="plan-detailspoppins-semi-bold-black-19px">
              <span className="poppins-semi-bold-black-19px">{spanText4}</span>
            </div>
            <div className="rectangle-1"></div>
            <div className="overlap-group6">
              <div className="design-planpoppins-normal-boulder-16px">
                <span className="poppins-normal-boulder-16px">{spanText5}</span>
              </div>
            </div>
            <div className="view-details-about-planpoppins-normal-jelly-bean-16px">
              <span className="poppins-normal-jelly-bean-16px">{spanText6}</span>
            </div>
            <div className="additionalpoppins-semi-bold-black-19px">
              <span className="poppins-semi-bold-black-19px">{spanText7}</span>
            </div>
            <div className="rectangle-1"></div>
            <div className="no-of-bedroompoppins-normal-chicago-16px">
              <span className="poppins-normal-chicago-16px">{spanText8}</span>
            </div>
            <div className="overlap-group">
              <div className="f0poppins-normal-boulder-16px">
                <span className="poppins-normal-boulder-16px">{spanText9}</span>
              </div>
            </div>
            <div className="no-of-bedroom-1poppins-normal-chicago-16px">
              <span className="poppins-normal-chicago-16px">{spanText10}</span>
            </div>
            <div className="overlap-group-1">
              <div className="f3poppins-normal-boulder-16px">
                <span className="poppins-normal-boulder-16px">{spanText11}</span>
              </div>
            </div>
          </div>
          <div className="flex-col-2">
            <div className="spacepoppins-normal-chicago-16px">
              <span className="poppins-normal-chicago-16px">{spanText12}</span>
            </div>
            <div className="overlap-group">
              <div className="f1poppins-normal-boulder-16px">
                <span className="poppins-normal-boulder-16px">{spanText13}</span>
              </div>
            </div>
            <div className="no-of-bedroom-2poppins-normal-chicago-16px">
              <span className="poppins-normal-chicago-16px">{spanText14}</span>
            </div>
            <div className="overlap-group-1">
              <div className="f4poppins-normal-boulder-16px">
                <span className="poppins-normal-boulder-16px">{spanText15}</span>
              </div>
            </div>
          </div>
          <div className="flex-col-3">
            <div className="bath-roomspoppins-normal-chicago-16px">
              <span className="poppins-normal-chicago-16px">{spanText16}</span>
            </div>
            <div className="overlap-group">
              <div className="f2poppins-normal-boulder-16px">
                <span className="poppins-normal-boulder-16px">{spanText17}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Group6() {
  return (
    <div className="group-6">
      <img className="vector-2" src="vector-10.png" />
      <div className="personal-detailspoppins-medium-licorice-16px">
        <span className="poppins-medium-licorice-16px">Personal Details</span>
      </div>
    </div>
  );
}

const userProfile22Data = {
  logoArclif061: "logo-arclif-06-1-3.png",
  spanText1: "Plan & Design Details",
  vector2: "vector-9.png",
  spanText2: "Your Cart",
  spanText3: "1",
  spanText4: "Plan Details",
  spanText5: "Design Plan",
  spanText6: "View Details about Plan",
  spanText7: "Additional",
  spanText8: "No Of Bedroom",
  spanText9: "F0",
  spanText10: "No Of Bedroom",
  spanText11: "F3",
  spanText12: "Space",
  spanText13: "F1",
  spanText14: "No Of Bedroom",
  spanText15: "F4",
  spanText16: "BathRooms",
  spanText17: "F2",
};