import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import URLSearchParams from 'url-search-params'
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch } from "react-router-dom";
import { ConfigProvider } from 'antd';
import { IntlProvider } from "react-intl";

import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import SignIn from "../SignIn";
import SignUp from "../SignUp";
import { setInitUrl } from "appRedux/actions/Auth";
import { onLayoutTypeChange, onNavStyleChange, setThemeType } from "appRedux/actions/Setting";

import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  THEME_TYPE_DARK
} from "../../constants/ThemeSetting";
import AgentPage from "../../routes/SamplePage/Agent";
import Monitor from "../../routes/SamplePage/Monitor";
import Admin from "../../routes/SamplePage/Admin";
import UserAdd from "../../components/dashboard/CRM/UserAdd";
import CampaignAdd from "../../components/dashboard/CRM/CampaignAdd";
import CampaignMapping from "../../components/dashboard/CRM/CampaignMapping";
import DailyReport from "../../components/dashboard/CRM/DailyReport";
import { Beforeunload } from 'react-beforeunload';
import UserApi from "components/dashboard/CRM/UserApi";
import ConsolidateReports from "../../components/dashboard/CRM/ConsolidateReport";
import MonthlyReport from "../../components/dashboard/CRM/MonthlyReport";
import DomesticViolence from "../../components/dashboard/CRM/DomesticViolence";
import BranchAdd from "../../components/dashboard/CRM/BranchAdd";
import Dashboard from "../../components/dashboard/CRM/Dashborad";
import CDRReport from "../../components/dashboard/CRM/CDRReport";
import UserReport from "../../components/dashboard/CRM/UserReport";
import FollowUp from "../../components/dashboard/CRM/FollowUp";
import PrankBlock from "../../components/dashboard/CRM/PrankBlock";
import ExecutiveAdmin from "../../routes/SamplePage/ExecutiveAdmin";
import ExecutiveCallMonitor from "../../components/dashboard/CRM/ExecutiveCallMonitor";
import SeniorCitizenReport from "../../components/dashboard/CRM/SeniorCitizenReport";
import TestMail from "../../components/dashboard/CRM/Testmailpage";
import ComposeMail from "../../components/mail/Compose";
import ExecutiveDashboard from "../../components/dashboard/CRM/ExecutiveDashboard";
import ExecutiveDailyReport from "../../components/dashboard/CRM/ExecutiveDailyReport";
import TestMsgPage from "../../components/dashboard/CRM/TestMsgPage";
import ChatPage from "../../components/dashboard/CRM/ChatPage";
import MailDetail from "../../components/mail/MailDetail";
import MailListItem from "../../components/mail/MailList/MailListItem";
import EditableTable from "../../components/dashboard/CRM/Editablecell";
import Demotest from "../../components/dashboard/CRM/demo";
import MailLog from "../../components/mail/MailLog";
import QueueMapping from "../../components/dashboard/CRM/QueueMapping";
import DemoPage from "../../components/dashboard/CRM/demopage";
import Demodatatables from "../../components/dashboard/CRM/demodatatable";
import AbandonedListDash from "../../components/dashboard/CRM/AbandonedListDash";
import TotalCallReportList from "../../components/dashboard/CRM/TotalCallReportList";
import RingingStatusReport from "../../components/dashboard/CRM/RingingStatusReport";
import SlaReport from "../../components/dashboard/CRM/SlaReport";
import EmailSmsReport from "../../components/dashboard/CRM/EmailSmsReport";
import IvrFullReport from "../../components/dashboard/CRM/IvrFullReport";
import { ProctedRoute } from "./ProtectedRoute";
import UserEdit from "../../components/dashboard/CRM/UserEdit";
import CampaignEdit from "../../components/dashboard/CRM/CampaignEdit";
import DialerMonitor from "../../components/dashboard/CRM/DialerMonitor";
import DialerReport from "../../components/dashboard/CRM/DialerReport";
import WarRoomReport from "../../components/dashboard/CRM/WarRoomReport";
import DialerIncomingDispo from "../../components/dashboard/CRM/DialerIncomingDispo";
import  POCtest from "../../components/dashboard/CRM/POCtest";


const RestrictedRoute = ({ component: Component, location, authUser, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      authUser
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/signin',
            state: { from: location }
          }}
        />}
  />;


const App = (props) => {

  const dispatch = useDispatch();
  const { locale, themeType, navStyle, layoutType, themeColor } = useSelector(({ settings }) => settings);
  const { authUser, initURL } = useSelector(({ auth }) => auth);

  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  useEffect(() => {
    let link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = `/css/${themeColor}.css`;  //This line is changed, this comment is for explaination purpose.

    link.className = 'gx-style';
    document.body.appendChild(link);
  }, []);


  useEffect(() => {
    if (initURL === '') {
      dispatch(setInitUrl(location.pathname));
    }
    const params = new URLSearchParams(location.search);

    if (params.has("theme")) {
      dispatch(setThemeType(params.get('theme')));
    }
    if (params.has("nav-style")) {
      dispatch(onNavStyleChange(params.get('nav-style')));
    }
    if (params.has("layout-type")) {
      dispatch(onLayoutTypeChange(params.get('layout-type')));
    }
    setLayoutType(LAYOUT_TYPE_BOXED);
    setNavStyle(navStyle);
  });


  const setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('full-layout');
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove('full-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('boxed-layout');
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('full-layout');
      document.body.classList.add('framed-layout');
    }
  };

  const setNavStyle = (navStyle) => {
    if (navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
      navStyle === NAV_STYLE_DARK_HORIZONTAL ||
      navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
      navStyle === NAV_STYLE_ABOVE_HEADER ||
      navStyle === NAV_STYLE_BELOW_HEADER) {
      document.body.classList.add('full-scroll');
      document.body.classList.add('horizontal-layout');
    } else {
      document.body.classList.remove('full-scroll');
      document.body.classList.remove('horizontal-layout');
    }
  };

  useEffect(() => {
    if (location.pathname === '/') {
      if (authUser === null) {
        history.push('/signin');
      } else if (initURL === '' || initURL === '/' || initURL === '/signin') {
        history.push('/agent');
      } else {
        history.push(initURL);
      }
    }
  }, [authUser, initURL, location, history]);

  useEffect(() => {
    if (themeType === THEME_TYPE_DARK) {
      document.body.classList.add('dark-theme');
      document.body.classList.add('dark-theme');
      let link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = "/css/dark_theme.css";
      link.className = 'style_dark_theme';
      document.body.appendChild(link);
    }
  }
    , []);

  const currentAppLocale = AppLocale[locale.locale];

  function logoutme() {
    var data = {
      userextension: localStorage.getItem("extn")
    }

    UserApi.logout(data)
      .subscribe(response => {

      })

  }

  return (
    <ConfigProvider locale={currentAppLocale.antd}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}>

        <Beforeunload onBeforeunload={() => "leave site"} >

          <Switch>
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            <ProctedRoute exact path='/agent' component={AgentPage} />
            <ProctedRoute exact path='/monitor' component={Monitor} />
            <Route exact path='/dashboard' component={Dashboard} />
            <ProctedRoute exact path='/admin' component={Admin} />
            <Route exact path='/useradd' component={UserAdd} />
            <Route exact path='/userEdit' component={UserEdit} />
            <Route exact path='/branchadd' component={BranchAdd} />
            <Route exact path='/campaignadd' component={CampaignAdd} />
            <Route exact path='/campaignEdit' component={CampaignEdit} />
            <Route exact path='/campaignmapping' component={CampaignMapping} />
            <Route exact path='/dailyReport' component={DailyReport} />
            <Route exact path='/cdrReport' component={CDRReport} />
            <Route exact path='/consolidateReport' component={ConsolidateReports} />
            <Route exact path='/monthlyReport' component={MonthlyReport} />
            <Route exact path='/userReport' component={UserReport} />
            <Route exact path='/seniorCitizenReport' component={SeniorCitizenReport} />
            <Route exact path='/domesticViolence' component={DomesticViolence} />
            <Route exact path='/followUp' component={FollowUp} />
            <Route exact path='/pranklist' component={PrankBlock} />
            <Route exact path='/executiveAdmin' component={ExecutiveAdmin} />
            <Route exact path='/executiveMonitor' component={ExecutiveCallMonitor} />
            <Route exact path='/executiveDashboard' component={ExecutiveDashboard} />
            <Route exact path='/executiveDailyReport' component={ExecutiveDailyReport} />

            <Route exact path='/agentMailPage' component={TestMail} />
            <Route exact path='/agentMailListPage' component={MailListItem} />
            <Route exact path='/composeMail' component={ComposeMail} />
            <Route exact path='/mailLog' component={MailLog} />

            <Route exact path='/agentMessagePage' component={TestMsgPage} />
            <Route exact path='/chatPage' component={ChatPage} />
            <Route exact path='/queueMapping' component={QueueMapping} />
            <Route exact path='/totalCallReport' component={TotalCallReportList} />
            <Route exact path='/ringStatusReport' component={RingingStatusReport} />
            <Route exact path='/slaReport' component={SlaReport} />
            <Route exact path='/emailSmsReport' component={EmailSmsReport} />
            <Route exact path='/demojs' component={Demotest} />
            <Route exact path='/demopage' component={DemoPage} />
            <Route exact path='/advdemopage' component={Demodatatables} />
            <Route exact path='/irvReport' component={IvrFullReport} />
            <Route exact path='/dialermonitor' component={DialerMonitor} />
            <Route exact path='/dialerreport' component={DialerReport} />
            <Route exact path='/WarRoomReport' component={WarRoomReport} />
            <Route exact path='/dialerincom' component={DialerIncomingDispo} />
            <Route exact path='/POCtest' component={POCtest} />
            
            {/* <Route exact path='/editablecell' component={EditableTable}/> */}
            {/* <Route exact path='/mailDetail' component={MailDetail}/> */}
            <RestrictedRoute path={`${match.url}`} authUser={authUser} location={location}
              component={MainApp} />

          </Switch>
        </Beforeunload>

      </IntlProvider>
    </ConfigProvider>


    //   <Router>
    //   <Route path="/agent" component={Agent}/>

    // </Router>
  )
};

export default memo(App);
