import React from "react";
import { useState ,useEffect} from 'react'
import Icon from '@ant-design/icons';
import axios from 'axios'; 
import {Col, Row, Card, Table} from 'antd';
import {Button, Form, Input, Select} from "antd";
import Auxiliary from "util/Auxiliary";

const Option = Select.Option;

          {/* //table demo*/}
          const columns = [{
            title: 'Name',
            dataIndex: 'name',
            width: 150,
          }, {
            title: 'Phone',
            dataIndex: 'address',
          }];
          
          const data = [];
          for (let i = 1; i < 5; i++) {
            data.push({
              key: i,
              name: `Dialer `,
              address: `7397770989`,
            });
          }

        {/* //table demo*/}





const CampaignCount = () => {

  const initdeptvalues={
    count:"5",
  }
  
  const [dept,setDept]=useState(initdeptvalues);

  useEffect(() => {  
      const count="5"; 
  }, []);




  return (
  
    <Auxiliary>

             <Row> 
             <Card>
               <h2>Campaign Count</h2>
      <Table className="gx-table-responsive" columns={columns} dataSource={data} pagination={{pageSize: 10}}
           />
    </Card>
             </Row>

    </Auxiliary>
  );
};

export default CampaignCount;
