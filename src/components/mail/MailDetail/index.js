import React, { useState } from "react";
import { Avatar, Dropdown, Button, Menu } from "antd";
import CustomScrollbars from 'util/CustomScrollbars'
import labels from "../../dashboard/CRM/MailIntegr/labels";
import IntlMessages from "util/IntlMessages";
import ComposeMail from "../Compose";
import axios, { post } from 'axios';
import MailLog from "../MailLog";
import { useHistory } from "react-router";

const options = [
  'Reply',
  // 'Forward',
  // 'Print',
];

class MailDetail extends React.Component {


  state = {
    showDetail: false
  };

  handleRequestClose = () => {
    this.setState({
      composeMail: false,
      showMessage: false,
      mailLog: false,

    });
  };

  constructor() {
    // let history = useHistory();

    super();
    this.state = {
      searchMail: '',
      noContentFoundMessage: 'No Mail found in selected folder',
      alertMessage: '',
      showMessage: false,
      drawerState: false,
      optionName: 'None',
      anchorEl: null,
      // allMail: mails,
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
      mailLog: false,
      // folderMails: mails.filter(mail => mail.folder === 0)
      data: "",
      fileName: "",
      base64value: "",
    }
  }

  componentDidMount() {

    setTimeout(() => {
      this.setState({ loader: false });
    }, 1500);
  }

  optionMenu = () => {
    return (
      <Menu id="long-menu">
        {options.map(option =>
          <Menu.Item key={option}>
            {option}
          </Menu.Item>,
        )}
      </Menu>
    )
  };


  // attachment 
  componentDidMount() {
    var dataval = this;
    axios({
      method: 'post',
      url: '"http://192.168.10.210:5001/eupraxia"/mail/getAttachedFile',
      data: { id: localStorage.getItem("mailId") },
      headers: {
        Authorization: "Bearer".concat(localStorage.getItem("token"))
      }
    })
      .then(function (response) {
        dataval.setState({ data: response.data.MailData.attachedBase64DataType });
        dataval.setState({ base64value: response.data.MailData.attachedFileData });
        dataval.setState({ fileName: response.data.MailData.attachedFileName });
      },
      );
  }
  //attachments

  // mailLogPage(){
  //   this.history.push("/mailLog");
  // }

  render() {
    const { mail, onStartSelect, onImportantSelect } = this.props;
    const { composeMail, mailLog, user, data, fileName, base64value } = this.state;

    localStorage.setItem("mailId", mail.id)
    localStorage.setItem("mailToId", mail.from)
    localStorage.setItem("mailToSubject", mail.subject)
    localStorage.setItem("mailCaseIds", mail.caseId)
    localStorage.setItem("mailToBody", mail.body)
    localStorage.setItem("mailAttachment", mail.attachedFileData)
    return (
      <div className="gx-module-detail gx-mail-detail">
        <CustomScrollbars className="gx-module-content-scroll">
          <div className="gx-mail-detail-inner">
            <div className="gx-mail-header">

              <div className="gx-mail-header-content gx-col gx-pl-0">
                <div className="gx-subject">
                  <strong> {mail.subject}</strong>
                </div>

                {/* <div className="gx-labels">
                  {labels.map((label, index) => {
                    return (mail.labels).includes(label.id) && <div key={index}
                      className={`gx-badge gx-text-white gx-bg-${label.color}`}>{label.title}</div>
                  })}
                </div> */}
              </div>

              <div className="gx-mail-header-actions">
                <div onClick={() => {
                  onStartSelect(mail);
                }}>
                  {mail.starred ?
                    <i className="icon icon-star gx-icon-btn" /> :
                    <i className="icon icon-star-o gx-icon-btn" />
                  }

                </div>
                <div onClick={() => {
                  onImportantSelect(mail);
                }}>
                  {mail.important ?
                    <i className="icon icon-important gx-icon-btn" />
                    : <i className="icon icon-important-o gx-icon-btn" />
                  }
                </div>
              </div>

            </div>
            <hr />

            <div className="gx-mail-user-info gx-ml-0 gx-mb-3">
              {mail.from.avatar === '' ?
                <Avatar
                  className="gx-avatar gx-bg-blue gx-size-40 gx-mr-3"> {mail.from.name.charAt(0).toUpperCase()}</Avatar> :
                <Avatar className="gx-size-40 gx-mr-3" alt="Alice Freeman"
                  src={mail.from.avatar} />
              }

              <div className="gx-sender-name">{mail.from.name}
                <div className="gx-send-to gx-text-grey">to me</div>
              </div>
              <ComposeMail open={composeMail} user={user}
                onClose={this.handleRequestClose}
              //onMailSend={this.onMailSend.bind(this)}
              />


              <div className="gx-module-add-task">
                <Button type="primary" className="gx-btn-block"
                  onClick={() => {
                    this.setState({ composeMail: true })
                  }}>
                  <i className="icon icon-edit gx-mr-2" />
                  <IntlMessages id="sidebar.mail.compose" /></Button>
              </div>

              {/* sent mail log */}
              <MailLog open={mailLog} user={user}
                onClose={this.handleRequestClose}
              //onMailSend={this.onMailSend.bind(this)}
              />

              <div className="gx-module-add-task">
                <Button type="primary" className="gx-btn-block"
                  onClick={() => {
                    this.setState({ mailLog: true })
                  }}>
                  <i className="icon icon-data-entry gx-mr-2" />
                  <IntlMessages id="sidebar.mail.viewLog" /></Button>
              </div>

              {/* sent mail log */}

              {/* <Dropdown trigger={['click']} overlay={options}>
                 <span className="gx-ml-auto"><i className="icon icon-ellipse-v gx-icon-btn"/></span>
               </Dropdown> */}

            </div>

            <div className="gx-show-link" onClick={() => {
              this.setState({ showDetail: !this.state.showDetail });
            }}>{this.state.showDetail ? 'Hide Detail' : 'Show Detail'}</div>
            {this.state.showDetail && (<div className="gx-show-detail">
              <div>
                <strong>From: </strong>{mail.from}
              </div>
              <div>
                <strong>CaseId: </strong>{mail.caseId}
              </div>
              {/* <div>
                <strong> To: </strong>
                {
                  mail.to.map((to, index) => <span>{index > 0 && ', '} {to.email}</span>)
                }
              </div> */}
              <div><strong>Date: </strong>{mail.sentDate} </div>
            </div>)}

            <p>
              {mail.body}
            </p>

            <h1>Attachments</h1>
            {/* attachment */}
            {data == null || data == ""
              ? <h1 className="gx-text-blue" > No Attachments</h1>
              : <a className="gx-text-blue"
                href={data + base64value}
                download={fileName} onClick={this.componentDidMount}>
                {fileName}
              </a>

            }

            {/* attachment */}

            {mail.hasAttachments &&
              <div className="gx-attachment-block">
                <h3>Attachments ({mail.attachments.length})</h3>
                <div className="gx-attachment-row">
                  {mail.attachments.map((attachment, index) =>
                    <div className="gx-attachment-col" key={index}>
                      <img src={attachment.preview} alt={attachment.fileName} />
                      <div className="size">{attachment.size}</div>
                    </div>
                  )}
                </div>
              </div>
            }
          </div>
        </CustomScrollbars>
      </div>
    );
  }
}

export default MailDetail;
