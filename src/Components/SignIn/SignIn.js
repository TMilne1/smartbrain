import React, { Component } from 'react'

class SignIn extends Component{
    constructor(props) {
        super(props);
        this.state = {
            SignInEmail: "",
            SignInPassword:""
        }
    }
    onEmailChange=(event)=>{this.setState({SignInEmail:event.target.value}) }

    onPasswordChange=(event)=>{this.setState({SignInPassword:event.target.value})}

    onSubmitSignIn = () => {
        fetch('http://localhost:3001/signin', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.SignInEmail,
                password: this.state.SignInPassword
            })
        })
            .then(resp => resp.json())
            .then(data => {
                if(data==='success'){
                    this.props.onRouteChange('home'); 
                    
                }
            })
        event.preventDefault()
      
    }
    
     render(){
       const { onRouteChange } = this.props;
        return(
            <div>
                <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5"> 
                     <main className="pa4 black-80">
                         <form className="measure">
                             <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                 <legend className="f1 fw6 ph0 mh0">Sign In</legend>
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
                                     autoComplete="current-password" 
                                     name="password"  
                                     id="password"
                                     onChange={this.onPasswordChange}    
                                     />
                                 </div>

                             </fieldset>
                            
                             <div className="center">
                                 <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib center" 
                                    onClick={this.onSubmitSignIn}  
                                    type="submit"
                                    value="Sign In"  
                                 />
                             </div>
                             <div className="lh-copy mt3 center">
                                <p href="#0"
                                    className="f6 link dim black db pointer"
                                    onClick={() => onRouteChange('register')}
                                >Register</p>                                                         
                             </div>
                         </form>
                     </main>
                </article>
                {console.log('end of signin')}
            </div>
        )
    }
}

export default SignIn; 