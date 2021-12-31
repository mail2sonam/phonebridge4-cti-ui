import React from "react";
import {useHistory} from "react-router-dom";
import { Button} from "antd";
const AppModuleHeader = (props) => {

    const {placeholder, onChange, value} = props;
    let history = useHistory();
    function AgentPagebutton(){
      history.push("/agent");
    }

    return (
      <div className="gx-module-box-header-inner">
        <div
          className="gx-search-bar gx-lt-icon-search-bar-lg gx-module-search-bar gx-d-none gx-d-sm-block">
          {/* <div className="gx-form-group">
            <input className="ant-input gx-border-0" type="search" placeholder={placeholder}
                   onChange={onChange}
                   value={value}/>
            <span className="gx-search-icon gx-pointer"><i className="icon icon-search"/></span>
          </div> */}
        </div>
        <div className="gx-module-box-header-right">
        <Button className="gx-btn-info  gx-mb-1" onClick={AgentPagebutton}>Agent Page</Button> 
          {/* <span className="gx-fs-xl"> <i
            className="icon icon-apps gx-icon-btn"/></span>
          <span className="gx-fs-xl"><i
            className="icon icon-notification gx-icon-btn"/></span> */}
        </div>
      </div>
    )
};

export default AppModuleHeader;

AppModuleHeader.defaultProps = {
  styleName: '',
  value: '',
  notification: true,
  apps: true
};
