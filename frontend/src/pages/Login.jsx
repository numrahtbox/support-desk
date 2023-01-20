import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import {toast} from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
import { login, reset } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Login() {
  const [formData,setFormData] = useState({
    email:'',
    password:''
  })
  const {email,password} = formData;
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {user, isLoading, isSuccess, isError, message}  = useSelector(state => state.auth)
 
  useEffect(() =>{
    if(isError){
      toast.error(message)
    }
    //redirect when logged in
    if(isSuccess && user){
      navigate('/')
    }
    dispatch(reset())
  },[isError,isSuccess,user,message,navigate,dispatch])

  const onChange = (e) =>{
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }
  
  const onSubmit = (e) =>{
    e.preventDefault();
    dispatch(login(formData))
  }
  if(isLoading){
    return <Spinner/>
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt/> Login
        </h1>
        <p>Please Login to get Support</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input 
             type='email' 
             className='form-control'
             id='email' 
             name='email' 
             required
             value={email} onChange={onChange}
             placeholder='Enter your email'/>
          </div>
          <div className='form-group'>
            <input 
             type='password' 
             className='form-control'
             id='password' 
             required
             name='password' 
             value={password} onChange={onChange}
             placeholder='Enter your password'/>
          </div>
          <div className="form-group">
            <button className='btn btn-block'>Submit</button>
          </div>
          
        </form>
      </section>
    </>
  )
}

export default Login