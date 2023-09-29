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

const SignupPage = () => {
  const {signupUser} = useContext(Authcontext)
  return (
    <MDBContainer fluid>

    <MDBRow className='d-flex justify-content-center align-items-center h-100 mt-4 pt-4'>
      <MDBCol col='12'>
        <form onSubmit={signupUser}>
            <MDBCard className=' bg-dark text-white my-5 mx-auto' id='login-div' >
            <MDBCardBody className='p-5 d-flex flex-column align-items-center mx-auto w-100'>

                
                <h2 className="fw-bold mb-2 text-uppercase">Sign-Up</h2>
                <p className="text-white-50 mb-5">Create new account</p>

                <MDBInput wrapperClass='mb-4 mx-5 w-100'  label='username'  name='username' type='text' placeholder='Enter username' />
                <MDBInput wrapperClass='mb-4 mx-5 w-100'  label='E-mail'  name='email' type='text' placeholder='Enter your email' />
                <MDBInput wrapperClass='mb-4 mx-5 w-100'  label='Password'  name='password' type='password' placeholder='Enter password' />
                <MDBInput wrapperClass='mb-4 mx-5 w-100'  label='Password'  name='confirmPassword' type='password' placeholder='Re-enter password' />

                <Button type='submit'>Signup</Button>

                <div>
                    <br/>
                <p className="mb-0">Already have an account? <Link to='/login' class="text-white-50 fw-bold">Log In</Link></p>

                </div>

                


            </MDBCardBody>
            </MDBCard>
        </form>

      </MDBCol>
    </MDBRow>

  </MDBContainer>
  )
}

export default SignupPage