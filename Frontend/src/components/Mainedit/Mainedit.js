import React, { Component  } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import './Mainedit.css';

import axios from 'axios';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import ReactDOMServer from "react-dom/server";

class Mainedit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            "currentuser":"",
            "currentTemplate": "",
            "Template1": "<p>&nbsp;</p><h2>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; This is Template1</h2><h4>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; For Mr. Steven . 2022.3.6</h4><h4><br><strong>================================================================================================================================</strong></h4><p>&nbsp;</p><p>Welcome Everybody!<br>This is a bit complex and difficult , But It will not be challenge when you try.</p><p>&nbsp;</p>",
            "Template2": "<h2>&nbsp;This is Template2</h2><p>&nbsp;</p><h4>If you try , then the result must come.<br><br>&nbsp;</h4><figure ><table><tbody><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr><tr><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td><td>&nbsp;</td></tr></tbody></table></figure><p>&nbsp;</p><ol><li><strong>&nbsp;The plan1</strong></li><li>&nbsp;<strong>The plan2</strong></li></ol><p>I want to fly<br>&nbsp;</p>"
        };

        this.onChangeTemplate = this.onChangeTemplate.bind(this);
        this.Convert = this.Convert.bind(this);
    }

    componentWillMount() {
        const username = localStorage.getItem('username');
        


        this.setState({
            currentuser: username,
        }) 
        if(username == "")
            window.location.href ="/";
        axios.get("http://localhost:5000/ckeditor/api/templates")
            .then(res=>{
                var select = document.getElementById("temp_select");
                select.innerHTML = "<option style=\"font-size: 16px; color: gray; +\" >...</option>";
                console.log(res.data.length + " dsofjaoidfjasdifjsadifjsadoifj");
                for(var i = 0 ; i < res.data.length ; i++)
                {
                    console.log("result data" + res.data[i].title);
                    select.innerHTML += "<option style=\"font-size: 20px; font-family:arial; padding:20px; background-color: white; color: blue; text-shadow:3px 3px 3px #aaaaaa; padding-left: 20px;+\" value="+res.data[i].title+" >"+res.data[i].title+"</option>";
                }
            })
            .catch(err=>{
                console.log(err);
            })
    }

    logout() {
        localStorage.setItem("username","");
        window.location.href="/";
    }
    Convert() {
        const report = new JsPDF('portrait','pt','a4');
        report.html(document.querySelector('.ck-blurred')).then(() => {
            report.save('report.pdf');
        });
    }

    onChangeTemplate(flag) {
        var id = flag.target.value;
        axios.get("http://localhost:5000/ckeditor/api/template/"+id)
        .then(res=>{
            this.setState({
                currentTemplate:res.data.content,
            })
        })
        .catch(err=>{

        })
    }

    render() {
        return (
            <div className="Mainedit" id="App">
                <h2 className="headertext"></h2>
                <div className="dropdown" id="dropdown">
                  <button className="dropbtn">Select Template</button>
                  <select onChange={(e)=>{this.onChangeTemplate(e)}} className="dropdown-content" id="temp_select">
        
                  </select>
                </div>
                <a className="savebtn" onClick={()=>{this.Convert()}}>To->pdF</a>
                <a className="saveb logout" onClick={this.logout}>LogOut</a>
                <div className="Editor">
                    <div className="Cus_ti">
                    </div>
                    <CKEditor
                        editor={ ClassicEditor }
                        data={this.state.currentTemplate}
                        onReady={ editor => {
                            console.log( 'Editor is ready to use!', editor );
                        } }
                        onChange={ ( event, editor ) => {
                            const data = editor.getData();
                            console.log( { event, editor, data } );
                        } }
                        onBlur={ ( event, editor ) => {
                            console.log( 'Blur.', editor );
                        } }
                        onFocus={ ( event, editor ) => {
                            console.log( 'Focus.', editor );
                        } }
                        id="Convert"
                    />
                </div>
            </div>
        );
    }
}

export default Mainedit;

