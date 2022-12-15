import "./styles/App.scss";
import GameRule from "./views/GameRule";
import GameView from "./views/GameView";

function App() {
  return (
    <div className="App">
      <GameRule className="description" />
      <GameView className="game_play" />
    </div>
  );
}

export default App;
