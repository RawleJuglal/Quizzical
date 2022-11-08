import React from 'react'
import './Quiz.css'
import Question from '../Question/Question'

export default function Quiz(props){
    const questionList = props.game.questions.map((ele)=>{
        return <Question key={ele.questionID} mechanics={props.game.mechanics} question={ele} toggleSelection={props.clickBtn}/>
    })

    return(
        <div className='--quiz-form-container'>
            <form className='--quiz-form' onSubmit={!props.game.mechanics.isSubmitted ? props.clickSubmit : props.newQuiz}>
                {questionList}
                <div className='--quiz-form-results'>
                    {props.game.mechanics.isCompleted && <p>You scored {props.game.results.totalCorrect}/5 correct answers</p>}
                    {props.game.mechanics.isSubmitted ? <button className='--quiz-submit btn'>Take New Quiz</button> : <button className='--quiz-submit btn' onClick={props.clickSubmit} type="submit">Submit</button>}
                </div>
                
            </form>
        </div>
    )
}