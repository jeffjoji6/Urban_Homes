import React, { Component ,useEffect} from 'react';
import { createBrowserHistory } from "history";
import routes from "./routes";
import Footer from './components/Footer';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import ContactUs from './components/pages/ContactUs';
import Login from './components/pages/Login';
import Admin from './components/pages/Admin/AdminLogin';
import SignUp from './components/pages/SignUp';
import Community from './components/pages/Community';
import Profile from './components/pages/Profile';
import Post from './components/pages/Post';
import Porfolio from './components/pages/Portfolio';
import Details_portfolio from './components/pages/Details_portfolio';
import Message from './components/pages/Mesaage';
import UserProfile from './components/pages/UserProfile/Messages';
import UserProfile_post from './components/pages/UserProfile/Post';
import UserProfile_profile from './components/pages/UserProfile/Profile';
import UserProfile_notification from './components/pages/UserProfile/Notification';
import UserProfile_wishlist from './components/pages/UserProfile/Wishlist';
import FindBuilder from './components/pages/FindProfessionals/Builder';
import FindSupplier from './components/pages/FindProfessionals/Supplier';
import FindDesigner from './components/pages/FindProfessionals/Designer';
import BuilderProfile from './components/pages/BuilderProfile/Messages';
import BuilderProfile_portfolio from './components/pages/BuilderProfile/Portfolio';
import BuilderProfile_wishlist from './components/pages/BuilderProfile/Wishlist';
import BuilderProfile_profile from './components/pages/BuilderProfile/Profile';
import BuilderProfile_notification from './components/pages/BuilderProfile/Notification';
import SupplierProfile from './components/pages/SupplierProfile/Messages';
import SupplierProfile_portfolio from './components/pages/SupplierProfile/Portfolio';
import SupplierProfile_wishlist from './components/pages/SupplierProfile/Wishlist';
import SupplierProfile_profile from './components/pages/SupplierProfile/Profile';
import SupplierProfile_notification from './components/pages/SupplierProfile/Notification';
import DesignerProfile from './components/pages/DesignerProfile/Messages';
import DesignerProfile_portfolio from './components/pages/DesignerProfile/Portfolio';
import DesignerProfile_wishlist from './components/pages/DesignerProfile/Wishlist';
import DesignerProfile_profile from './components/pages/DesignerProfile/Profile';
import DesignerProfile_notification from './components/pages/DesignerProfile/Notification';

function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}


function App() {
  return (
    <Router 
    basename={process.env.REACT_APP_BASENAME || ""}
    history={browserHistory}>
      <ScrollToTop />
      {/* <Switch>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={(props) => {
                    return (
                      <route.layout {...props}>
                        <route.component {...props} />
                      </route.layout>
                    );
                  }}
                />
              );
            })}
          </Switch> */}
      <Switch>
        <Route path='/sign-up' component={SignUp} />
        <Route path='/log-in' component={Login} />
        <Route path='/admin' component={Admin} />
      
        <Route>
          
          {/* {window.location.pathname !== '/sign-up' && window.location.pathname !== '/log-in' && <Navbar />} */}

          <Switch>
            <Route path='/' exact component={Home} />
            <Route path='/UserProfile/messages' component={UserProfile} />
            <Route path='/UserProfile/profile' component={UserProfile_profile} />
            <Route path='/UserProfile/notification' component={UserProfile_notification} />
            <Route path='/UserProfile/posts' component={UserProfile_post} />
            <Route path='/UserProfile/wishlist' component={UserProfile_wishlist} />
            <Route path='/FindProfessionals/Builder' component={FindBuilder} />
            <Route path='/FindProfessionals/Supplier' component={FindSupplier} />
            <Route path='/FindProfessionals/Designer' component={FindDesigner} />
            <Route path='/BuilderProfile/messages' component={BuilderProfile} />
            <Route path='/BuilderProfile/portfolio' component={BuilderProfile_portfolio} />
            <Route path='/BuilderProfile/wishlist' component={BuilderProfile_wishlist} />
            <Route path='/BuilderProfile/profile' component={BuilderProfile_profile} />
            <Route path='/BuilderProfile/notification' component={BuilderProfile_notification} />
            <Route path='/SupplierProfile/messages' component={SupplierProfile} />
            <Route path='/SupplierProfile/portfolio' component={SupplierProfile_portfolio} />
            <Route path='/SupplierProfile/wishlist' component={SupplierProfile_wishlist} />
            <Route path='/SupplierProfile/notification' component={SupplierProfile_notification} />
            <Route path='/SupplierProfile/profile' component={SupplierProfile_profile} />
            <Route path='/DesignerProfile/messages' component={DesignerProfile} />
            <Route path='/DesignerProfile/portfolio' component={DesignerProfile_portfolio} />
            <Route path='/DesignerProfile/wishlist' component={DesignerProfile_wishlist} />
            <Route path='/DesignerProfile/profile' component={DesignerProfile_profile} />
            <Route path='/DesignerProfile/notification' component={DesignerProfile_notification} />
            <Route path='/profile' component={Profile} />
            <Route path='/post' component={Post} />
            <Route path='/portfolio' component={Porfolio} />
            <Route path='/message' component={Message} />
            <Route path='/portfolio_details' component={Details_portfolio} />
            <Route path='/Community' component={Community} />
            <Route path='/about-us' component={Services} />
            <Route path='/products' component={Products} />
            <Route path='/contact-us' component={ContactUs} />
            
          </Switch>
            
          <Footer />
        </Route>

      </Switch>
    </Router>
  );
}

export default App;

const browserHistory = createBrowserHistory();