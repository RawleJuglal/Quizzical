import React from 'react'
import './Quiz.css'
import Question from '../Question/Question'

export default function Quiz(props){
    const questionList = props.data.map((ele)=>{
        return <Question key={ele.id} data={ele} />
    })
    return(
        <div className='--quiz-form-container'>
            <form onSubmit={!props.submitted ? props.clickSubmit : props.newQuiz}>
                {questionList}
                {props.submitted ? <button>Take New Quiz</button> : <button type="submit">Submit</button>}
            </form>
        </div>
    )
}