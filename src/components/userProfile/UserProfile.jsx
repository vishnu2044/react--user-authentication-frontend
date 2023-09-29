import React, { useContext, useState, useEffect } from 'react';
import './userProfile.css';
import Authcontext from '../../context/AuthContext';
import { FaHandPointRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { 
  MDBCol, 
  MDBContainer, 
  MDBRow, 
  MDBCard, 
  MDBCardText, 
  MDBCardBody, 
  MDBCardImage, 
  MDBTypography, 
  MDBIcon 
} from 'mdb-react-ui-kit';
import { Button } from 'react-bootstrap';

const UserProfile = () => {
  let [user, setUser] = useState(null);
  let { authTokens, logoutUser } = useContext(Authcontext);
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate()

  // Function to fetch user profile
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
  

  // Function to fetch user notes
  async function getNotes() {
    const response = await fetch('http://127.0.0.1:8000/api/notes/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authTokens.access}`,
      },
    });

    const data = await response.json();
    if (response.status === 200) {
      setNotes(data);

    } else if (response.statusText === 'Unauthorized') {
      logoutUser();
    }
  }

  // Fetch user profile and notes on component mount
  useEffect(() => {
    getUserProfile();
    // getNotes();
  }, []);

  return (
    <MDBContainer className="mt-4 py-5 h-100">
      <MDBRow className="mt-4 justify-content-center align-items-center h-100">
        <MDBCol lg="9" className="mt-4 mb-4 mb-lg-0">
          <MDBCard className="user-detail-div text-white">
            <MDBRow className="g-0">
              <MDBCol md="4" className=" p-4 text-center text-white"
                style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                  alt="Avatar" className="my-5" style={{ width: '80px' }} fluid />
                {user ? <MDBTypography tag="h5">{user.username}</MDBTypography> :
                  <MDBTypography tag="h5">username</MDBTypography>}
                  <Button onClick={()=> navigate('/updateuserprofile')}>udpate profile</Button>
                <MDBIcon far icon="edit mb-5" />
                
              </MDBCol>
              <MDBCol  md="8">
                <MDBCardBody className="p-4">
                  <MDBTypography tag="h5">Information</MDBTypography>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className='align-items-center pt-1 pb-1'>
  
                    <MDBCol md='4' className='pe-2'>
                      <MDBTypography tag="h6" className='pb-2'>Eamil</MDBTypography>
                    </MDBCol>

                    <MDBCol md='8' className=''>
                      <MDBTypography tag="h6" className='pb-2'>{user?.email}</MDBTypography>
                    </MDBCol>

                  </MDBRow>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className='align-items-center pt-1 pb-1'>
  
                    <MDBCol md='4' className='pe-2 pb-2'>
                      <MDBTypography tag="h6">date of birth</MDBTypography>
                    </MDBCol>

                    <MDBCol md='8' className='pb-2'>
                      <MDBTypography tag="h6">{user?.dob}</MDBTypography>
                    </MDBCol>

                  </MDBRow>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className='align-items-center pt-1 pb-1'>
  
                    <MDBCol md='4' className='pe-2'>
                      <MDBTypography tag="h6" className='pb-2'>Phone</MDBTypography>
                    </MDBCol>

                    <MDBCol md='8' className=''>
                      <MDBTypography tag="h6" className='pb-2'>{user?.phone_no}</MDBTypography>
                    </MDBCol>

                  </MDBRow>
                  <br/>

                  <MDBTypography tag="h5">Notes</MDBTypography>
                  <hr className="mt-0 mb-4" />
                  <MDBRow className="">
                    {notes ? (
                      // If notes is defined, map and display each note.
                      notes.map((note) => (
                        <MDBCol size="12" className="mb-3" key={note.id}>
                          <MDBTypography className='text-white' tag="p"> <FaHandPointRight />   {note.body}</MDBTypography>
                        </MDBCol>
                      ))
                    ) : (
                      // Otherwise, display "No data found".
                      <h2 className='text-white'>No data found</h2>
                    )}
                  </MDBRow>

                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default UserProfile;
