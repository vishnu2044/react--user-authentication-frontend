import { createContext, useState, useEffect, lazy } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { responsivePropType } from "react-bootstrap/esm/createUtilityClasses";

const Authcontext = createContext()

export default Authcontext;

export const AuthProvidor = ({children}) =>{

    
    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null)
    let [loading, setLoading] = useState(true)
    let [userdata, setUserdata] = useState()
    
    const navigate = useNavigate()

    let loginUser = async (e) =>{
        e.preventDefault()
        console.log("form submitted", e.target.username.value, e.target.password.value);
        
        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method : 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                'username':e.target.username.value, 
                'password':e.target.password.value
                
            })
        })
        let data = await response.json()
        console.log("data : ", data)
        if(response.status === 200){
            
            console.log("response : ", response)
            setAuthTokens(data)
            setUser(jwt_decode(data.access))            
            localStorage.setItem('authTokens', JSON.stringify(data))
            navigate('/userprofile')

        }else{
            alert("Something went wrong!!")
        }
        
        
    }

    let getUserProfile = async () => {
        try {
            let response = await fetch('http://127.0.0.1:8000/api/profile/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + String(authTokens.access),
                }
            });
    
            if (response.status === 200) {
                let data = await response.json();
                setUserdata(data);
                console.log('User data retrieved successfully.');
            } else if (response.status === 401) { // Unauthorized
                console.log('Failed to get user data: Unauthorized.');
                return logoutUser(); // You need to define this function
            } else {
                console.log('Failed to get user data: Unexpected error.');
                // Handle other unexpected errors here if needed
            }
        } catch (error) {
            console.error('An error occurred while fetching user data:', error);
            // Handle exceptions here, e.g., network errors
        }
    };
    
      

    let signupUser = async (e) =>{
        e.preventDefault()
        if (e.target.password.value !== e.target.confirmPassword.value){
            return alert("password not matching!")
        }
        let response = await fetch('http://127.0.0.1:8000/register/', {
            method: "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                'username' :e.target.username.value,
                'password' : e.target.password.value,
                'email' : e.target.email.value,
            })
            
            
        })
        let data = await response.json()
        console.log(data.username, data.email)
        if (data.response === 'registered'){
            navigate('/login')
            alert("Account created successfully")
        }else if (data.username){
            alert(data.username)
        }else if(data.email){
            alert(data.email)
        }else{
            alert("something went wrong")
        }
    }



    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        navigate('/login')

    }

    let updateToken = async ()=>{
        console.log('updateToken working')
        let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
            method : "POST",
            headers : {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({'refresh':authTokens?.refresh})
        })
        let data = await response.json()

        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data))
            
        }else{
            logoutUser() 
        }
        if(loading){
            setLoading(false)
        }
    }  

    
    
    let contextData = {
        user : user,
        userdata: userdata,
        authTokens, authTokens,
        loginUser: loginUser,
        logoutUser : logoutUser,
        signupUser: signupUser,
        
    }

    useEffect(()=>{
        if(loading){
            updateToken()
        }
        getUserProfile()
    
        let fourMinutes = 1000 * 60 *  4
        let interval = setInterval(()=> {
            if(authTokens){
                updateToken()
            }
        }, fourMinutes )
        return ()=> clearInterval(interval)
    }, [authTokens, loading])
    
    return(
        <Authcontext.Provider value={contextData}>
            {loading? null : children}
        </Authcontext.Provider>
    )
}




















// // Define an asynchronous function called signupUser that takes an event (e) as its parameter.
// let signupUser = async (e) => {
//     // Prevent the default behavior of the event (form submission).
//     e.preventDefault();

//     // Check if the password and confirmPassword fields have matching values.
//     if (e.target.password.value !== e.target.confirmPassword.value) {
//         // If they don't match, show an alert message and exit the function.
//         return alert("Password not matching!");
//     }

//     // Send a POST request to the specified URL ('http://127.0.0.1:8000/register/') using the fetch API.
//     let response = await fetch('http://127.0.0.1:8000/register/', {
//         method: "POST", // Use the HTTP POST method for sending data.
//         headers: {
//             'Content-Type': 'application/json' // Set the content type of the request to JSON.
//         },
//         body: JSON.stringify({
//             'username': e.target.username.value, // Get the username from the form input.
//             'password': e.target.password.value, // Get the password from the form input.
//             'email': e.target.email.value,       // Get the email from the form input.
//         })
//     });

//     // Wait for the response to be received and parsed as JSON.
//     let data = await response.json();

//     // Check the response data to determine what action to take.
//     if (data.response === 'registered') {
//         // If the response indicates successful registration:
//         // - Navigate to the '/login' page (assuming a function called 'navigate' is defined elsewhere).
//         navigate('/login');
//         // - Show an alert message indicating successful account creation.
//         alert("Account created successfully");
//     } else if (data.username) {
//         // If the response contains a 'username' field:
//         // - Show an alert with the value of the 'username' field (likely an error message).
//         alert(data.username);
//     } else if (data.email) {
//         // If the response contains an 'email' field:
//         // - Show an alert with the value of the 'email' field (likely an error message).
//         alert(data.email);
//     } else {
//         // If none of the above conditions match:
//         // - Show a generic error message.
//         alert("Something went wrong");
//     }
// }
