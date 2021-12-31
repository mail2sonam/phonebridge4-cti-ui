import React from "react";
import { useState ,useEffect} from 'react'
import Hangupapi from "components/dashboard/CRM/Hangupapi";


function Conference() {

    const confvar={
        channel:"DAHDI/i1/8639541313-28",
        sipChannel:"SIP/4000-0000000a",
        extraChannel:"DAHDI/i1/9247271116-29"
      }

      
           // /Conference
           const handleChange6 = event => {
            const { name, value } = event.target
            setConf({ ...conf, [name]: value })
          }     
            const [conf, setConf] = useState(confvar);
      
            const Conferencecall = () => {
              var data = { 
                channel:"DAHDI/i1/8639541313-28",
                sipChannel:"SIP/4000-0000000a",
               extraChannel:"DAHDI/i1/9247271116-29"
              }
              Hangupapi.Conference(data)
                .subscribe(response => {
                  setConf({
                    phoneNo: "7397770989",
                    channel: "SIP/4000-0000000a",
                    context:"from-internal",
                    prefix:"9",
                    priority:1
                  });
                })
              }       // /Conference

}

export default Conference;