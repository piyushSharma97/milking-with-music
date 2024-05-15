import Header from './Components/Header';
import App from './App';
import MainPage from './Components/Main';
import MilkingHistoryPage from './Components/MilkingHistory'; 
import MilkingMusicPlayer from './Components/MilkingMusicPlayer'
import { Route ,Routes} from 'react-router-dom';
const AppRoutes =()=>{

    return(
        <>
             <Routes>
                <Route element={<App/>}/>
        <Route exact path="/" element={<MainPage/>} />
        <Route exact path="/milking-music" component={<MilkingMusicPlayer/>} />
        <Route path="/milking-history" component={<MilkingHistoryPage/>} />
      </Routes>
        </>
    )
}

export {AppRoutes}