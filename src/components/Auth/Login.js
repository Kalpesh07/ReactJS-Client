import React, { Component } from 'react';
import {  Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userActions } from '../../actions';
 
class Login extends Component {
  constructor(props) {
    super(props);
    this.props.logout();
    this.state = {
      username: '',
      password: '',
      submitted: false
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submitLogin = this.submitLogin.bind(this);
    
  }
 
  handleInputChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({
      [name]: value
    });
  }
 
  submitLogin(e) {
    e.preventDefault();
    this.setState({ submitted: true });
    const { username, password } = this.state;
    if (username && password) {
      this.props.login(username, password);
    }
  }
 
  render(){
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;
    return(
        <div className="c-app flex-row align-items-center">
        <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-8">
                    <div className="card-group">
                      <div className="card p-4">
                        <div className="card-body">
                          <h1>Login</h1>
                          <p className="text-muted">Sign In to your account</p>
                          <div className="input-group mb-3">
                            <div className="input-group-prepend"><span className="input-group-text">
                                <svg className="c-icon">
                                  <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-user" />
                                </svg></span></div>
                            <input name="username" className="form-control" type="text" placeholder="Username" value={this.state.username} onChange={this.handleInputChange} />
                            {submitted && !username && <div className="help-block">Username is required</div> }
                          </div>
                          <div className="input-group mb-4">
                            <div className="input-group-prepend"><span className="input-group-text">
                                <svg className="c-icon">
                                  <use xlinkHref="vendors/@coreui/icons/svg/free.svg#cil-lock-locked" />
                                </svg></span></div>
                            <input name="password" className="form-control" type="password" placeholder="Password" value={this.state.password} onChange={this.handleInputChange} />
                            {submitted && !username && !password && <div className="help-block">Password is required</div> }
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <button className="btn btn-primary px-4" type="button" onClick={this.submitLogin}>Login</button>
                       
                            </div>
                            <div className="col-6 text-right">
                              <button className="btn btn-link px-0" type="button">Forgot password?</button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
                        <div className="card-body text-center">
                          <div>
                            <h2>Sign up</h2>
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                            {/* <button className="btn btn-lg btn-outline-light mt-3" type="button">Register Now!</button> */}
                            <Link to="/register" className="btn btn-lg btn-outline-light mt-3" type="button">Register Now!</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
    
    )
  }
}
function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}
 
const actionCreators = {
  login: userActions.login,
  logout: userActions.logout
};
 
const connectedLoginPage = connect(mapState, actionCreators)(Login);
export { connectedLoginPage as Login };
