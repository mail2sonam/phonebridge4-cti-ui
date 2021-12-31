import React from "react";
import { useState ,useEffect} from 'react'
import {Col, Row, Card, Table} from 'antd';
import {Button, Form, Input, Select} from "antd";
import Auxiliary from "util/Auxiliary";
import {Link, useHistory} from "react-router-dom";
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import UserApi from "./UserApi";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { ExportToCsv } from 'export-to-csv';

const Option = Select.Option;

const UserReport = () => {

    let [historyList, setHistoryList] = useState();
    const datax =[] ;
    const rowData4 =[] ;
    let history = useHistory();

    useEffect(()=>{
      var data = {
        extension: localStorage.getItem("extn")
      }
      UserApi.userList(data)
      .subscribe(res=>{
        for(let i=0;i<= Object.keys(res.data.model).length-1;i++){

      datax.push({
        key: i,
        username: res.data.model[i].username,
        userextension: res.data.model[i].userextension,
        extensiontype: res.data.model[i].extensiontype,
        password : res.data.model[i].password,
        prefix : res.data.model[i].prefix,
        context : res.data.model[i].context,
        departmentcode : res.data.model[i].departmentcode,
      });
   
        }
 
    setHistoryList(datax);
      } )
      
    },[]);

  
    const Option = Select.Option;
  
    const columns = [{
        title: 'User Name',
        dataIndex: 'username',
        key: 'caseid',
        width: 100,
        fixed: 'left',
      },{
        title: 'User Extension',
        dataIndex: 'userextension',
        key: 'name',
        width: 100,
        
      },{
        title: 'Extension Type',
        dataIndex: 'extensiontype',
        key: 'name',
        width: 100,
       
      },{
        title: 'Password',
        dataIndex: 'password',
        key: 'name',
        width: 100,
      },{
        title: 'Prefix',
        dataIndex: 'prefix',
        key: 'name',
        width: 100,
      },{
        title: 'Context',
        dataIndex: 'context',
        key: 'name',
        width: 100,
      
      },{
        title: 'Department Code',
        dataIndex: 'departmentcode',
        key: 'name',
        width: 100,
        
      }];




    const initdeptvalues={
      count:"5",
    }
    
    const [dept,setDept]=useState(initdeptvalues);
  
    useEffect(() => {  
        const count="5"; 
    }, []);
  
    function backtoagent(){
        history.push("/admin")
    }

    const options = { 
      // fieldSeparator: ',',
      // quoteStrings: '"',
      // decimalSeparator: '.',
      showLabels: true, 
      showTitle: true,
      title: 'test',

      // useTextFile: true,
      // useBom: true,
      // useKeysAsHeaders: true,
      headers: ['Sl.No','User Name', 'User Extension', 'Extension Type' ,'Password','Prefix','Context','Department Code' ] //<-- Won't work with useKeysAsHeaders present!
    };

    //Excel Export
    const exportExcel = () => {
      const csvExporter = new ExportToCsv(options);
      csvExporter.generateCsv(historyList);
    }
   //Excel Export
  
    return (
    
      <Auxiliary>
        <AdminHeader/>
  <h2 className="gx-text-white">Daily Call Report</h2>

        <Table
                columns={columns}
                dataSource={historyList}
                bordered               
                size="large"
                scroll={{x: '230%', y: 340}}
            />

<Button onClick={exportExcel}> Export </Button>
            
      </Auxiliary>
    );
  };

export default UserReport;

