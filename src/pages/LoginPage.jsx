import './loginpage.css';
import { Button } from 'react-bootstrap';
import React, {useContext} from 'react';
import Authcontext from '../context/AuthContext';
import {Link} from 'react-router-dom'
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
}
from 'mdb-react-ui-kit';


const LoginPage = () => {
  let {loginUser} = useContext(Authcontext)

  return (
    <MDBContainer fluid>

    <MDBRow className='d-flex justify-content-center align-items-center h-100 mt-4 pt-4'>
      <MDBCol col='12'>
        <form onSubmit={loginUser} >
            <MDBCard className=' bg-dark text-white my-5 mx-auto' id='login-div' >
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                
                <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                <p className="text-white-50 mb-5">Please enter your login and password!</p>

                <MDBInput wrapperClass='mb-4 mx-5 w-100'  label='username'  name='username' type='text' placeholder='enter username' />
                <MDBInput wrapperClass='mb-4 mx-5 w-100'  label='Password'  name='password' type='password' placeholder='enter password' />

                <p className="small mb-3 pb-lg-2"><a class="text-white-50" href="#!">Forgot password?</a></p>
                <Button type='submit'>Login</Button>

                <div>
                    <br/>
                <p className="mb-0">Don't have an account? <Link to='/signup' class="text-white-50 fw-bold">Sign Up</Link></p>

                </div>

                


            </MDBCardBody>
            </MDBCard>
        </form>

      </MDBCol>
    </MDBRow>

  </MDBContainer>
  )
}

export default LoginPage
