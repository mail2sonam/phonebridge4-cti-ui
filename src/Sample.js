import React from 'react';
import {Col, Row, Card, Button, TreeSelect, DatePicker, Form} from 'antd';
import './App.css'
import { Input } from '@material-ui/core';
const TreeNode = TreeSelect.TreeNode;

const Sample = () => {

  function onChangeTree(value) {
  
  };

  return(

    <Card className="gx-card" title="Basic">
        <TreeSelect className="gx-w-100"
                    showSearch
                    value={onChangeTree.value}
                    dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
                    placeholder="Please select"
                    allowClear
                    treeDefaultExpandAll
                    onChange={onChangeTree}
        >
          <TreeNode value="parent 1" title="parent 1" key="0-1">
            <TreeNode value="parent 1-0" title="parent 1-0" key="0-1-1">
              <TreeNode value="leaf1" title="my leaf" key="random"/>
              <TreeNode value="leaf2" title="your leaf" key="random1"/>
            </TreeNode>
            <TreeNode value="parent 1-1" title="parent 1-1" key="random2">
              <TreeNode value="sss" title={<b style={{color: '#08c'}}>sss</b>} key="random3"/>
            </TreeNode>
          </TreeNode>
        </TreeSelect>
      </Card>

  );
  }

export default Sample;