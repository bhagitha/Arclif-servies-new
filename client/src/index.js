import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import UserslistView from './component/view/userslistView'
import Userview from './component/view/userview'
import Plans from './component/view/plan/planlistview'
import Home from './component/home'
import Userdashboard from './component/view/UserDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import FilesList from './component/add/FilesList';
import PlanDashboard from './component/view/plan/planDashboard'
import Adonlistview from './component/view/adonservices/adonlistview'
import UploadFileComponent from './component/add/UploadFileComponent'
import FileuploadComponent from './component/add/FileuploadComponent'
import RegistereduserView from './component/view/RegistereduserView'
import Adstages from './component/add/adstages';
import Createuser from './component/add/Client/ClientProfile';
import Projectview from './component/add/Project/Projectview';
import AddProject from './component/add/Project/AddProject';
import Clientview from './component/view/Client/ClientlistView';
import Clientdashboard from './component/view/Client/ClientDashboard';
// import './styles.scss';

ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}

    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/userlist">
          <UserslistView />
          {/* <Userview /> */}
        </Route>
        <Route exact path='/plans'>
          <Plans />
        </Route>
        <Route exact path='/userdashboard/:id'>
          <Userdashboard />
        </Route>
        <Route exact path='/list'>
          <FilesList />
        </Route>
        <Route exact path='/plandashboard/:id'>
          <PlanDashboard />
        </Route>
        <Route exact path='/adonservices'>
          <Adonlistview />
        </Route>
        <Route exact path='/uploadfile/:id'>
          <FileuploadComponent />
        </Route>
        <Route exact path='/registereduser'>
          <RegistereduserView />
        </Route>
        <Route exact path='/stages/:id'>
          <Adstages />
        </Route>
        <Route exact path='/createuser'>
          <Createuser />
        </Route>
        <Route exact path='/viewofflineuser'>
          <Clientview />
        </Route>
        <Route exact path='/clientdashboard/:id'>
          <Clientdashboard />
        </Route>
        <Route exact path='/project'>
          <Projectview />
        </Route>
        <Route exact path ='/createproject'>
          <AddProject/>
        </Route>

      </Switch>
    </BrowserRouter>


  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
