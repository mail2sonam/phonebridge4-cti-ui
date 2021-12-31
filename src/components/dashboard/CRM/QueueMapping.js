import React from "react";
import { Col, Row, Card, Checkbox, TreeSelect, DatePicker, TimePicker } from 'antd';
import { Button, Form, Input, InputNumber, Transfer } from "antd";
import { useState, useEffect, useContext } from 'react'
import 'react-dropdown-tree-select/dist/styles.css'
import Widget from "components/Widget/index";
import AdminHeader from "../../../containers/Topbar/InsideHeader/AdminHeader";
import CampaignApi from "./CampaignApi";
import CampaignMappingApi from "./CampaignMappingApi";

const FormItem = Form.Item;
const TreeNode = TreeSelect.TreeNode;

function QueueMapping() {

    let [campainglist, setCampaignList] = useState([]);


    //campaign list
    useEffect(() => {
        CampaignApi.campaignList()
            .subscribe(res => {
                let tempList = [];
                res.data.model.forEach(element => {
                    tempList.push(element.campaignName);
                });
                setCampaignList(tempList);
            })
    }, [])
    const [campval, setCampval] = useState({ val: '' })
    function onchangeCampList(value) {
        setCampval({
            val: value,
        })
    }

    //campaign list


    function queuemap() {
        var data = {
            campaignName: campval.val
        }
        CampaignMappingApi.queueMap(data)
            .subscribe(res => {
            }
            )

    }

    function queuemapremove() {
        var data = {
            campaignName: campval.val
        }
        CampaignMappingApi.queueMapRemove(data)
            .subscribe(res => {
            }
            )
    }

    return (
        <div>
            <AdminHeader />

            <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                <h3 className="gx-text-white" >Campaign Mapping</h3>

                <Col xl={10} lg={12} md={12} sm={12} xs={24}>
                    <h2 className="gx-text-balck" >Select Campaign List</h2>
                    <FormItem>
                        <TreeSelect className="gx-w-100"
                            showSearch
                            value={onchangeCampList.value}
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="Please select"
                            allowClear
                            treeDefaultExpandAll
                            onChange={onchangeCampList}
                        >
                            {
                                campainglist.map((campaignName, campaignId) =>
                                    <TreeNode value={campaignName} key={campaignId} title={campaignName} >
                                    </TreeNode>)
                            }

                        </TreeSelect>
                    </FormItem>
                </Col>

            </Col>

            <Col xl={4} lg={12} md={12} sm={12} xs={24}>
                <Button className="gx-btn-orange  gx-mb-1" onClick={queuemap}>Add Direct To Queue</Button>
            </Col>

            <Col xl={4} lg={12} md={12} sm={12} xs={24}>
                <Button className="gx-btn-orange  gx-mb-1" onClick={queuemapremove}>Remove Direct To Queue</Button>
            </Col>
        </div>
    );

}

export default QueueMapping;