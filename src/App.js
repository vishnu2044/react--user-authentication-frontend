import './App.css';
import LoginPage from './pages/LoginPage';
import { AuthProvidor } from './context/AuthContext'
import Header from './components/Header/Header';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom'
import {PrivateRoute, UserProfileAuth, AuthAdminPanel} from './utilities/PrivateRout';
import SignupPage from './pages/SignupPage';
import AdminPanel from './pages/AdminPanel';
import UpdateUserProfile from './pages/UpdateUserProfile';
import AdminUserUpdate from './components/AdminUpdate/AdminUserUpdate';



function App() {
  return (
    <div className="App">
      
      <Router>
        <AuthProvidor>

          <Header />
          <Routes>
            
            <Route Component={PrivateRoute} path='/' exact/>
            <Route Component={UserProfileAuth} path='/userprofile' />
            <Route Component={LoginPage} path='/login'/> 
            <Route Component={SignupPage} path='/signup'/> 
            <Route Component={AdminPanel} path='/adminpanel'/> 
            <Route Component={UpdateUserProfile} path='/updateuserprofile'/> 
            <Route Component={AdminUserUpdate} path='/adminuserupdate'/> 
          </Routes>
          
        </AuthProvidor>
      </Router>
      

    </div>
  );
}

export default App;
