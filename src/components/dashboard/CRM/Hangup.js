import React from "react";
import Hangupapi from "components/dashboard/CRM/Hangupapi";
import { useState } from 'react'
import {Button, Form, Input, Select} from "antd";


const Hangup = () => {
                    
    const hangupvar={
        channel:"",
        }
                  // /HangupApi
                  const handleChange2 = event => {
                    const { name, value } = event.target
                    setHang({ ...hang, [name]: value })
                  }     
                    const [hang, setHang] = useState(hangupvar);
    
                    const hangup = () => {
                      var data = { 
                        channel: "",
                        
                      }
                  
                      Hangupapi.Hang(data)
                        .subscribe(response => {
                          setHang({
                            channel: response.data,
                          });
                        })
                     
                      }       // /HangupApi
return (

    <Button shape="circle" className="gx-btn-danger   gx-mb-1"  onClick={hangup} class= "ant-btn ant-tooltip-open" type="primary"  size={'large'} ><i class="icon icon-phone"> </i></Button> 
);
};

export default Hangup;