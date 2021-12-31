import React, { PureComponent, useState } from "react";
import Auxiliary from "util/Auxiliary";
import { Col, Row } from 'antd';
import Widget from "components/Widget/index";
import InsideHeader from "../../../../containers/Topbar/InsideHeader";
import IntlMessages from "../../../../util/IntlMessages";
import TopBarChart from "../TopBarChart";
import folders from "./data/folders";
import filters from "./data/filters";
import labels from "./data/labels";
import { Button, Drawer } from "antd";
import AppModuleHeader from "./AppModuleHeader";

function Mail() {

  const [state, setState] = useState({
    searchMail: '',
    noContentFoundMessage: 'No Mail found in selected folder',
    alertMessage: '',
    showMessage: false,
    drawerState: true,
    optionName: 'None',
    anchorEl: null,
    //allMail: mails,
    loader: true,
    currentMail: null,
    user: {
      name: 'Robert Johnson',
      email: 'robert@example.com',
      avatar: "https://via.placeholder.com/150"
    },
    selectedMails: 0,
    selectedFolder: 0,
    composeMail: false,
    //folderMails: mails.filter(mail => mail.folder === 0)
  })

  function onToggleDrawer() {

  }

  const getNavFolders = () => {
    return folders.map((folder, index) =>
      <li key={index} >
        <span className="gx-link">
          <i className={`icon icon-${folder.icon}`} />
          <span>{folder.title}</span>
        </span>
      </li>
    )
  };

  const getNavFilters = () => {
    return filters.map((filter, index) =>
      <li key={index} >
        <span className="gx-link">
          <i className={`icon icon-${filter.icon}`} />
          <span>{filter.title}</span>
        </span>
      </li>
    )
  };


  const getNavLabels = () => {
    return labels.map((label, index) =>
      <li key={index} >
        <span className="gx-link">
          <i className={`icon icon-tag gx-text-${label.color}`} />
          <span>{label.title}</span>
        </span>
      </li>
    )
  };


  const MailSideBar = () => {
    return <div className="gx-module-side">

      <div className="gx-module-side-content">

        <div className="gx-module-add-task">
          <Button type="primary" className="gx-btn-block">
            <i className="icon icon-edit gx-mr-2" />
            <IntlMessages id="sidebar.mail.compose" /></Button>
        </div>

        <ul className="gx-module-nav">
          {getNavFolders()}

          <li className="gx-module-nav-label">
            <IntlMessages id="sidebar.mail.filters" />
          </li>

          {getNavFilters()}

          <li className="gx-module-nav-label">
            <IntlMessages id="sidebar.mail.labels" />
          </li>

          {getNavLabels()}

        </ul>

      </div>
    </div>
  };


  const getAllMail = () => {
    let mails = allMail.map((mail) => mail.folder === this.state.selectedFolder ? {
      ...mail,
      selected: true
    } : mail);

  };


  return (
    <Auxiliary>
      <InsideHeader />
      <div>
        <TopBarChart />
      </div>

      <Row>
        <Col span={24}>
            <Widget styleName={`ant-col gx-bg-white `}>
              <div className="gx-card-body">
                <Row>
                  <Col xl={6} lg={12} md={12} sm={12} xs={24}>
                    {/* <Drawer
                placement="left"
                visible={state.drawerState}
                variant="permanent"
              >
                {MailSideBar()}
              </Drawer> */}
                    {MailSideBar()}
                  </Col>
                  <Col xl={18} lg={12} md={12} sm={12} xs={24}>
                    <AppModuleHeader />

                  </Col>


                  <div className="gx-module-box-content">
              <div className="gx-module-box-topbar">
                {this.state.currentMail === null ?
                  <div className="gx-flex-row gx-align-items-center">
                    {folderMails.length > 0 ?
                      <Auxiliary>
                        <Dropdown overlay={optionMenu()} placement="bottomRight" trigger={['click']}>
                          <div>
                            <span className="gx-px-2"> </span>
                            <i className="icon icon-charvlet-down"/></div>
                        </Dropdown>
                      </Auxiliary>
                      : null}
                  </div>
                  :
                  <i className="icon icon-arrow-left gx-icon-btn" onClick={() => {
                    this.setState({currentMail: null})
                  }}/>
                }

                <div classID="toolbar-separator"/>

              </div>
      </div>




                </Row>
              </div>
            </Widget>
        </Col>
      </Row>


    </Auxiliary>
  )

}

export default Mail;
