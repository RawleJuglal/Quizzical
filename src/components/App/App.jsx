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
              answer:convertString(ans),
              isSelected:false
            }
          })
          let correctObject = {cid:nanoid(), answer:convertString(ele.correct_answer), isSelected:false}
          let allAnswersArr = [...incorrectArr]
          allAnswersArr.splice(Math.floor(Math.random()*4),0,correctObject)


          return {
            questionID:nanoid(),
            question:convertString(ele.question),
            // correctAnswer:correctObject,
            // incorrectAnswers:incorrectArr,
            userChoice:false,
            allAnswers:allAnswersArr
          }
        }) 
        setQuizzer((prevQuizzer)=>{
          return {...prevQuizzer, questions:questionArr}
        })
      })
  }

  function handleSplashClick(){
    setQuizzer((prevQuizzer)=>{
      return {...prevQuizzer, mechanics:{...prevQuizzer.mechanics, isSplash: !prevQuizzer.mechanics.isSplash}}
    })
  }

  function handleBtnClick(event, clickID){
    event.preventDefault();
    // console.log(`handle button click`)

    //find the questionID index
    let holdQuestion = quizzer.questions.findIndex((val)=>{
      return val.questionID == event.target.name
    })
    let items = [...quizzer.questions]
    let item = {...quizzer.questions[holdQuestion]}
    let allAnswersItem = [...quizzer.questions[holdQuestion].allAnswers]
    let ite = allAnswersItem.map((ele)=>{
      return ele.badID == clickID || ele.cid == clickID ? {...ele, isSelected:true} : {...ele, isSelected:false}
    })
    item.allAnswers = ite;
    item.userChoice = true;
    items[holdQuestion] = item;
    setQuizzer((prevQuizzer)=>{
      return {...prevQuizzer, questions:items}
    }) 
  }

  function handleSubmit(event){
    event.preventDefault();
    console.log(`handle submit`)
      if(checkForCompletion()){
        console.log(`completion was true`)
        setQuizzer((prevQuizzer)=>{
          let mechObj = {...prevQuizzer, isCompleted:true, isSubmitted:true}
          return {...prevQuizzer, mechanics:mechObj}
        })
      } else {
        console.log(`finished completion it was false`)
      }   
    // console.log(quizzer)
    // quizzer.mechanics.isCompleted ? 
    //   setQuizzer((prevQuizzer)=>{
    //     return {...prevQuizzer, mechanics:{...prevQuizzer.mechanics, isSubmitted: !prevQuizzer.mechanics.isSubmitted}}
    //   }) : console.log('can not submit')
  }    

  function checkForCompletion(){
    console.log('check completion')
    if(quizzer.questions.every(o => o.userChoice == true)){
      return true
    } else {
      return false
    }
       
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
        <Splash toggle={handleSplashClick}/> : 
        <Quiz 
          game={quizzer} 
          clickSubmit={handleSubmit}
          newQuiz={handleNewQuiz}
          clickBtn={handleBtnClick}
        />}
    </div>
      
  )
}

export default App
