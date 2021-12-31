import React from "react";
import { useState ,useEffect} from 'react'
import Hangupapi from "components/dashboard/CRM/Hangupapi";

function Hold(){
 
    const holdvar={
        channel:"SIP/3001-00000034",
        extraChannel:"DAHDI/i1/8639541313-75",
        }
    
     // /HoldApi
     const handleChange3 = event => {
        const { name, value } = event.target
        setHold({ ...hold, [name]: value })
      }     
        const [hold, setHold] = useState(holdvar);
  
        const holdOn = () => {
          var data = { 
            channel:"SIP/3001-00000034",
            extraChannel:"DAHDI/i1/8639541313-75"
          }
          Hangupapi.Hold(data)
            .subscribe(response => {
              setHold({
              channel:"SIP/3001-00000034",
            extraChannel:"DAHDI/i1/8639541313-75"
              });
            })

          }       // /HoldApi

}

export default Hold;