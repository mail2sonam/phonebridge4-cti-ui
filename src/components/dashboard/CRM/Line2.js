import React from "react";
import { useState ,useEffect} from 'react'
import Hangupapi from "components/dashboard/CRM/Hangupapi";


function Line2() {

    const line2var={
        phoneNo: "7397770989",
        channel: "SIP/4000-0000000a",
        context:"from-internal",
        prefix:"9",
        priority:1
      }

      // /Line2Api
      const handleChange5 = event => {
        const { name, value } = event.target
        setLine2({ ...line2, [name]: value })
      }     
        const [line2, setLine2] = useState(line2var);
  
        const Line2call = () => {
          var data = { 
            // phoneNo: "7397770989",
            channel: "SIP/4000-0000000a",
            context:"from-internal",
            prefix:"9",
            priority:1
          }
          Hangupapi.Line2(data)
            .subscribe(response => {
              setLine2({
                phoneNo: "7397770989",
                channel: "SIP/4000-0000000a",
                context:"from-internal",
                prefix:"9",
                priority:1
              });
            })
       
          }       // /Line2Api
}

export default Line2;