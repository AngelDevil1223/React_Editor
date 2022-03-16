import React, { Component } from 'react';
import "./Login.css";
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            user_id: "",
            err: "",        
        };
    }

    componentWillMount() {
      localStorage.setItem("username" , "");
    }

    Login() {
      var username = document.getElementById("username").value;
      var userpass = document.getElementById("userpass").value;
      if( username == "" || userpass == "") {
        alert("All field are required!");
        return;
      }
      else {
        var formdata = {};
        formdata.username = username;
        formdata.userpass = userpass;
        axios.post("http://localhost:5000/ckeditor/api/login", {formdata})
        .then(res=>{
          localStorage.setItem("username", res.data.id);
          if(res.data.id == "Admin") {
            window.location.href="./Admin";
          }
          else {
            window.location.href="./CKeditor";
          }
        })
        .catch(err=>{
          alert("Incorrect name or password!");
        })
      }
    }

  render() {
    return (
      <div className="Form">
        <div className="header">
          <h1>Login</h1>
        </div>
        <div className="login_section">
          <label> Username: </label>
          <input type="text" placeholder="..." id="username" />
        </div>
        <div className="login_section">
          <label> Password: </label>
          <input type="text" placeholder="..." type="password" id="userpass" />
        </div>
        <div className="login_section login_footer">
          <button className="login_btn" onClick={this.Login}>Login</button>
          <p className="login_link" onClick={()=> window.location.href='/Register'} >Register</p>
        </div>    
      </div>
    );
  }
}

export default Login;