
// React
import { useState,useEffect,useCallback } from 'react'

// CSS
import './App.css'

// data
import { wordsList } from './data/word'

// components
import StartScreen from './Components/StartScreen'
import Game from './Components/Game'
import GameOver from './Components/GameOver'


const stages = [
  {id:1,name:"start"},
  {id:2,name:"game"},
  {id:3,name:"end"},
]

const guessesQty = 3

function App() {
  const [gameStage,setGameStage] = useState(stages[0].name)
  const [words] = useState(wordsList)

  const [pickedWord,setPickedWord] = useState("")
  const [pickedCategory,setPickedCategory] = useState("")
  const [letters,setLetters] = useState([])

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(0)

  const pickWordAndCategory = useCallback(() =>{
    // Escolhendo uma categoria aleatória
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    console.log(category)

    // Escolhendo uma palavra aleatória
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    console.log(word)

    return{word,category}

  },[words])

  // starta o mundo secreto
  const startGame = useCallback(() =>{

    //limpando as palavras
    clearLetterStates()
    // escolher palavra e categoria
    const {word,category} = pickWordAndCategory()

    // criando um array de letras
    let wordLetters = word.split("")

    wordLetters = wordLetters.map((l) => l.toLowerCase())

    console.log(word, category)
    console.log(wordLetters)
  
    // Setando os estados
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name)
  },[pickWordAndCategory])

  // processo o input da letra 
  const verifyLetter = (letter) =>{
    const normalizedLetter = letter.toLowerCase()

    //checando se a letra ja foi escolhida
    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)
    ){
      return
    }

    // colocando a letra correta ou removendo uma chance
    if(letters.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedletters) =>[
        ...actualGuessedletters,normalizedLetter
      ])
    }else{
      setWrongLetters((actualWrongletters) =>[
        ...actualWrongletters,normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses -1)
    }
  }
  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }

 

  //checando se as tentantivas terminaram
  useEffect(() => {
    if (guesses <= 0) {
      // Resetando os estados
      clearLetterStates();
      setGameStage(stages[2].name); // Muda para o estágio de game over
    }
  }, [guesses]); // A lista de dependências deve estar correta


   // verificando a condição de vitória
   useEffect(()=>{

    const uniqueLetters = [... new Set(letters)]

    // condição de vitória
    if(guessedLetters.length === uniqueLetters.length && gameStage===stages[1].name){
      setScore((actualScore) => actualScore+=100) 

      //restartar o jogo
      startGame()
    }

   },[guessedLetters,letters,startGame,gameStage])


  // reinicia o jogo
  const retry = () =>{
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
  }
  return (
    <>
      <div className="App">
      {gameStage === "start" && <StartScreen startGame = {startGame}></StartScreen>}
      {gameStage === "game" && <Game verifyLetter = {verifyLetter} pickedWord={pickedWord} pickedCategory = {pickedCategory} letters={letters} guessedLetters = {guessedLetters} wrongLetters={wrongLetters} guesses ={guesses} score = {score}></Game>}
      {gameStage === "end" && <GameOver retry = {retry} score={score}></GameOver>}
      </div>
      
    </>
  )
}

export default App
