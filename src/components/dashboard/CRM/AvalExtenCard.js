import React from "react";
import { useState ,useEffect} from 'react'
import {Col, Row, Card, Table} from 'antd';
import {Button, Form, Input, Select} from "antd";
import Auxiliary from "util/Auxiliary";

const Option = Select.Option;

          {/* //table demo*/}
          const columns = [{
            title: 'Extension',
            dataIndex: 'name',
            width: 150,
          }];
          
          const data = [];
          for (let i = 1; i < 5; i++) {
            data.push({
              key: i,
              name: `3002 `,
       
            });
          }

        {/* //table demo*/}

const AvalExtenCard = () => {

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
               <h2>Aval Exten</h2>
      <Table className="gx-table-responsive" columns={columns} dataSource={data} pagination={{pageSize: 10}}
           />
    </Card>
             </Row>

    </Auxiliary>
  );
};

export default AvalExtenCard;

