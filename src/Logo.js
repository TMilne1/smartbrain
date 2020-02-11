import React from 'react';
import Tilt from 'react-tilt'
import './logo.css'
import brain from './brain.png'

const Logo=()=>{
    return (
        <div>
            <Tilt className="Tilt br-2 shadow-2" options={{ max: 75 }} style={{ height: 150, width: 150 }}  >
                <div className="Tilt-inner pa3"> 
                    <img className='pt2' alt='brain' src={brain}/> 
                </div>
            </Tilt>
        </div>
    )
}
export default Logo;