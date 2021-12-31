import React, { useContext } from "react";
import {useSelector} from "react-redux";
import {Menu} from "antd";
import {Link} from "react-router-dom";
import IntlMessages from "../../util/IntlMessages";
import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL
} from "../../constants/ThemeSetting";
import Monitor from "../../routes/SamplePage/Monitor";
import { UserContext } from "../../components/dashboard/CRM/UserContext";


const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

const ExecutiveHorizontalNav = () => {

  const navStyle = useSelector(({settings}) => settings.navStyle);
  const {pathname} = useSelector(({common}) => common);

  const getNavStyleSubMenuClass = (navStyle) => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve";
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-inside-submenu-popup-curve";
      case NAV_STYLE_BELOW_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-below-submenu-popup-curve";
      case NAV_STYLE_ABOVE_HEADER:
        return "gx-menu-horizontal gx-submenu-popup-curve gx-above-submenu-popup-curve";
      default:
        return "gx-menu-horizontal";

    }
  };

  const selectedKeys = pathname.substr(1);
  const defaultOpenKeys = selectedKeys.split('/')[1];

  const msg2 = useContext(UserContext)
  return (

    <Menu
      defaultOpenKeys={[defaultOpenKeys]}
      selectedKeys={[selectedKeys]}
      mode="horizontal">



      {/* <SubMenu className={getNavStyleSubMenuClass(navStyle)} key="main" 
      //campaign{widgets(campaign details), metrics(user camp map), algolia(branch)}
               title={<IntlMessages id="sidebar.main"/>}>
      
        <Menu.Item key="main/widgets">        
          <Link to="/campaignadd"><i className="icon icon-widgets"/>
            <IntlMessages id="sidebar.widgets"/></Link>
        </Menu.Item>  

        <Menu.Item key="main/metrics">
          <Link to="/campaignmapping"><i className="icon icon-shuffle"/>
            <IntlMessages id="sidebar.metrics"/></Link>
        </Menu.Item>

        <Menu.Item key="main/algolia">
          <Link to="/branchadd"><i className="icon icon-all-contacts"/>
            <IntlMessages id="sidebar.algolia"/></Link>
        </Menu.Item>
      </SubMenu> */}



      {/* <SubMenu className={getNavStyleSubMenuClass(navStyle)} key="in-built-apps" 
      //user details {in-build-apps(users)}
               title={<IntlMessages id="sidebar.inBuiltApp"/>}>

        <Menu.Item key="in-built-apps/mail">
          <Link to="/useradd"><i className="icon icon-auth-screen"/><IntlMessages
            id="sidebar.mailApp"/></Link>
        </Menu.Item>
      </SubMenu> */}

      <SubMenu className={getNavStyleSubMenuClass(navStyle)} key="components"
      // monitor {general (call monitor), navigation(dashboard)}
               title={<IntlMessages id="sidebar.components"/>}>

        <Menu.Item key="general" >
        <Link to="/executiveMonitor"> <i className="icon icon-widgets"/> 
             <IntlMessages id="sidebar.components.general" /> 

        </Link>
        </Menu.Item>

        <Menu.Item key="navigation">
        <Link to="/executiveDashboard"> <i className="icon icon-data-display"/><IntlMessages
         id="sidebar.components.navigation"/></Link>
        </Menu.Item>
      </SubMenu>
 


      <SubMenu className={getNavStyleSubMenuClass(navStyle)} key="extraComponents"
      // reports {editor(incoming), picker(outgoing), dnd(detail report), sweet alarm(break), notification(login),timeline(disposition)  }
          title={<IntlMessages id="sidebar.extraComponents"/>}>

        <Menu.Item key="extra-components/editor/ck">
        <Link to="/executiveDailyReport">
            <i className="icon icon-amchart"/>

          <IntlMessages id="sidebar.editors"/>
          </Link>
        </Menu.Item>

        {/* <Menu.Item key="extra-components/color-picker">
          <Link to="/consolidateReport">
            <i className="icon icon-chart-area-new"/>

            <IntlMessages id="sidebar.pickers.colorPickers"/>

          </Link>
        </Menu.Item>

        <Menu.Item key="extra-components/dnd">
          <Link to="/monthlyReport">
            <i className="icon icon-drag-and-drop"/>

            <IntlMessages id="sidebar.extensions.dragNDrop"/>

          </Link>
        </Menu.Item>

        <Menu.Item key="extra-components/sweet-alert">
          <Link to="/domesticViolence">
            <i className="icon icon-sweet-alert"/>
            <IntlMessages id="sidebar.extensions.sweetAlert"/>
          </Link>
        </Menu.Item>

        <Menu.Item key="extra-components/notification">
          <Link to="/cdrReport"><i className="icon icon-notification"/>
            <IntlMessages
              id="sidebar.extensions.notification"/></Link>
        </Menu.Item>

        <Menu.Item key="time-line">
        <Link to="/userReport"><i className="icon icon-timeline"/>
            <IntlMessages
              id="sidebar.timeLine"/></Link>
        </Menu.Item> */}
      </SubMenu>




      {/* <SubMenu className={getNavStyleSubMenuClass(navStyle)} key="extensions"
      // settings
               title={<IntlMessages id="sidebar.extensions"/>}>

        <Menu.Item key="google">
        <Link to=""><i className="icon icon-all-contacts"/>
            <IntlMessages
              id="sidebar.google.map"/></Link>
        </Menu.Item>

        <Menu.Item key="google">
        <Link to="/pranklist"><i className="icon icon-all-contacts"/>
            <IntlMessages
              id="sidebar.google.blacklist"/></Link>
        </Menu.Item>

        {/* <Menu.Item key="google">
        <Link to="/followUp"><i className="icon icon-all-contacts"/>
            <IntlMessages
              id="sidebar.google.FollowUp"/></Link>
        </Menu.Item> 
      </SubMenu> */}



    </Menu>

  );
};

ExecutiveHorizontalNav.propTypes = {};

export default ExecutiveHorizontalNav;

