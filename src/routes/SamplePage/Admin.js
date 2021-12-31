import React, { useContext } from "react";
import { Col, Row } from 'antd';
import Auxiliary from "util/Auxiliary";
import Widget from "components/Widget/index";
import CallMonitor from "../../components/dashboard/CRM/CallMonitor";
import { UserContext } from "../../components/dashboard/CRM/UserContext";
import InsideHeader from "../../containers/Topbar/InsideHeader";
import AdminHeader from "../../containers/Topbar/InsideHeader/AdminHeader";
import Dashboard from "../../components/dashboard/CRM/Dashborad";


const Admin = () => {

  return (
    <Auxiliary>
      {/* //admin*/}
      <UserContext.Provider value={localStorage.getItem("usertype")}>
        <Dashboard />
      </UserContext.Provider>


    </Auxiliary>
  );

};

export default Admin;
