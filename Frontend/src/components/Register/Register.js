import React, { Component } from 'react';
import "./Register.css";
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { withRouter } from 'react-router-dom';

class Register extends Component {
  constructor (props) {
      super(props);
      this.state = {
          user_id: "",
          err: "",        
      };
  }

  register() {
    var username = document.getElementById("re_username").value;
    var userpass = document.getElementById("re_userpass").value;
    if(username == "" || userpass == "") {
      alert("All field are required!");
      return;
    }
    else {
      var formdata = {};
      formdata.username = username;
      formdata.userpass = userpass;
      axios.post("http://localhost:5000/ckeditor/api/register", {formdata})
      .then(res=>{
        alert("Register success!");
        window.location.href = "/";
      })
      .catch(err=>{
        alert("You registered already!");
      });
    }

  }

  render() {
    return (
      <div className="Form">
        <div className="Register_header">
          <h1>Register</h1>
        </div>
        <div className="login_section">
          <label> Username: </label>
          <input type="text" placeholder="..." id="re_username" />
        </div>
        <div className="login_section">
          <label> Password: </label>
          <input type="text" placeholder="..." type="password" id="re_userpass" />
        </div>
        <div className="login_section login_footer">
          <button className="register_btn" onClick={this.register}>Register</button>
          <p className="login_link" onClick={()=> window.location.href='/'}>Login</p>
        </div>    
      </div>
    );
  }
}

export default Register;