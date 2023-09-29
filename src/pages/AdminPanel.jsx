import React, { useContext, useState, useEffect } from 'react';
// import Authcontext from '../../context/AuthContext';
import Authcontext from '../context/AuthContext';
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
// import {  MDBFormInline } from "mdbreact";
import { BsSearch } from 'react-icons/bs';
import { 
  MDBCol, 
  MDBContainer, 
  MDBRow, 
  MDBCard, 
  MDBCardText, 
  MDBCardBody, 
  MDBCardImage, 
  MDBTypography, 
  MDBIcon,
  MDBInputGroup,
  MDBBtn,
  MDBInput,
} from 'mdb-react-ui-kit';



const AdminPanel = () => {
  let [users, setUsers] = useState([]);
  let {userdata, authTokens, logoutUser } = useContext(Authcontext);
  const navigate = useNavigate()

  const [isModelOpen, setIsModelOpen] = useState(false)

  const openModel = () =>{
    setIsModelOpen(true);
  }

  const closeModel = () =>{
    setIsModelOpen(false);
  }



  const deleteUser = async (id) =>{
    try{
      let response = await fetch(`http://127.0.0.1:8000/api/user-details/${id}`, {
        method : 'DELETE',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization' : 'Bearer ' + String(authTokens.access),
        },
      })
      if (response.status === 204){
        getUser()
      }else if(response.statusText === 'Unauthorized'){
        return logoutUser()
      }
    }catch (error) {
      console.error('An error occurred while fetching user data:', error);
      // Handle exceptions here, e.g., network errors
    }
  }


  const searchUser = async (keyword) =>{
    console.log("search user is working")
    if (!(keyword === '')){
      
      let response = await fetch(`http://127.0.0.1:8000/api/user-list/?search=${keyword}`,{
        method:"GET",
        headers:{
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer ' +String(authTokens.access),
        }
      })

      if (response.status === 200){
        let data = await response.json()
        console.log(data);
        console.log("search user works");
        setUsers(data)
        
      }else{
        getUser()
      }
      console.log("users dasta", users)
      
    }else{
      getUser()
    }
  }


  const getUser = async() =>{

    let response = await fetch('http://127.0.0.1:8000/api/user-list/', {
      method: 'GET',
      headers: {
        'Content-Type' : 'application/json',
        'Authorization': 'Bearer ' + String(authTokens.access),
      }
    })
    let data = await response.json()
    if (response.status === 200){
      setUsers(data)
    }else if(response.statusText === 'Unuthorized') {
      return logoutUser()
    }
  }

  useEffect(()=>{
    getUser()
  }, [])

  
  
    return (
      <MDBContainer className=" mt-4 py-5 h-100">
        <MDBRow className="mt-4 justify-content-center align-items-center h-100">
          <MDBCol lg="" className="mt-4 mb-4 mb-lg-0">
            <MDBCard className="user-detail-div text-white">
              <MDBRow className="g-0">

                <MDBCol  >
                  <MDBCardBody className="p-4">
                    <MDBTypography tag="h4">Admin Panel</MDBTypography>
                    
                    
                    <MDBRow className='align-items-center pt-1 pb-1'>
  
                      <MDBCol md='4' className='pe-2'>
                        <MDBTypography tag="h6" className='pb-2'>Admin</MDBTypography>
                      </MDBCol>

                      <MDBCol md='8' className=''>
                        <MDBTypography tag="h6" className='pb-2'>{userdata?.username}</MDBTypography>
                      </MDBCol>

                    </MDBRow>
                    <MDBRow className='align-items-center pt-1 pb-1'>
  
                      <MDBCol md='4' className='pe-2'>
                        <MDBTypography tag="h6" className='pb-2'>Email</MDBTypography>
                      </MDBCol>

                      <MDBCol md='8' className=''>
                        <MDBTypography tag="h6" className='pb-2'>{userdata?.email}</MDBTypography>
                      </MDBCol>

                    </MDBRow>
                    <hr className="mt-0 mb-4" />
  
                    <MDBTypography  tag="h5">Users</MDBTypography>
                    <MDBInputGroup className='mb-4'>

                      <br/>
                      <MDBInput size='sm' onChange={(e)=>searchUser(e.target.value)} placeholder='search user..' type='text'  />
                      <Button size='sm' className='bg-dark'>
                        <BsSearch  />
                      </Button>
                    </MDBInputGroup>
                   
                    <MDBRow className="">
                    <Table striped bordered hover variant="dark">
                      <thead>
                        <tr>
                          <th>User id</th>
                          <th>username</th>
                          <th>email</th>
                          <th>Edit </th>
                          <th>Delete </th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.length > 0 ? (
                          users.map((user, index) => (
                            <tr key={index}>
                              <td>{user.id}</td>
                              <td>{user.username}</td>
                              <td>{user.email}</td>
                              <td>
                                <Button onClick={() => navigate('/adminuserupdate', { state: { userId: user.id } })}>Edit</Button>
                              </td>
                              <td>
                                <Button onClick={() => deleteUser(user.id)} className='bg-danger'>Delete</Button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="5">No data found</td>
                          </tr>
                        )}
                      </tbody>

                    </Table>


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
  
  export default AdminPanel;
  