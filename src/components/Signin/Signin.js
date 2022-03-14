import React, { Component } from "react";
import "./Signin.css";

class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            signInEmail: "",
            signInPassword: ""
        });
    }

    onInputChange = (event) => {
        const value = event.target.value;
        const type = event.target.type;

        if ( type === "email" ) {
            this.setState({ signInEmail: value });
        } else if ( type === "password") {
            this.setState({ signInPassword: value })
        }        
    }

    onSubmitSignIn = () => {
        fetch("https://face-recognition-api12.herokuapp.com/signin", {
            method: "POST",
            headers: { "Content-Type" : "application/json" },
            body: JSON.stringify({
                email: this.state.signInEmail.toLocaleLowerCase(),
                password: this.state.signInPassword
            })
        })
        .then(res => res.json())
        .then(user => {    
            if (user.id) {
                this.props.loadUser(user);       
                this.props.onRouteChange("home");
            } 
        })
        .catch(err => {
            console.log(err);
        })        
    }

    render () {
        return (
            <article className="br3 ba bg-white dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">    
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                            className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" 
                            name="email-address" 
                            id="email-address"
                            value={this.state.signInEmail}
                            onChange={ this.onInputChange } />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                            className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" 
                            name="password" 
                            id="password"
                            value={this.state.signInPassword}
                            onChange={ this.onInputChange } />
                        </div>
                        </fieldset>
                        <div className="">
                            <input 
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Sign in"
                            onClick={this.onSubmitSignIn} />
                        </div>
                        <div className="lh-copy mt3">
                            <p 
                            onClick={() => this.props.onRouteChange("register")} className="f6 link dim black db pointer">Register</p>
                        </div>
                    </div>
                </main>
            </article>
            )
    }
}

export default Signin;