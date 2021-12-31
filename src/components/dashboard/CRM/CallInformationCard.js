import React from "react";
import { useState, useEffect } from 'react'
import Auxiliary from "util/Auxiliary";
import Dial from "components/dashboard/CRM/Dial";
import Timer from 'react-compound-timer'



const CallInformationCard = (props) => {

  var flage = "";
  if (props.callinfoprps.popupStatus == "Connected") {
    flage = 0;
  } else if (props.callinfoprps.popupStatus == "Hold") {
    flage = 0;
  } else if (props.callinfoprps.popupStatus == "Dialing") {
    flage = 0;
  }
  else {
    flage = 1;
  }



  var flagehang = "";
  if (props.callinfoprps.popupStatus == "Hangup") {
    flagehang = 0;
  }
  else {
    flagehang = 1;
  }
  return (
    <Auxiliary>
      <h2 className="gx-text-white"> Call Information</h2>
      <table class="table" className="gx-text-white">
        <thead>
          <tr>
          </tr>
        </thead>
        <tbody>
          <tr height="30px">

            <td>Status</td>
            <td width='10%'>: </td>
            <td> {props.callinfoprps.popupStatus}</td>
          </tr>
          <tr height="30px">

            <td>Time </td>
            <td>: </td>
            <td>
              {flage == 0
                ? <Timer>


                  <Timer.Minutes />:
              <Timer.Seconds />

                </Timer>
                : <label></label>
              }
            </td>
          </tr>
          <tr height="30px">

            <td>WrapUp </td>
            <td>: </td>
            <td>
              {flagehang == 0
                ? <Timer
                  initialTime={60000}
                  direction="backward"
                >
                  {() => (
                    <React.Fragment>


                      <Timer.Minutes />:
                      <Timer.Seconds />

                    </React.Fragment>
                  )}
                </Timer>
                : <label></label>
              }


            </td>
          </tr>
          <tr height="30px">

            <td>Extension </td>
            <td>: </td>
            <td>{props.callinfoprps.extensionStatus}</td>
          </tr>
          <tr height="30px">

            <td>Direction</td>
            <td>: </td>
            <td>{props.callinfoprps.callDirection}</td>
          </tr>

          <tr height="30px">

            <td>IVR </td>
            <td>: </td>
            <td>{props.callinfoprps.ivrFlow}</td>
          </tr>

        </tbody>
      </table>

    </Auxiliary>
  );
};

export default CallInformationCard;
