
import { Route, Routes, Outlet } from 'react-router-dom';
// import './App.css';
import './styles/app.scss'
import MainPage from './Components/Main';
import MilkingHistoryPage from './Components/MilkingHistory';
import Header from './Components/Header';

function App() {
  return (
    <div className="App">
      <div>
        <Header />
      </div>

      <div>
        <Outlet />
      </div>
      <Routes>
        <Route element={<App />} />
        <Route exact path="/" element={<MainPage />} />
        <Route path="/milking-history" element={<MilkingHistoryPage />} />
      </Routes>

    </div>
  );
}

export default App;
