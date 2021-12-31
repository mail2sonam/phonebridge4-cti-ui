import React from "react";
import {Button, Input, message, Modal, Upload} from "antd";
import Moment from "moment";

import IntlMessages from "util/IntlMessages";
import MailApis from "../../dashboard/CRM/MailApi/MailApis";

const {TextArea} = Input;

const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

class ComposeSms extends React.Component {
  constructor() {
    super();
    this.onMailSend = this.onMailSend.bind(this.setState);
    this.state = {
      id: '',
      to: localStorage.getItem("mailToId"),
      subject: '',
      message: '',
    }
  }

   onMailSend(data) {
    MailApis.mailSent(data)
    .subscribe(res => {
    })
  }

  

  render() {
    const { onClose, user} = this.props;
    const {id, to, subject, message} = this.state;
    return (
      <Modal onCancel={onClose} visible={this.props.open}
             title={<IntlMessages id="mail.title"/>}
             closable={false}
             onOk={() => {
               if (to === '')
                 return;
               onClose();
              this.onMailSend(
                 { 
                   "id": localStorage.getItem("mailId"),
                   "to" : localStorage.getItem("mailToId"),
                   "subject" : subject,
                   "body" : message,
                 })
             }}
             style={{zIndex: 2600}}>
        <div className="gx-form-group">
          <Input
            placeholder="To*"
            onChange={() => this.setState({to: localStorage.getItem("mailToId")})}
            value={localStorage.getItem("mailToId")}
            margin="normal"/>
        </div>
        <div className="gx-form-group">
          <Input
            placeholder="Subject"
            onChange={(event) => this.setState({subject: event.target.value})}
            value={subject}
            margin="normal"
          />
        </div>
        <div className="gx-form-group">
          <TextArea
            placeholder="Message"
            onChange={(event) => this.setState({message: event.target.value})}
            value={message}
            autosize={{minRows: 2, maxRows: 6}}
            margin="normal"/>
        </div>

        {/* <div className="gx-form-group">

          <Upload {...props}>
            <Button type="primary">
              <i className="icon icon-attachment"/> Attach File
            </Button>
          </Upload>

        </div> */}
      </Modal>
    );
  }
}

export default ComposeSms;
