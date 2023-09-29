import React, { useContext, useState, useEffect } from 'react';
import Authcontext from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
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



const UpdateUserProfile = () => {
    let [user, setUser]= useState(null);

    let { authTokens, logoutUser } = useContext(Authcontext);
    const [profile_img, setImg] = useState()
    const navigate = useNavigate()

    let getUserProfile = async ()=>{
        let response = await fetch('http://127.0.0.1:8000/api/profile/', {
          method:'GET',
          headers:{
            'Content-Type':'application/json',
            'Authorization' : 'Bearer '+String(authTokens.access),
    
          } 
        })
        let data = await response.json()
        if (response.status === 200){
            setUser(data)
        }else if(response.statusText === 'Unauthorized'){
    
          return logoutUser()
        }
    }

    let udpateUserProfileData = async (e) =>{
        console.log('update called#####################')
        e.preventDefault();

        let formData = new FormData();
        
        if ( e.target.username.value.length === 0){
            alert("username is none please enter user name")
            return udpateUserProfileData
        }
        if ( e.target.email.value.length === 0){
            alert("username is none please enter Email id ")
            return udpateUserProfileData
        }
        formData.append('username', e.target.username.value);
        formData.append('email', e.target.email.value);
        formData.append('date_of_birth', e.target.DOB.value);
        formData.append('Phone_no', e.target.phone_no.value);
        
        
        if (profile_img){
            formData.append('profile_img', profile_img)
        }


        try{
            const response = await fetch('http://127.0.0.1:8000/api/updateprofile/',{
                method: 'PATCH',
                headers: {
                    'Authorization': 'Bearer ' + String(authTokens.access),
                },
                body:formData,
            });
            console.log(response.status)
            if (response.ok) {
                alert("Profile updated successfully");
                const closeButton = document.querySelector('.btn-secondary[data-bs-dismiss="modal"]');
                closeButton.click();
                getUserProfile()
            }else if (response.status === 401) {
                return logoutUser()
            }else {
                alert ('updation failed')
            }
        } catch(error){
            console.error('An error occured', error)
            alert("An error occurred while updating your profile")
        }
    }

    useEffect(() =>{
        getUserProfile()
    }, []);
  
  
    return (
            <MDBContainer fluid>
                <MDBRow className='d-flex justify-content-center align-items-center'>
                    <MDBCol lg='6' className='pt-5 my-5'>
                        <MDBCard className='user-detail-div text-white'>
                            <MDBCardBody className='px-4'>
                                <form onSubmit={udpateUserProfileData} >
                                    <h4 className="text-white mb-4">Update your account</h4>

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
                                        <MDBInput size='sm' name='DOB' defaultValue={user?.dob} id='date_of_birth' placeholder={user?.dob || 'Enter your phone number'} type='date' />
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
                                            defaultValue={user?.phone_no}
                                            id='phone_no'
                                            placeholder={user?.phone_no || 'Enter your phone number'}
                                            type='text'
                                            
                                        />
                                        </MDBCol>
                                    </MDBRow>

                                    <hr className="mx-n3" />

                                    <MDBRow className='align-items-center pt-4 pb-3'>
                                        <MDBCol md='3' className='ps-5'>
                                        <h6 className="mb-0">Profile Pic</h6>
                                        </MDBCol>
                                        <MDBCol md='9' className='pe-5'>
                                        <input type="file" className="form-control" id="profile-img" 
                                            onChange={(e)=>{ 
                                            if(e.target.value[0] != null)
                                            setImg(e.target.files[0])}} 
                                        />
                                        </MDBCol>
                                    </MDBRow>

                                    <hr className="mx-n3" />

                                    <Button className='me-3' type='submit' size="md">Update</Button>
                                    <Button  onClick={()=> navigate('/userprofile')} size="md">Back</Button>
                                    
                                </form>
                                
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>

    );
  };
  
  export default UpdateUserProfile;
  