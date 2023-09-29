import React, {useContext} from 'react';
import Authcontext from '../context/AuthContext';


const HomePage = () => {
  let {name} = useContext(Authcontext)
  return (
    <div className='text-white'>
      <h3>Hello</h3>
    </div>
  )
}

export default HomePage