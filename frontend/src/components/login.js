import React, { Component } from 'react';
import axios from 'axios';
import '../App.css'

import Cookies from 'js-cookie'

class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangename = this.onChangename.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            password: '',
            err:""
        }
    }

    onChangename(e) {
        this.setState({
            name: e.target.value
        })
        console.log(this.state.name)
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        })
        console.log(this.state.password)
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            name: this.state.name,
            password:this.state.password,
        }

        //console.log(user);
        axios({
          method:"post",
          url:'http://localhost:5000/login',
          withCredentials :true,
          data:user
        })
            .then(res => {
                // let cookieObj = res;

                // alert(res.data);
                console.log(res.data);
                localStorage.setItem('userID', res.data);
                Cookies.set('login', res.data);

                window.location = '/courses';

            })
            .catch((err) => {
                // console.log(err.response.data.message);
                this.setState({ err: err.response.data.message})
                console.log(this.state.err)
            });
    }

    render(){
    return(
        <div className='form-container-login'>
        
            <form onSubmit={this.onSubmit} className='registerForm'>
                <div className="form-group">
                    <input type="text"
                        required
                        className="form-control"
                        placeholder='ddd'
                        value={this.state.name}
                        onChange={this.onChangename}
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className='form-label'>Name </label>
                </div>
                <div className="form-group">
                    <input type="password"
                        required
                        className="form-control"
                        placeholder='ddd'
                        value={this.state.password}
                        onChange={this.onChangePassword}
                    />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label className='form-label'>Password </label>
                </div>
                <div className='reg-log'>
                    <input type="submit" value="Log in" />
                    <a href='/register'>register</a>
                </div>
            </form>
            <div className={this.state.err != ''&&"error-section"}>
                {this.state.err!=''&&this.state.err}
            </div>
        </div>
    )}
}
const emailRegex = new RegExp("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")

function emailValid(email){
    return emailRegex.test(email)
}

function passwordEntered(password){
    return !(password.length === 0)
}

function passwordLongEnough(password) {
    return password.length >= 5
}

function nameValid(name){
    return name.length >= 1
}
function SignedIn() {
    return true;
}
export default Login
export{passwordEntered, passwordLongEnough, nameValid, SignedIn, emailValid}
