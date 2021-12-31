import React from "react";
import {Col, Row, Card, Checkbox, TreeSelect, DatePicker, TimePicker,Select} from 'antd';
import {Button, Form, Input, InputNumber} from "antd";
import { useState ,useEffect, useContext} from 'react'
import 'react-dropdown-tree-select/dist/styles.css'
import { UserContext } from "./UserContext";
import Auxiliary from "util/Auxiliary";
import { SubCatContextnew } from "./SubCatContextnew";
import EmergencyScreen from "./EmergencyScreen";

const SubCategory = (props) =>{
const {Option, OptGroup} = Select;

function handleChange(value) {
    
  }


  var subcvalue1= "";
  const subcat = useContext(UserContext)

  const [subcat1, setSubCat1] =useState({sub1:'no'});
  function onChangesubcat1(value) {
    subcvalue1 = value.toString()
    localStorage.setItem("subcatval",subcvalue1)
    setSubCat1({
      sub1: value
  })
  // props.subvalue= subcvalue1;


  }

  

const TreeNode = TreeSelect.TreeNode;

  return (
       <Auxiliary>

                    <TreeSelect className="gx-w-100"
                            showSearch
                            value={onChangesubcat1.value}
                            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                            placeholder="Please select"
                            allowClear
                            multiple
                            treeDefaultExpandAll
                            onChange={onChangesubcat1}
                  >
          

    
{
    subcat=="Domestic Violence"
                    ?<TreeNode > 
                      <TreeNode value="Domestic Violence $ Dowry Demand " title="Dowry Demand " key="19"/>
                      <TreeNode value="Domestic Violence $  Marital Rape" title="Marital Rape" key="20"/>
                      <TreeNode value="Domestic Violence $  Incest" title="Incest" key="21"/>
                      <TreeNode value="Domestic Violence $  Forced Marriage" title="Forced Marriage" key="22"/>
                      <TreeNode value="Domestic Violence $  Against Relationship of Choice" title="Against Relationship of Choice" key="23"/>
                      <TreeNode value="Domestic Violence $  Bigamy" title="Bigamy" key="73"/>
                      <TreeNode value="Domestic Violence $  Deception" title="Deception" key="74"/>
		      <TreeNode value="Domestic Violence $  Adultery" title="Adultery" key="1174"/>
          <TreeNode value="Any other" title="Any other" key="290"/>
            
                     </TreeNode>

    :subcat=="Sexual Violence"
                    ?  <TreeNode > 
                               <TreeNode value="Sexual Violence $ Sexual Harrassment" title="Sexual Harrassment" key="25">
                        <TreeNode value="Sexual Harrassment $ Workplace" title="Workplace" key="26"/>
                        <TreeNode value="Sexual Harrassment $ Public place" title="Public place" key="27"/>
                        <TreeNode value="Sexual Harrassment $ Friends/Relatives Homes" title="Friends/Relatives Homes" key="28"/>
                        <TreeNode value="Any other" title="Any other" key="393"/>
				 </TreeNode>
         <TreeNode value="Any other" title="Any other" key="395">
           </TreeNode>
                      <TreeNode value="Sexual Violence $ Sexual Assualt" title="Sexual Assualt" key="29"/>
                      <TreeNode value="Sexual Violence $ Stalking" title="Stalking" key="30"/>
                      <TreeNode value="Sexual Violence $ Voyeurism (Sec. 354 IPC)" title="Voyeurism (Sec. 354 IPC)" key="31"/>
                          <TreeNode value="Voyeurism (Sec. 354 IPC) $ Rape" title="Rape" key="32">
                                <TreeNode value="Rape $ Known" title="Known" key="62"/>
                                <TreeNode value="Rape $ Unknown" title="Unknown" key="63"/>
                                <TreeNode value="Any other" title="Any other" key="394"/>
                          </TreeNode>
		               <TreeNode value="Sexual Violence $ Deceivement / false promise of marriage" title="Deceivement / false promise of marriage" key="371">
                    </TreeNode>
                      
                        <TreeNode value="Any other" title="Any other" key="396">
                          </TreeNode>
       
                </TreeNode>
    

    :subcat=="Crime Against Children"
                    ?<TreeNode > 
                        <TreeNode value="Mental Health Issues-for Self $ Depression" title="Depression" key="66"/>
                        <TreeNode value="Mental Health Issues-for Self $ Suicidal Ideation" title="Suicidal Ideation" key="67"/>
                        <TreeNode value="Mental Health Issues-for Self $ Drug/ Alcoholism" title="Drug/ Alcoholism" key="68"/>
                        <TreeNode value="Any other" title="Any other" key="373"/>
                </TreeNode>
    



    :subcat=="Mental Health Issues-for Self"
                    ?<TreeNode > 
                        <TreeNode value="Depression" title="Depression" key="267">                                
                        </TreeNode>
                        <TreeNode value="Suicidal Ideation" title="Suicidal Ideation" key="268">                                
                        </TreeNode>
                        <TreeNode value="Drug/ Alcoholism" title="Drug/ Alcoholism" key="269">                                
                        </TreeNode>
                        <TreeNode value="Any other" title="Any other" key="291">
                          </TreeNode>
    
                 </TreeNode>


                    

   : subcat=="Crime Related"
                    ?
                    <TreeNode > 
                       <TreeNode value="Crime Related $ Murder Attempt" title="Murder Attempt" key="70"/>
                        <TreeNode value="Crime Related $ Human Trafficking" title="Human Trafficking" key="71"/>
                        <TreeNode value="Crime Related $ Threatening Calls" title="Threatening Calls" key="72"/>
                        <TreeNode value="Crime Related $ Missing Persons" title="Missing Persons" key="374"/>
                        <TreeNode value="Crime Related $ Monetary fraud" title="Monetary fraud" key="375"/>
                        <TreeNode value="Any other" title="Any other" key="376"/>

             </TreeNode>

   : subcat=="Cyber Crime"
                    ?
                    <TreeNode > 
                      <TreeNode value="Legal Disputes $ Child Custody" title="Child Custody" key="279"/>                                
                  <TreeNode value="Legal Disputes $ Maintenance" title="Maintenance" key="280"/>                                
                  <TreeNode value="Legal Disputes $ Divorce" title="Divorce" key="281"/>                                
                  <TreeNode value="Legal Disputes $ Property dispute" title="Property dispute" key="278"/>                                
                  <TreeNode value="Legal Disputes $ Other Legal issues" title="Other Legal issues" key="282"/>           
                  <TreeNode value="Any other" title="Any other" key="380"/>
         </TreeNode>

                      
: subcat=="Legal Disputes"
?
<TreeNode > 
        <TreeNode value="Property dispute" title="Property dispute" key="278">                                
        </TreeNode>
        <TreeNode value="Child Custody" title="Child Custody" key="279">                                
        </TreeNode>
        <TreeNode value="Maintenance" title="Maintenance" key="280">                                
        </TreeNode>
        <TreeNode value="Divorce" title="Divorce" key="281">                                
        </TreeNode>
        <TreeNode value="Other Legal issues" title="Other Legal issues" key="282">                                
        </TreeNode>
        <TreeNode value="Any other" title="Any other" key="292">
          </TreeNode>

</TreeNode>

: subcat=="Rescues & Emergencies"
?
<TreeNode > 
                <TreeNode value="Rescues & Emergencies $ Rescue" title="Rescue" key="283"/>                                
                    <TreeNode value="Rescues & Emergencies $ Disaster Management" title="Disaster Management" key="284"/>       
                    <TreeNode value="Any other" title="Any other" key="381"/> 
</TreeNode>

: subcat=="Other Complaints & Queries"
?
<TreeNode > 
                <TreeNode value="Other Complaints & Queries $ Maladjustment with spouse & in laws" title="Maladjustment with spouse & in laws" key="285"/>                 
                    <TreeNode value="Other Complaints & Queries $  Public Nuisance" title="Public Nuisance" key="286"/>                                
                    <TreeNode value="Any other" title="Any other" key="382"/> 
</TreeNode>
    
                :
                <TreeNode > 
        
                 </TreeNode>
                
           
        }


</TreeSelect>



{/* <SubCatContextnew.Provider value={subcvalue1}> 
    <EmergencyScreen/>
  </SubCatContextnew.Provider> */}

    </Auxiliary>
);
}

export default SubCategory;
