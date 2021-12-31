import React from "react";
import { Button, Input, message, Modal, Upload } from "antd";
import Moment from "moment";
import axios, { post } from 'axios';
import IntlMessages from "util/IntlMessages";
import MailApis from "../../dashboard/CRM/MailApi/MailApis";
import { triggerBase64Download } from 'react-base64-downloader';

const { TextArea } = Input;


const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
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


class ComposeMail extends React.Component {

  mailAttach() {
  }

  constructor() {
    localStorage.setItem("base64values", "");
    localStorage.setItem("filename", "")
    super();
    this.onMailSend = this.onMailSend.bind(this.setState);
    this.state = {
      id: '',
      // to: localStorage.getItem("mailToId"),
      to: localStorage.getItem("mailToId"),
      subject: "CaseID: " + localStorage.getItem("mailCaseIds") + " Subject: " + localStorage.getItem("mailToSubject"),
      message: localStorage.getItem("mailToBody"),
      attachedFileData: localStorage.getItem("base64values"),
      attachedFileName: localStorage.getItem("filename"),
    }
  }
  onFileChangeHandler = (e) => {

    localStorage.setItem("filename", e.target.files[0].name)
    //base 64 test
    var f = e.target.files[0]; // FileList object
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function (theFile) {
      return function (e) {
        var binaryData = e.target.result;
        //Converting Binary Data to base 64
        var base64String = window.btoa(binaryData);
        localStorage.setItem("base64values", base64String);

        //showing file converted to base64
        // document.getElementById('filetype').value = base64String;
        // alert('File converted to base64 successfuly!\nCheck in Textarea');
      };
    })(f);
    // Read in the image file as a data URL.
    reader.readAsBinaryString(f);

    //base 64 test
  }

  onMailSend(data) {
    MailApis.mailSent(data)
      .subscribe(res => {
      })
  }


  render() {
    const { onClose, user } = this.props;
    const { id, to, subject, message, file, caseId } = this.state;
    return (
      <Modal onCancel={onClose} visible={this.props.open}
        title={<IntlMessages id="mail.title" />}
        closable={false}
        onOk={() => {
          if (to === '')
            return;
          onClose();
          this.onMailSend(
            {
              "id": localStorage.getItem("mailId"),
              "to": localStorage.getItem("mailToId"),
              "subject": subject,
              "body": message,
              "attachedFileData": localStorage.getItem("base64values"),
              "attachedFileName": localStorage.getItem("filename")
            })
        }}
        style={{ zIndex: 2600 }}>
        <div className="gx-form-group">
          <Input
            placeholder="To*"
            onChange={() => this.setState({ to: localStorage.getItem("mailToId") })}
            value={localStorage.getItem("mailToId")}
            margin="normal" />
        </div>
        <div className="gx-form-group">
          <Input
            placeholder="Subject"
            onChange={(event) => this.setState({ subject: event.target.value })}
            value={subject}
            margin="normal"
          />
        </div>

        <div className="gx-form-group">
          <TextArea
            placeholder="Message"
            onChange={(event) => this.setState({ message: event.target.value })}
            value={message}
            autosize={{ minRows: 2, maxRows: 6 }}
            margin="normal" />
        </div>

        <div className="gx-form-group">

          <label class="form-label" for="customFile">Upload and Submit</label>
          <input type="file" className="form-control" name="filetype" onChange={this.onFileChangeHandler} />

          {/* <Upload {...props}>
            <Button type="primary">
              <i className="icon icon-attachment"/> Attach File
            </Button>
          </Upload> */}

        </div>
      </Modal>
    );
  }
}

export default ComposeMail;
