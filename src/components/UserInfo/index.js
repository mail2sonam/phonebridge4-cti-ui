import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar, Popover } from "antd";
import { useHistory } from "react-router-dom";
import UserApi from "../dashboard/CRM/UserApi";
import Auth from "../../containers/App/Auth";

const UserInfo = (props) => {
  const [logout, setLogout] = useState({ userextension: "" });

  function logoutme() {
    var data = {
      userextension: localStorage.getItem("extn")
    }

    UserApi.logout(data)
      .subscribe(response => {
        setLogout({
          userextension: response.data.userextension,
        })

      })

    // Auth.logout(() => {
    //   props.history.push('/signin');
    // });
    // localStorage.clear();

    history.push('/signin')
  }


  const dispatch = useDispatch();

  let history = useHistory();

  const userMenuOptions = (
    <ul className="gx-user-popover">
      {/* <li>My Account</li>
      <li>Connections</li> */}
      {/* <li onClick={() => dispatch(userSignOut())}>Logout
      </li> */}
      <li onClick={logoutme}>Logout
      </li>
    </ul>
  );

  return (
    <Popover overlayClassName="gx-popover-horizantal" placement="bottomRight" content={userMenuOptions}
      trigger="click">
      <Avatar src={require("assets/images/logouticon.jpg")}
        className="gx-avatar gx-pointer" alt="" />
    </Popover>
  )

}

export default UserInfo;
