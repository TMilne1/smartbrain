import React from 'react'

const Navigation=({onRouteChange, isSignedIn})=>{
    if(isSignedIn){
        return(
            <div>
                <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <p className='f3 link dim black underline pa3 pointer' onClick={()=>onRouteChange('signIn')}>SIGN OUT</p>
                </nav>
            </div>
        )
        
    }else{
        return(
        <div>
                <nav  style={{display: 'flex', justifyContent: 'flex-end'}}>
                    <p className='f3 link dim black underline pa3 pointer' onClick={()=>onRouteChange('Register')}>Register</p>
                    <p className='f3 link dim black underline pa3 pointer' onClick={()=>onRouteChange('signIn')}>Sign In</p>
                </nav>
        </div>
        )
    }
}

export default Navigation;