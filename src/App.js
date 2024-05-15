
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import MainPage from './Components/Main';
import MilkingHistoryPage from './Components/MilkingHistory'; 
import MilkingMusicPlayer from './Components/MilkingMusicPlayer'
function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/milking-music" component={MilkingMusicPlayer} />
        <Route path="/milking-history" component={MilkingHistoryPage} />
      </Routes>
      </div>
  );
}

export default App;
