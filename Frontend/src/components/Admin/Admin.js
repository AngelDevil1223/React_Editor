import React, { Component  } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './Admin.css';

import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ReactDOMServer from "react-dom/server";

class Admin extends Component {

    constructor(props) {
        super(props);

        this.save = this.save.bind(this);
        this.state = {
            saveTemplate: "",
        };
    }

    componentWillMount() {
        const username = localStorage.getItem('username');
         if(username == "" || username != "Admin")
            window.location.href ="/";
    }
    logout() {
      localStorage.setItem("username","");
      window.location.href="./";
    }
    save() {
      var formdata = {};
      formdata.title = document.getElementById("modal_input").value;
      formdata.template = this.state.saveTemplate;
      axios.post("http://localhost:5000/ckeditor/api/template" , {formdata})
      .then(res=>{
        alert("Template save success!");
        this.setState({
          saveTemplate: "",
        })
        this.hidden();
        document.getElementById("modal_input").value = "";
      })
      .catch(err=>{
        alert("already template exist!");
      })
    }
    show() {
      document.getElementById("openModal-about").setAttribute("style","display:block;");
    }

    hidden() {
      document.getElementById("openModal-about").setAttribute("style","display:none;");
    }

    render() {
        return (
            <div className="Mainedit" id="App">
                <h2 className="headertext">----&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Welcome Admin!&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;----</h2>      
                <a className="saveb" onClick={this.show}>Save</a>
                <a className="saveb logout" onClick={this.logout}>LogOut</a>
                <div className="Editor">
                    <div className="Cus_ti">
                    </div>
                    <CKEditor
                        data={this.state.saveTemplate}
                        editor={ ClassicEditor }
                        onReady={ editor => {
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            this.setState({
                              saveTemplate: data,
                            })
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log("bluing" + 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                        id="Convert"
                    />
                </div>

                <div id="openModal-about" class="modalDialog">
                    <div>
                        <a onClick={this.hidden} title="Close" class="close">X</a>
                        <h2>Save Template</h2>
                        <p id="modal_label">Template Name:</p>
                        <input id="modal_input" placeholder="..."/>
                        <button className="modal_btn" onClick={()=>{this.save()}}> Save </button>
                    </div>
                </div>

            </div>
        );
    }
}

export default Admin;

