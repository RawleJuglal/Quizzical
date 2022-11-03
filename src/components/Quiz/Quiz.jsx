import React from 'react'
import './Quiz.css'
import Question from '../Question/Question'

export default function Quiz(props){
    return(
        <div className='--quiz-form-container'>
            <form onSubmit={!props.game.mechanics.isSubmitted ? props.clickSubmit : props.newQuiz}>
                
                {props.game.mechanics.isSubmitted ? <button>Take New Quiz</button> : <button type="submit">Submit</button>}
            </form>
        </div>
    )
}