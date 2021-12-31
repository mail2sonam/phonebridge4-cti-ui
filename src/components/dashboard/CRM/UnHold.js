import React from "react";
import { useState ,useEffect} from 'react'
import Hangupapi from "components/dashboard/CRM/Hangupapi";


function UnHold() {

    const unholdvar={
        channel:"SIP/3001-00000034",
        extraChannel:"DAHDI/i1/8639541313-75"
      }

      // /UnHoldApi
      const handleChange4 = event => {
        const { name, value } = event.target
        setUnHold({ ...unhold, [name]: value })
      }     
        const [unhold, setUnHold] = useState(unholdvar);
  
        const unholdOn = () => {
          var data = { 
            channel:"SIP/3001-00000034",
            extraChannel:"DAHDI/i1/8639541313-75"
          }
          Hangupapi.UnHold(data)
            .subscribe(response => {
              setUnHold({
                channel:"SIP/3001-00000034",
                extraChannel:"DAHDI/i1/8639541313-75"
              });
            })
    
          }       // /UnHoldApi


}

export default UnHold;