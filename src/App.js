import './App.css';
import {BrowserRouter, Routes, Route, Link, useLocation} from "react-router-dom";

import TopBar from "./components/TopBar";
import StartGame from "./pages/StartGame";
import Game from "./pages/Game";
import Trader from "./pages/Trader";
import Arena from "./pages/Arena";

function App() {
  return (
      <div className="container-fluid">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <TopBar/>
            <Routes>
              <Route path={"/"} element={<StartGame/>}/>
              <Route path={"/game"} element={<Game/>}/>
              <Route path={"/shop"} element={<Trader/>}/>
              <Route path={"/arena"} element={<Arena/>}/>
            </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
