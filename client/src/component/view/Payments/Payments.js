import React from "react";
import "./Payments.css";
import { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import {
  PersonPin, Edit, Delete, Add,Receipt
} from "@material-ui/icons";


const Payments = () => {

  const [paymentdata, setPaymentdata] = useState({ payment: [] });
  const getEnquiry = () => {
    axios
      .get('/api/getpayment', {
        headers: {
          'Content-Type': 'Application/json'
        }
      })
      .then((res) => {
        console.log("payment details : ", res.data.details)
        const dataRev = res.data.details.slice().sort().reverse();

        console.log("data payment reverse: ", dataRev);

        setPaymentdata({ payment: dataRev });

      })
      .catch((err) => {
        console.log(err.response);
      });
  }

  useEffect(() => {
    getEnquiry();
    // getUserdata();


  })
  console.log("payment data :", paymentdata);

  return (
    <div className="paymentsSection">
      <h2>Payment Details</h2>
      <div className="paymentsCardsContainer">
        <table>
          {paymentdata.payment.map((data, i) => {
            console.log(data)
            return (
              <tr className="paymentsCard">
             
                <td className="name"> <Receipt style={{color:"teal"}}/> <em>{data.userName}</em></td>
                <td className="mobile"><strong>{moment(data.createdAt).format('DD-MM-YYYY')}</strong></td>
                <td className="method">{data.paymentmode}</td>
                <td className="amount">₹ {data.amount} /-</td>
              </tr>
            )

          })}

        </table>

      </div>
    </div>
  );
};

export default Payments;
