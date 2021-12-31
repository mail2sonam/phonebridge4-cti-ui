import React from "react";
import {Col, Row} from 'antd';

import Widget from "components/Widget/index";

const FriendshipCard =()=> {

  return (
    <Widget styleName="gx-p-lg-1">
      <Row>
        <Col xl={9} lg={10} md={10} sm={10} xs={24}>
        <img src={window.location.origin + 'C:\SPD\DialEasy4.0\starter-template\src\components\dashboard\CRM\photo_2020-12-23_16-55-56'} />
        </Col>
        <Col xl={15} lg={14} md={14} sm={14} xs={24}>
          <div className="gx-fnd-content">
            <p className="gx-text-grey">Outdoor Experience</p>
            <h2 className="gx-text-uppercase gx-text-black gx-font-weight-bold gx-fnd-title">A Friendship with high
              waves</h2>
            <p>Had a great time with family on beach this
              weekend.</p>
            <ul className="gx-fnd-gallery-list">
              <li><img alt="..." src={"https://via.placeholder.com/70x70"}
                       className="gx-rounded-lg gx-img-fluid"/></li>
              <li><img alt="..." src={"https://via.placeholder.com/70x70"}
                       className="gx-rounded-lg gx-img-fluid"/></li>
              <li><img alt="..." src={"https://via.placeholder.com/70x70"}
                       className="gx-rounded-lg gx-img-fluid"/></li>
            </ul>
          </div>
        </Col>
      </Row>
    </Widget>
  );
}

export default FriendshipCard;