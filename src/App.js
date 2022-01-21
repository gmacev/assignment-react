import './App.css';
import {BrowserRouter, Routes, Route, Link, useLocation} from "react-router-dom";
/*import Shop from "./pages/Shop";
import MainWindow from "./pages/MainWindow";
import {useSelector} from "react-redux";*/



/*import {useDispatch, useSelector} from "react-redux";
import {updateMaterials} from "../features/UpdateMaterials";
import {useNavigate} from "react-router-dom";
import {updateHouses} from "../features/UpdateHouses";

const MainWindow = () => {
  const stateMaterials = useSelector((state) => state.materials.value)
  const stateHouses = useSelector((state) => state.houses.value)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  function updateMaterial(material)
  {
    const materials =
        {
          stone: stateMaterials.stone,
          wood: stateMaterials.wood,
          gold: stateMaterials.gold
        }

    materials[material]++

    dispatch(updateMaterials(materials))
  }*/

import TopBar from "./components/TopBar";
import StartGame from "./pages/StartGame";
import Game from "./pages/Game";
import Trader from "./pages/Trader";
import Arena from "./pages/Arena";

function App() {
  return (
      <div className="container-fluid">
        <BrowserRouter>
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
