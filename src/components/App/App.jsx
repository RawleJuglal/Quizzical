import React from 'react'
import './App.css'
import Splash from '../Splash/Splash'
import Quiz from '../Quiz/Quiz'
import { nanoid } from 'nanoid'

function App() {
  const [splash, setSplash] = React.useState(true)
  const [questions, setQuestions] = React.useState([])
  const [user, setUser] = React.useState({submitted:false})
  
  React.useEffect(()=>{
    
    getNewQuiz()

  },[])

  function getNewQuiz(){
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data =>{
        return setQuestions(()=>{
         return data.results.map((ele)=>{
            return {...ele, id: nanoid()}
          })
        })
      })
  }

  function handleClick(){
    setSplash(()=> !splash)
  }

  function handleSubmit(event){
    event.preventDefault();
    setUser((prevUser)=>{
      return {...prevUser, submitted: !prevUser.submitted}
    })
  }

  function handleNewQuiz(event){
    event.preventDefault();
    getNewQuiz();
    setUser((prevUser)=>{
      return {...prevUser, submitted: !prevUser.submitted}
    })
  }

  return (
    <div className="--app-app-container">
      {splash ? 
        <Splash toggle={handleClick}/> : 
        <Quiz 
          data={questions} 
          clickSubmit={handleSubmit} 
          submitted={user.submitted}
          newQuiz={handleNewQuiz}
        />}
    </div>
      
  )
}

export default App
