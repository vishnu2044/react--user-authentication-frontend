import React, { useContext, useState, useEffect } from 'react';
import Authcontext from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBTextArea,
    MDBFile
  }
  from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';


const AdminUserUpdate = () => {
    const location = useLocation();
    let {authTokens, logoutUser} = useContext(Authcontext)
    const userId = location.state.userId;
    const [user, setUser] = useState([])
    const navigate = useNavigate()
    const [editingUser, setEditingUser] = useState([])

    let userDetails = async () => {
        try {
            
          let response = await fetch(`http://127.0.0.1:8000/api/single-user-datails/${userId}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' + String(authTokens.access)
            }
          });
      
          if (response.status === 200) {
            let data = await response.json();
            setUser(data);
            setEditingUser(data)
          } else {
            alert('somthing wrong')
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
          // Handle the error here, e.g., show an error message to the user
        }
    };

    let updateUser = async(e) => {
        e.preventDefault()
        let credentials = {}
        
        if (e.target.username.value != user.username){
            console.log('done user');
            credentials['username'] = e.target.username.value
        }
        if (e.target.email.value != user.email){
            console.log('done email');
            credentials['email'] = e.target.email.value
        }
        if (e.target.username.value === user.username && e.target.email.value === user.email){
            console.log("haiii")
            userDetails()
            const closeButton = document.querySelector('.btn-secondary[data-bs-dismiss="modal"]')
            closeButton.click()
            return
        }
        console.log(credentials)
        let response = await fetch(`http://127.0.0.1:8000/api/user-details/${userId}/`, {
            method: 'PATCH',
            headers:{
                'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' +String(authTokens.access),
            },
            body: JSON.stringify(credentials)
        })
        console.log(JSON.stringify(credentials))
        if (response.status === 200){
            userDetails()
            const closeButton = document.querySelector('.btn-secondary[data-bs-dismiss="modal"]');
            closeButton.click();           
        }else if(response.statusText === 'Unauthorized'){
            return logoutUser()
        }else{
            alert("username or email is already excisting!")
        }
    }
      

    useEffect(()=>{
        
        userDetails()

    }, [])

    

  return (
    <MDBContainer fluid>
        <MDBRow className='d-flex justify-content-center align-items-center'>
            <MDBCol lg='6' className='pt-5 my-5'>
                <MDBCard className='user-detail-div text-white'>
                    <MDBCardBody className='px-4'>
                        <form onSubmit={(e)=>updateUser(e)}>
                            <h4 className="text-white mb-4">Update {user.username}'s account</h4>
                            <MDBRow className='align-items-center pt-4 pb-1'>
                                <MDBCol md='3' className='ps-5'>
                                <h6 className="mb-0">username</h6>
                                </MDBCol>
                                <MDBCol md='9' className='pe-5'>
                                    <MDBInput size='sm' name='username' defaultValue={user?.username} id='username' placeholder={user?.username || 'Enter your phone number'} type='text' />
                                
                                </MDBCol>
                            </MDBRow>

                            <hr className="mx-n3" />

                            <MDBRow className='align-items-center pt-1 pb-1'>
                                <MDBCol md='3' className='ps-5'>
                                <h6 className="mb-0">Email</h6>
                                </MDBCol>
                                <MDBCol md='9' className='pe-5'>
                                <MDBInput size='sm' name='email' defaultValue={user?.email} id='email' placeholder={user?.email || 'Enter your phone number'} type='email' />

                                </MDBCol>
                            </MDBRow>

                            <hr className="mx-n3" />

                            <MDBRow className='align-items-center pt-1 pb-1'>
                                <MDBCol md='3' className='ps-5'>
                                <h6 className="mb-0">Date of Birth</h6>
                                </MDBCol>
                                <MDBCol md='9' className='pe-5'>
                                <MDBInput size='sm' name='DOB' defaultValue={user?.date} id='date_of_birth' placeholder={user?.dob || 'Enter your phone number'} type='date' />
                                </MDBCol>
                            </MDBRow>

                            <hr className="mx-n3" />

                            <MDBRow className='align-items-center pt-1 pb-1'>
                                <MDBCol md='3' className='ps-5'>
                                <h6 className="mb-0">Phone Number</h6>
                                </MDBCol>
                                <MDBCol md='9' className='pe-5'>
                                <MDBInput
                                    size='sm'
                                    name='phone_no'
                                    defaultValue={user?.Phone_no}
                                    id='phone_no'
                                    placeholder={user.Phone_no || 'Enter your phone number'}
                                    type='text'
                                    
                                />
                                </MDBCol>
                            </MDBRow>

                            <hr className="mx-n3" />

                            <hr className="mx-n3" />

                            <Button className='me-3' type='submit' size="md">Update</Button>
                            <Button  onClick={()=> navigate('/adminpanel')} size="md">Back</Button>
                            
                        </form>
                        
                    </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>
    </MDBContainer>
  )
}

export default AdminUserUpdate;