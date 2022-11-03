import React from 'react'
import './App.css'
import Splash from '../Splash/Splash'
import Quiz from '../Quiz/Quiz'
import { nanoid } from 'nanoid'

function App() {
  const [quizzer, setQuizzer] = React.useState({mechanics:{isSplash:true, isCompleted:false, isSubmitted:false},questions:[],results:{totalCorrect:0}})
  
  React.useEffect(()=>{
    
    getNewQuiz()

  },[])

  function convertString(string){
      return string.replace(/&(lt|gt|quot|#039|amp);/g, function (m, p) { 
        return (p == "lt") ? "<" : (p == "gt") ? ">" : (p == "#039") ? "'" : ((p == "amp") ? "&" : '"');
      });
    
  }

  function getNewQuiz(){
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data =>{
        let questionArr = data.results.map((ele)=>{
          let incorrectArr = ele.incorrect_answers.map((ans)=>{
            return {
              badID: nanoid(),
              answer:convertString(ans)
            }
          })

          return {
            questionID:nanoid(),
            question:convertString(ele.question),
            correctAnswer:{cid:nanoid(), answer:convertString(ele.correct_answer)},
            incorrectAnswers:incorrectArr,
            userChoice:''
          }
        }) 
        setQuizzer((prevQuizzer)=>{
          return {...prevQuizzer, questions:questionArr}
        })
      })
  }

  function handleClick(){
    setQuizzer((prevQuizzer)=>{
      return {...prevQuizzer, mechanics:{...prevQuizzer.mechanics, isSplash: !prevQuizzer.mechanics.isSplash}}
    })
  }

  function handleSubmit(event){
    event.preventDefault();
    console.log(`handle submit`)
    // setUser((prevUser)=>{
    //   return {...prevUser, submitted: !prevUser.submitted}
    // })
  }

  function handleNewQuiz(event){
    event.preventDefault();
    console.log(`handle new quiz`)
    // getNewQuiz();
    // setUser((prevUser)=>{
    //   return {...prevUser, submitted: !prevUser.submitted}
    // })
  }

  return (
    <div className="--app-app-container">
      {quizzer.mechanics.isSplash ? 
        <Splash toggle={handleClick}/> : 
        <Quiz 
          game={quizzer} 
          clickSubmit={handleSubmit}
          newQuiz={handleNewQuiz}
        />}
    </div>
      
  )
}

export default App
