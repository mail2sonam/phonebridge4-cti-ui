import React from "react";
import Icon from '@ant-design/icons';

const WelComeCard = () => {

  return (
    <div className="gx-wel-ema gx-pt-xl-2">
      <h1 className="gx-mb-3">Welcome Dashboard</h1>
      <p className="gx-fs-sm gx-text-uppercase">Todays Call Count</p>
      <ul className="gx-list-group">
        <li>
          <Icon type="message"/>
          <span>Incoming Calls</span>
        </li>
        <li>
          <Icon type="mail"/>
          <span>Outgoing Calls</span>
        </li>
        <li>
          <Icon type="profile"/>
          <span>Missed Calls</span>
        </li>
        <li>
          <Icon type="bell"/>
          <span>Login Agents</span>
        </li>
      </ul>
    </div>

  );
};

export default WelComeCard;
