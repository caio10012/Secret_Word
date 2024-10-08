import "./StartScreen.css";

const StartScreen = ({startGame}) => {
  return (
    <div className="start-container">
      <div className="start-content">
        <h1 className="title">Secret Word</h1>
        <p className="subtitle">Clique no botão abaixo para começar a jogar</p>
        <button className="start-button" onClick={startGame}>
          <span>Começar o jogo</span>
          <span className="arrow">➜</span>
        </button>
      </div>
    </div>
  )
}

export default StartScreen;