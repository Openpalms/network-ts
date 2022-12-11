import './App.css';
import { Routes, Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { IsUserLogged } from './HandleChanges/UserAuth';
import Settings from './components/Settings';
function App() {
  const { currentUser } = IsUserLogged();
  return (
    <div className=" grid grid-cols-[0.5fr,1fr,0.5fr] grid-rows-[100px,1fr] gap-6">
      <div className="col-span-3 h-[50%]">
        <Navbar />
      </div>
      <div className="col-start-1 ml-5">
        <Sidebar />
      </div>
      <div className="col-start-3 mr-5">
        <Sidebar />
      </div>
      <div className=" col-start-2 row-start-2 w-[100%]">
        <Routes>
          <Route path="" element={currentUser ? <MainPage /> : <LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
