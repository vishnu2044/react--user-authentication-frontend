import React, {useContext} from 'react';
import Authcontext from '../context/AuthContext';


import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import UserProfile from '../components/userProfile/UserProfile';

export const PrivateRoute = () =>{
    const {user} = useContext(Authcontext)
    
    console.log("Private route works");
    return user ? <HomePage /> : <LoginPage />;
}

export const UserProfileAuth = () =>{
    const {user} = useContext(Authcontext)
    
    console.log("Private route works");
    return  user ? <UserProfile /> : <LoginPage /> 
}

// export const AuthAdminPanel = () =>{
//     const {userdata} = useContext(Authcontext)

//     return userdata?.superuser ? <AuthAdminPanel /> : <LoginPage />
// }


// export default PrivateRoute;