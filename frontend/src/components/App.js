import React from 'react';
import { BrowserRouter, Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Header from './Header.js'
import Register from './Register.js'
import Login from './Login.js'
import * as auth from '../utils/auth.js';
import ProtectedRoute from './ProtectedRoute';
import MyProfile from './MyProfile.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      currentUser:{
        name: '',
        about: '',
        avatar: '',
      },
      email: '',
      isPopupOpen: false,
      errorPopup: false
    }
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.handleTokenCheck = this.handleTokenCheck.bind(this);
  }
  componentDidMount() {
    this.handleTokenCheck();
  }

  handleLogin(e, email, password) {

    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          this.setState({
            loggedIn: true,
          }, () => {
            this.props.history.push('/');
          });
        } else {

          this.setState({
            isPopupOpen: true,
          })
        }

      })
      .catch(err => console.log(err));
  }

  handleRegister(e, email, password) {
    auth.register(email, password).then((res) => {
      if (res) {
        this.setState({
          isPopupOpen: true,
          errorPopup: false
        })
      } else {
        this.setState({
          isPopupOpen: true,
          errorPopup: true
        })
      }
    })
  }

  closePopup() {
    this.setState({
      isPopupOpen: false,
    })
  }

  handleTokenCheck() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      auth.getContent(jwt).then((res) => {
        if (res) {
          console.log(res)
          const userEmail = res.data.email;
          const name = res.data.name;
          const about = res.data.about;
          const avatar = res.data.avatar;
          this.setState({
            loggedIn: true,
            email: userEmail,
            currentUser:{
              name: name,
              about: about,
              avatar: avatar,
            }
            
          }, () => {
            this.props.history.push("/");
          });
        }
      });
    }
  }

  render() {
    return (

      <>
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={this.state.loggedIn} component={MyProfile} userEmail={this.state.email} user={this.state.currentUser}/>
          <Route path="/sign-up">
            <Register handleRegister={this.handleRegister} errorPopup={this.state.errorPopup} isPopupOpen={this.state.isPopupOpen} onPopupClose={this.closePopup} />
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={this.handleLogin} isPopupOpen={this.state.isPopupOpen} onPopupClose={this.closePopup} />
          </Route>
          <Route exact path="/">
            {this.state.loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

      </>
    );
  }
}

export default withRouter(App);