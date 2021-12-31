import React from "react";
import {Col, Row, Card, Checkbox, TreeSelect, DatePicker, TimePicker} from 'antd';
import {Button, Form, Input, InputNumber, Transfer} from "antd";
import { useState ,useEffect, useContext} from 'react'
import 'react-dropdown-tree-select/dist/styles.css'
import Widget from "components/Widget/index";
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import CampaignApi from "./CampaignApi";
import CampaignMappingApi from "./CampaignMappingApi";

const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;

function CampaignMapping(){
   let [inCamplist, setInCampList] = useState([]);
   let [inUserlist, setInUserList] = useState([]);
   let [campaignlist, setCampaignList] = useState([]);

  
//campaign list
useEffect(() =>{
  CampaignApi.campaignList()
  .subscribe(res=>{ 
    let tempList = [];
    res.data.model.forEach(element => {
      tempList.push(element.campaignName);
    });
    setCampaignList(tempList);
  })
},[])
const [campval,setCampval] = useState({val:''})
function onchangeCampList(value){
  setCampval({
    val: value, 
  })
}

//campaign list


    //In Campaign side list
    function submit(){
     var data={
      campaignname: campval.val
     }
        CampaignMappingApi.getUserFromMap(data)
        .subscribe(res=>{
          let tempList1 = [];
          res.data.model.forEach(element => {
            tempList1.push(element.username);
          });
          setInCampList(tempList1);
        })
      }
const [incamval, setInCampVal] =useState({val:''})
        function onchangeincampval (value){
          setInCampVal({
            val: value,
          })
        }
  //In Campaign side list


  //In User side list 
  useEffect(() =>{
  CampaignMappingApi.inUsers(campval.val)
  .subscribe(res=>{
    let tempList2 = [];
    res.data.model.forEach(element => {
      tempList2.push(element.username);
    });
    setInUserList(tempList2);

  })
},[])
  const [inuserval, setInUserVal] =useState({val:''})
        function onchangeincUserval (value){
          setInUserVal({
            val: value,
          })
        }
  //In User side list 


  const [addedval,setaddedVal] = useState({val:''})
  function AddtoCampaign(){

    var data={
      campaignname: campval.val,
      username: inuserval.val,
    }
      CampaignMappingApi.saveMap(data)
      .subscribe(res=>{
        setaddedVal({
          username: res.data.model.username,
        })
      });
  }


  const [removeval,setremoveVal] = useState({val:''})
  function Removecamp(){
    var data={
      campaignname: campval.val,
      username: incamval.val,
    }
      CampaignMappingApi.removeMap(data)
      .subscribe(res=>{
        setremoveVal({
          username: res.data.model.username,
        })
      });
    
  }
  
          return(
              <div> 
               <AdminHeader/>
            <Col xl={24} lg={12} md={12} sm={12} xs={24}> 
        <h3 className="gx-text-white" >Campaign Mapping</h3> 

        <Col xl={4} lg={12} md={12} sm={12} xs={24}>
                    <h2 className="gx-text-balck" >Select Campaign List</h2>     
                    <FormItem>
                  <TreeSelect className="gx-w-100"
                          showSearch
                          value={onchangeCampList.value}
                          dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                          placeholder="Please select"
                          allowClear
                          treeDefaultExpandAll
                          onChange={onchangeCampList}    
                >
            {
              campaignlist.map((campaignName,campaignId) => 
              <TreeNode   value ={campaignName}key={campaignId} title={campaignName} > 
              </TreeNode>)
             }

                    </TreeSelect>
              </FormItem>
                </Col>

                
               

                <Col xl={4} lg={12} md={12} sm={12} xs={24}>
                  <Button onClick={submit}> Reload</Button> 
                  </Col>

            <Widget styleName={`ant-col gx-bg-white `}>
        <Col span={24}>
          <Row>
         

          <Col xl={8} lg={12} md={12} sm={12} xs={24}>
                    <h2 className="gx-text-black" >In User List</h2>     
                    <FormItem>
                  <TreeSelect className="gx-w-100"
                          showSearch
                          value={onchangeincUserval.value }
                          dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                          placeholder="Please select"
                          allowClear
                          multiple
                          treeDefaultExpandAll
                          onChange={onchangeincUserval}    
                >
            {
              inUserlist.map((username,userid) => 
              <TreeNode   value ={username}key={userid} title={username} > 
              </TreeNode>)
             }

                    </TreeSelect>
              </FormItem>
                </Col>
           

                
                <Col xl={4} lg={12} md={12} sm={12} xs={24}>
                  <h1 className="gx-text-white"> .</h1>
                  <Button onClick={AddtoCampaign}> Add </Button> 
                  </Col>


                  <Col xl={4} lg={12} md={12} sm={12} xs={24}>
                  <h1 className="gx-text-white"> .</h1>
                  <Button onClick={Removecamp}> Remove </Button> 
                  </Col>


                  <Col xl={8} lg={8} md={12} sm={12} xs={24}>
                    <h2 className="gx-text-black" >Campaign user</h2>     
                    <FormItem>
                  <TreeSelect className="gx-w-100"
                          showSearch
                          value={onchangeincampval.value}
                          dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                          placeholder="Please select"
                          allowClear
                          multiple
                          treeDefaultExpandAll
                          onChange={onchangeincampval}    
                >
            {
              inCamplist.map((username,id) => 
              <TreeNode   value ={username}key={id} title={username} > 
              </TreeNode>)
             }

                    </TreeSelect>
              </FormItem>
                </Col>




        </Row> 
    </Col>
           
        </Widget>
    </Col>
</div>
          );

}

export default CampaignMapping;