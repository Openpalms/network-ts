import './App.css';
import {
  Routes,
  Route,
  useParams,
  useNavigate,
  redirect,
} from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { IsUserLogged } from './HandleChanges/UserAuth';
import Settings from './pages/Settings';
import UserPages from './pages/UsersPages';
import Messenger from './pages/Messenger';
function App() {
  const { currentUser } = IsUserLogged();
  const navigate = useNavigate();
  return (
    <div className=" grid grid-cols-[0.5fr,1fr,0.5fr] grid-rows-[100px,1fr] gap-6">
      <div className="col-span-3 h-[50%]">
        <Navbar />
      </div>
      <div className="col-start-1 ml-5">
        <Sidebar />
      </div>
      <div className=" col-start-2 col-end-4 row-start-2 w-[100%]">
        <Routes>
          {/* checking if user is logined and can access pages 
          Need to think of better solution with switches tho 
          */}
          {!currentUser ? (
            <Route path="*" element={<LoginPage />} />
          ) : (
            <>
              <Route path="/settings" element={<Settings />} />
              <Route path={`/:id`} element={<MainPage />} />
              <Route path="/users" element={<UserPages />} />
              <Route path="/messages" element={<Messenger />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
}

export default App;
