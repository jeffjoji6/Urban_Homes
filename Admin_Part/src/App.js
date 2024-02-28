import React, { Component } from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch,Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import routes from "./routes";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  isAuthenticated() {
    const token = localStorage.getItem("token");
    return token !== null; // Assuming token presence means authentication
  }

  render() {
    return (
      <div>
        <ToastContainer/>
        <Router
          basename={process.env.REACT_APP_BASENAME || ""}
          history={browserHistory}
        >
          <Switch>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={(props) => {
                  // Skip authentication check for /admin route
                  if (route.path === '/' || this.isAuthenticated()) {
                    return (
                      <route.layout {...props}>
                        <route.component {...props} />
                      </route.layout>
                    );
                  } else {
                    // Redirect to login if not authenticated
                    return <Redirect to="/" />;
                  }
                }}
              />
            );
          })}
        </Switch>
          
        </Router>
      </div>
    );
  }
}

export default App;

const browserHistory = createBrowserHistory();
