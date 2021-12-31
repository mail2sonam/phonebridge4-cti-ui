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
            width: 250,
          }, {
            title: 'Phone',
            dataIndex: 'address',
          }];
          
          const data = [];
          for (let i = 0; i < 10; i++) {
            data.push({
              key: i,
              name: `Name ${i}`,
              address: `7397770989`,
            });
          }

        {/* //table demo*/}





const QueueCountCard = (props) => {

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
               <h2>Queue Count: {props.countdetail.count}</h2>
      <Table className="gx-table-responsive" columns={columns} dataSource={data}  pagination={{ pageSize: 2 }}/>
    </Card>
             </Row>

    </Auxiliary>
  );
};

export default QueueCountCard;
