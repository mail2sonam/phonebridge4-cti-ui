import React from "react";
import Icon from '@ant-design/icons';

const QueueDetailCard = () => {

  return (
    <div className="gx-wel-ema gx-pt-xl-2">
      <h2 className="gx-mb-3">Queue Status </h2>
      <ul className="gx-list-group">
      <li>
          <Icon type="message"/>
          <span>Queue</span>
        </li>
        <li>
          <Icon type="message"/>
          <span>Phone Number:</span>
        </li>
        <li>
          <Icon type="mail"/>
          <span>Avaliable Extension:</span>
        </li>
      </ul>
    </div>

  );
};

export default QueueDetailCard;
