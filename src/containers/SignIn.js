import React, { useEffect, useState } from "react";
import { Button, Col, Row, Checkbox, Input, message, Form, Alert } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  hideMessage,
  showAuthLoader,
  userSignIn,
} from "appRedux/actions/Auth";
import UserApi from "components/dashboard/CRM/UserApi";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";
import AgentPage from "../routes/SamplePage/Agent";
import { UserContext } from "../components/dashboard/CRM/UserContext";
import Auth from "./App/Auth";

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}



const SignIn = (props) => {

  const [login, setLogin] = useState({ user: '', userPassword: '' });

  const [loginalert, setAlert] = useState({ flage: 9 });

  const [pass, setPass] = useState({ passvalue: "" });
  let history = useHistory();

  const handleChange2 = event => {
    const { name, value } = event.target
    setLogin({ ...login, [name]: value })
  }

  const signinme = () => {

    localStorage.setItem("user", "")
    localStorage.setItem("pass", "")
    localStorage.setItem("extn", "")
    localStorage.setItem("context", "")
    localStorage.setItem("prefix", "")
    localStorage.setItem("email", "")
    localStorage.setItem("extensiontype", "")
    localStorage.setItem("usertype", "")

    var data = {
      email: login.user,
      password: login.userPassword,
    }

    UserApi.login(data)
      .subscribe(response => {
        setLogin({
          id: response.data.model.id,
          username: response.data.model.username,
          userextension: response.data.model.userextension,
          extensionstatus: response.data.model.extensionstatus,
          onbreak: response.data.model.onbreak,
          popupstatus: response.data.model.popupstatus,
          usertype: response.data.model.usertype,
          password: response.data.model.password,
          context: response.data.model.context,
          callstatus: response.data.model.callstatus,
          branchid: response.data.model.branchid,
          ivruser: response.data.model.ivruser,
          deleted: response.data.model.deleted,
          prefix: response.data.model.prefix,
          extensiontype: response.data.model.extensiontype,
          email: response.data.model.email,
          popupStatusUpdateTime: response.data.model.popupStatusUpdateTime,
          agenttype: response.data.model.agenttype,
          departmentcode: response.data.model.departmentcode,
          department_name: response.data.model.department_name
        })
        setPass({
          passvalue: response.data.model.usertype
        })

        if (response.data.responseCode == 400) {
          setAlert({
            flage: 400
          })


        } else if (response.data.responseCode == 404) {
          setAlert({
            flage: 404
          })


        } else if (response.data.responseCode == 200) {
          setAlert({
            flage: 200
          })


        }
        else {
          setAlert({
            flage: 3
          })

        }
        // localStorage.setItem("token", response.data.token)
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("refreshtoken", response.data.refreshToken);

        localStorage.setItem("user", response.data.model.username)
        localStorage.setItem("pass", response.data.model.password)
        localStorage.setItem("extn", response.data.model.userextension)
        localStorage.setItem("context", response.data.model.context)
        localStorage.setItem("prefix", response.data.model.prefix)
        localStorage.setItem("email", response.data.model.email)
        localStorage.setItem("extensiontype", response.data.model.extensiontype)
        localStorage.setItem("usertype", response.data.model.usertype)

        localStorage.setItem("dialerCampaign", "OGDefault");
      })

  }

  const onFinishFailed = errorInfo => {

  };
  const onFinish = values => {

  };

  if (pass.passvalue == "agent" && loginalert.flage == 200) {

    // history.push("/agent");
    Auth.login(() => {
      props.history.push("agent");
    });

  } else if (pass.passvalue == "Admin") {

    // history.push("/admin");
    Auth.login(() => {
      props.history.push("/admin");
    })

  } else if (pass.passvalue == "FollowUp") {
    history.push("/followUp");
  } else if (pass.passvalue == "Executive") {

    history.push("/executiveAdmin");
  }


  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg">
            </div>
            <div className="gx-app-logo-wid">
              <h1><IntlMessages id="app.userAuth.signIn" /></h1>
              <p><IntlMessages id="app.userAuth.bySigning" /></p>
              <p><IntlMessages id="app.userAuth.getAccount" /></p>
            </div>
            <div className="gx-app-logo">
              <img alt="example" src={require("assets/images/logo.png")} />
            </div>
          </div>
          <div className="gx-app-login-content">
            <Form
              initialValues={{ remember: true }}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              layout="inline">
              <Row>
                {loginalert.flage == 400
                  ? <Alert
                    message="Warning"
                    description="Your Extension is Already Registered"
                    type="warning"
                    showIcon
                  />
                  : loginalert.flage == 404
                    ? <Alert
                      message="Warning"
                      description="Please Enter Valid Credential and Try Again"
                      type="warning"
                      showIcon
                    />
                    : null
                }


                <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                  <label> Email Id</label>
                  <Form.Item rules={[{ required: true, message: 'Please Enter Valid Email' }]} name="user">

                    <Input id="user" name="user" placeholder="Email Id" value={login.user} onChange={handleChange2} />
                  </Form.Item>
                </Col>
                <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                  <label> Password</label>
                  <Form.Item rules={[{ required: true, message: 'Please Enter Valid Password' }]} name="userPassword">

                    <Input id="userPassword" name="userPassword" type="password" placeholder="Password" value={login.userPassword} onChange={handleChange2} />
                  </Form.Item>
                </Col>
                <Col xl={24} lg={12} md={12} sm={12} xs={24}>
                  <Form.Item>
                    <Button type="primary" className="gx-btn-info   gx-mb-1"

                      htmlType="submit"
                      onClick={signinme}

                    >
                      SignIn
                      {/* <AgentPage/> */}
                    </Button>
                  </Form.Item>
                </Col>

                {/* <UserContext.Provider value={login.username}>
            <AgentPage/>
            </UserContext.Provider> */}



              </Row>

            </Form>
          </div>
        </div>
      </div>
    </div>
  );

};

export default SignIn;
