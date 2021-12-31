import React from "react";

const AppModuleHeader = () => {

    return (
      <div className="gx-module-box-header-inner">
        <div
          className="gx-search-bar gx-lt-icon-search-bar-lg gx-module-search-bar gx-d-none gx-d-sm-block">
          <div className="gx-form-group">
            <input className="ant-input gx-border-0" type="search" placeholder="mail"
                   />
            <span className="gx-search-icon gx-pointer"><i className="icon icon-search"/></span>
          </div>
        </div>
        <div className="gx-module-box-header-right">
          <span className="gx-fs-xl"> <i
            className="icon icon-apps gx-icon-btn"/></span>
          <span className="gx-fs-xl"><i
            className="icon icon-notification gx-icon-btn"/></span>
        </div>
      </div>
    )
};

export default AppModuleHeader;
