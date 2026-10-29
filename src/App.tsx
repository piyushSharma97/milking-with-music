
import { Route, Routes } from 'react-router-dom';
import './styles/app.scss';
import MainPage from './Components/Main';
import MilkingHistoryPage from './Components/MilkingHistory';
import Header from './Components/Header';

/** Renders the shared navigation and the application's page routes. */
function App(): JSX.Element {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/milking-history" element={<MilkingHistoryPage />} />
      </Routes>
    </div>
  );
}

export default App;
