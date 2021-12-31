import React from "react";
import Icon from '@ant-design/icons';
import { Col, Row, Card, TreeSelect, DatePicker } from 'antd';
import { Button, Form, Input, Select } from "antd";
import Auxiliary from "util/Auxiliary";
import { useState, useEffect } from 'react'
import DispositionApi from "components/dashboard/CRM/DispositionApi";
import 'react-dropdown-tree-select/dist/styles.css'

const DispositionCard = (props) => {

  {/** Date Picker*/ }
  const { RangePicker } = DatePicker;

  function onChange(value, dateString) {
  }
  function onOk(value) {
  }
  {/** Date Picker*/ }


  // Disposition
  const Option = Select.Option;
  const TreeNode = TreeSelect.TreeNode;


  // save Disposition
  const [startDate, setStartDate] = useState(new Date());
  const [selected, setSelected] = useState();
  const [dispolist, setDispoList] = useState([]);
  const [saveon, setSave] = useState({ callId: '', disposition: '', comments: '', callbackDate: '' });

  function handleChange1(evt) {
    const value = evt.target.value;
    setSave({
      ...saveon,
      [evt.target.name]: value
    });
  }
  const SaveOn = () => {
    var data = {
      callId: props.sakhidispo.id,
      disposition: saveon.disposition,
      comments: saveon.comments,
      callbackDate: startDate.toISOString().substr(0, 19),

    }
console.log(data);
    DispositionApi.saveDispo(data)
      .subscribe(response => {
        setSave({
          callId: response.data.callId,
          disposition: response.data.disposition,
          comments: response.data.comments,
          callbackDate: response.data.callbackDate,
        });

      })
  }
  // save Disposition

 // DispositionApi.Dispo()
 // .subscribe(res => {
 //     const dis = res;
 //    let tempList = [];
 //     dis.data.disposition.forEach(element => {
 //       tempList.push(element.disposition);
 //     });
 //     setDispoList(tempList);
 //   })

  function onChangeDisposition(value) {
    saveon.disposition = value
  }


  return (
    <Auxiliary>
      <Row>
        <Col span={24}>
          <Row>
            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              <h2 className="gx-text-white" >Disposition</h2>

              <TreeSelect className="gx-w-100"
                showSearch
                value={onChangeDisposition.value}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                allowClear
                treeDefaultExpandAll
                onChange={onChangeDisposition}

              >
                {/* 
          {
           
          <TreeNode title="Dispo" > 
           {
             dispolist.map((disposition,parentId) => 
             <TreeNode   value ={disposition}key={parentId} title={disposition} > 
                    
                    
                    <TreeNode   value ={disposition}key={parentId=='3'} title={disposition} > 
                    </TreeNode>
                    
             </TreeNode>)
            }
           
             
        
        
          </TreeNode>
          } */}

                <TreeNode value="Answered" title="Answered" key="0-1">
                  <TreeNode value="Not Answered" title="Not Answered" key="0-1-1">
                    <TreeNode value="Not Reachable" title="Not Reachable" key="random" />
                    <TreeNode value="DND" title="DND" key="random1" />
                  </TreeNode>
                  <TreeNode value="Busy" title="Busy" key="random2">
                    {/* <TreeNode value="sss" title={<b style={{color: '#08c'}}>sss</b>} key="random3"/> */}
                  </TreeNode>
                </TreeNode>


              </TreeSelect>
            </Col>





            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              <h2 className="gx-text-white" >Remarks</h2>
              <Input id="comments" name="comments" placeholder="Remarks" value={handleChange1.value} onChange={handleChange1} />
            </Col>

            <Col xl={6} lg={12} md={12} sm={12} xs={24}>
              <h2 className="gx-text-white" >CallBack</h2>

              <DatePicker className="gx-mb-3 gx-w-100"
                showTime
                format="YYYY-MM-DD HH:mm"
                placeholder="Select Time"
                selected={startDate}
                onChange={date => setStartDate(date)}

              />


            </Col>
            <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <h2>&nbsp;</h2>
              <Button className="gx-mb-0" className="gx-btn-orange  gx-mb-1" onClick={SaveOn} type="primary">Save</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <br></br>

      {/* <Row>
         <Col xl={8} lg={12} md={12} sm={12} xs={24}>
             <h2 className="gx-text-white" >SMS Content</h2>
             <Input id="name" name="name" placeholder="SMS Content" />   
        </Col>
        <Col xl={10} lg={12} md={12} sm={12} xs={24}>
             <h2>&nbsp;</h2>
             <Button    className="gx-btn-orange  gx-mb-1"  type="primary">Send Sms</Button>
          </Col>
        
               
          <Col xl={8} lg={12} md={12} sm={12} xs={24}>
          <h2 className="gx-text-white" >Email Content</h2>
             <Input id="name" name="name" placeholder="Email Content" /> 
          </Col>
          <Col xl={6} lg={12} md={12} sm={12} xs={24}>
          <h2>&nbsp;</h2>
             <Button     className="gx-btn-orange  gx-mb-1"  type="primary">Send Email</Button>
          </Col>

      </Row> */}


    </Auxiliary>
  );
}

export default DispositionCard;
