import React, { useState } from 'react'
import { Grid, TextField, Button, Paper, Avatar, Box } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './signIn.css'
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [error, setError] = useState(false)
  const navigate = useNavigate()
  const [processStatus, setProcessStatus] = useState(false)
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: ""
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }



  const handleSignInClick = () => {
    setProcessStatus(true)
    const auth = getAuth();
    signInWithEmailAndPassword(auth, userInfo.email, userInfo.password)
      .then((userCredential) => {
        navigate('/dashboard')
      })
      .catch((error) => {
        setProcessStatus(false)
        setError(true)
      });

  }

  return (
    <Grid style={{ pointerEvents: processStatus ? "none" : "auto" }}>
      <Paper elevation={10} sx={{ padding: '20px', height: '40vh', width: '300px', margin: '100px auto' }} justifyContent={'center'} alignContent={"center"}>
        <Box fullWidth justifyContent={'center'} alignContent={'center'} alignItems={'center'} display={'flex'}>
          <Avatar sx={{ mb: '10px', bgcolor: 'green', justifyContent: 'center' }} ><LockOutlinedIcon /></Avatar>
        </Box>

        <Box display={'flex'} justifyContent={'center'}>
          <text>Hey welcome back!!</text>
        </Box>


        <TextField error={error} onChange={handleOnChange} name='email' sx={{ mt: '10px' }} label="Email" fullWidth required placeholder='Enter your email' />
        <TextField error={error} onChange={handleOnChange} name='password' sx={{ mt: '10px' }} label="Password" type='password' fullWidth required placeholder='Enter your password' />
        {error &&
          <Box display={'flex'} alignContent={'end'} justifyContent={'end'}>
            <Link className='forget-password-link' to={'/password_reset'}> Forget password?</Link>
          </Box>}


        <Button onClick={handleSignInClick} className='sign-in-btn' fullWidth>Sign In</Button>

        <Box display={'flex'} alignContent={'center'} justifyContent={'center'}>
          <text className='sign-up-suggestion'>Don't have account?<Link className='sign-up-link' to={'/sign_up'}> Sign Up</Link></text>
        </Box>
      </Paper >
    </Grid >
  )
}

export default SignIn