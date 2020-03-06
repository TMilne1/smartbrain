import React, { Component } from 'react'

class Register extends Component {
    constructor(){
        super();
        this.state={
            registerName:'',
            registerEmail:'',
            registerPassword:''
        }
    }

    onNameChange=(event)=>{this.setState({registerName:event.target.value})}
    onEmailChange=(event) => {this.setState({registerEmail:event.target.value}) }
    onPasswordChange=(event) => {this.setState({registerPassword:event.target.value}) }

    onSubmitRegister=()=>{
        fetch('http://localhost:3001/register', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.registerEmail,
                password: this.state.registerPassword,
                name: this.state.registerName
            })
        })
        .then(response => response.json())
        .then(user =>{
            console.log(user)
            if (user === 'That user is already registered'){
                this.props.onRouteChange('register');
            }else if (user === 'user not added'){
                this.props.onRouteChange('register');
            }else if(user){
                this.props.loadUser(user)
                this.props.onRouteChange('home'); 
            }

        })
        event.preventDefault()
    }

    
    render(){
        return (
            <div>
            <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
                <main className="pa4 black-80">
                    <form className="measure">
                        <fieldset id="register" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" 
                                htmlFor="name">Name</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"
                                autoComplete="name" 
                                id="name" 
                                onChange={this.onNameChange}
                                />
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                autoComplete="email"
                                name="email-address" 
                                id="email-address"
                                onChange={this.onEmailChange}
                                 />
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" 
                                name="password" 
                                autocomplet="password"
                                id="password" 
                                 onChange={this.onPasswordChange}   
                                />
                            </div>

                        </fieldset>
                        <div className="center">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib center"
                                type="submit"
                                value="Register"
                                onClick={this.onSubmitRegister}
                            />
                        </div>
                        <div className="lh-copy mt3 ">
                            {/* <a href="#0" className="f6 link dim black db">Register</a> */}

                        </div>
                    </form>
                </main>
            </article>

        </div>
        )
    }
    
}

export default Register; 