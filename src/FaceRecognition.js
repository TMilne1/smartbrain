import React from 'react'

const FaceRecognition=({InputImage})=>{

    return(
        <div className='center ma' >
            <div className='absolute mt2'>
                <img alt='' src={InputImage} width='500px' height='auto'/>
            </div>
        </div>
    )
}
export default FaceRecognition;