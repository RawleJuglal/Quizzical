import React from 'react'
import './Question.css'

export default function Question(props){
    

    function convertString(string){
        return string.replace(/&(lt|gt|quot|#039|amp);/g, function (m, p) { 
          return (p == "lt") ? "<" : (p == "gt") ? ">" : (p == "#039") ? "'" : ((p == "amp") ? "&" : '"');
        });
      
    }

    return(
        <div className='--question-container'>
            <p className='--question-question'>My Question will go here?</p> 

            <div className='--question-choices-container'>
                <button>My Choices #1</button>
                <button>My Choices #1</button>
                <button>My Choices #1</button>
                <button>My Choices #1</button>
            </div>
        </div>
    ) 
}

// category
// : 
// "Art"
// correct_answer
// : 
// "Andy Warhol"
// difficulty
// : 
// "medium"
// id
// : 
// "g_3AwkJyEfE8RWkaQ5qVg"
// incorrect_answers
// : 
// (3) ['Roy Lichtenstein', 'David Hockney', 'Peter Blake']
// question
// : 
// "Which artist&rsquo;s studio was known as &#039;The Factory&#039;?"
// type
// : 
// "multiple"