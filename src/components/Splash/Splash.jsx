import React from 'react'
import './Splash.css'

export default function Splash(props){
    return(
        <div className='--splash-splash-container'>
            <h1 className='--splash-title'>Quizzical</h1>
            <p className='--splash-description'>Take a random quiz to see how much you know</p>
            <button className='--splash-btn-start btn' onClick={props.toggle}>Start quiz</button>
        </div>
    )
}