import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm=({onInputChange, onButtonPress} )=>{
    return(
        <div>
            <p className='f3 center'>
                {'Faces will be detected in uploaded images'}
            </p>
            <div className='center'>
                <div className='pa4 br3 shadow-5 center weave'>
                    <input type='text' className='f4 pa2 w-70 center' onChange={onInputChange}></input>
                    <button 
                    className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                    onClick={onButtonPress}>{'Detect'}</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;