import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./store";
import { Provider, connect } from "react-redux";
import Signup from "./components/Signup";
import { Container } from "react-bootstrap";
import { AuthProvider } from "./contexts/authContext";
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import  Dashboard  from './components/Dashboard';
import Login from './components/Login';

import PrivateRoute from './components/PriveRoute';
import ForgotPassword from './components/ForgotPassword';
import UpdateProfile from './components/UpdateProfile';

const App = () =>  {
    return (
      <Provider store={store}>
        <>
          <Container
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="w-100" style={{ maxWidth: "400px" }}>

            <Router>
              <AuthProvider>
                 <Switch>
                     <PrivateRoute exact path="/" component={Dashboard}/>
                     <PrivateRoute exact path="/update-profile" component={UpdateProfile}/>
                     <Route path="/signup" component={Signup} />
                     <Route path="/login" component={Login} />
                     <Route path="/forgot-password" component={ForgotPassword} />
                 </Switch>
              </AuthProvider>
            </Router>
            </div>
          </Container>
        </>
      </Provider>
    );
}

export default App;
