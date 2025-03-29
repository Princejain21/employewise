import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Bypass from './Screens/Bypass'
import {Store} from '../src/Redux/Store.tsx'
import LoginScreen from './Screens/OnBoardStack/LoginScreen'
import Homescreen from './Screens/Rootnavigator/Homescreen.tsx'
import { Provider } from 'react-redux';
function App() {
  return (
    <Provider store={Store}>
    <Router>
    <Bypass>
      <Routes>
        <Route path="/" element={<LoginScreen/>} />
        <Route path="/Home" element={<Homescreen/>} />
      </Routes>
    </Bypass>
  </Router>
  </Provider>
  );
}

export default App;
