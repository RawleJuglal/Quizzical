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

          return {
            questionID:nanoid(),
            question:convertString(ele.question),
            correctAnswer:{cid:nanoid(), answer:convertString(ele.correct_answer), isSelected:false},
            incorrectAnswers:incorrectArr,
            userChoice:'true'
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

    //find the questionID index
    let holdQuestion = quizzer.questions.findIndex((val)=>{
      return val.questionID == event.target.name
    })
      //look to see if correctAnswers.cid matches clickID
    if(quizzer.questions[holdQuestion].correctAnswer.cid == clickID){
      let items = [...quizzer.questions]
      let item = {...quizzer.questions[holdQuestion]}
      let ite = {...quizzer.questions[holdQuestion].correctAnswer}
      ite.isSelected = !quizzer.questions[holdQuestion].correctAnswer.isSelected
      item.correctAnswer = ite;
      items[holdQuestion] = item;
      console.log(`F`)
      console.log(items)

      
    } else {
      console.log(`incorrect${clickID}`)
    }
      
          //if they match setQuizzer flip correctAnswer.cid &&
          //setQuizzer all incorrectAnswer.isSelected to false
      //else
          //look for the incorrectAnswer index that clickID matches
              //setQuizzer all flip incorrectAnswer.isSelected to false
              //setQuizzer correctAnswer.isSelected to false
              //setQuizzer incorrectAnswer[0].isSelected flipped
    // setQuizzer((prevQuizzer)=>{
    //   return {...prevQuizzer, questions:[...prevQuizzer.questions, ]}
    // })
  }

  function handleSubmit(event){
    event.preventDefault();
    console.log(`handle submit`)
    // checkForCompletion()
    // console.log(quizzer)
    // quizzer.mechanics.isCompleted ? 
    //   setQuizzer((prevQuizzer)=>{
    //     return {...prevQuizzer, mechanics:{...prevQuizzer.mechanics, isSubmitted: !prevQuizzer.mechanics.isSubmitted}}
    //   }) : console.log('can not submit')
  }    

  function checkForCompletion(){
    console.log('check completion')
    // quizzer.questions.every(o => o.userChoice !== '') ? 
    //     setQuizzer((prevQuizzer)=>{
    //       console.log(`all userchoice not empty`)
    //       return {...prevQuizzer, mechanics:{...prevQuizzer.mechanics, isCompleted: !prevQuizzer.mechanics.isCompleted}}
    //     }): false
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
