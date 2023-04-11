import { Avatar, Box, Button, Grid, Paper, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";


import './signUp.css'


const SignUp = ({ state }) => {
  const { contract } = state;

  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    password: '',
    confirm_password: ''
  })

  const [nameError, setNameError] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [passError, setPassError] = useState(false)
  const [processStatus, setProcessStatus] = useState(false)




  const handleSignUpClick = () => {
    setProcessStatus(true)
    const { name, email, password, confirm_password } = userInfo
    if (!name && name.length < 3) {
      setNameError(true)
    }
    if (!email) {
      setEmailError(true)
    }
    if (!confirm_password || password !== confirm_password) {
      setPassError(true)
    }



    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in 
        const user = userCredential.user;

        console.log(user)
        await contract.createUser(userInfo.name, user.uid);
        navigate('/')

      })
      .catch((error) => {
        setProcessStatus(false)
        const errorMessage = error.message;
        console.log(errorMessage)
      });
  }

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setUserInfo({
      ...userInfo,
      [name]: value
    })
  }





  return (
    <Grid style={{ pointerEvents: processStatus ? "none" : "auto" }}>
      <Paper elevation={10} sx={{ padding: '20px', height: '50vh', width: '300px', margin: '100px auto' }} justifyContent={'center'} alignContent={"center"}>
        <Box fullWidth justifyContent={'center'} alignContent={'center'} alignItems={'center'} display={'flex'}>
          <Avatar sx={{ mb: '10px', bgcolor: 'green', justifyContent: 'center' }} ><LockOpenOutlinedIcon /></Avatar>
        </Box>

        <Box display={'flex'} justifyContent={'center'}>
          <text>You are one step away!!</text>
        </Box>


        <TextField onChange={handleOnChange} helperText={nameError && "Can't be emtpy"} error={nameError} name='name' sx={{ mt: '10px' }} label="Name" type='name' fullWidth required placeholder='Enter your full name' />
        <TextField onChange={handleOnChange} helperText={nameError && "Can't be emtpy"} error={emailError} name='email' sx={{ mt: '10px' }} label="Email" fullWidth required placeholder='Enter your email' />
        <TextField onChange={handleOnChange} helperText={nameError && "Can't be emtpy"} error={passError} name='password' sx={{ mt: '10px' }} label="Password" required type='password' fullWidth placeholder='Enter your password' />
        <TextField onChange={handleOnChange} helperText={nameError && "Can't be emtpy"} error={passError} name='confirm_password' sx={{ mt: '10px' }} label="Confirm Password" required type='password' fullWidth placeholder='Re-write your password' />
        <Button onClick={handleSignUpClick} helperText={nameError && "Can't be emtpy"} className='sign-up-btn' required fullWidth>Sign Up</Button>

        <Box display={'flex'} alignContent={'center'} justifyContent={'center'}>
          <text className='sign-up-suggestion'>Already have an account?<Link className='sign-in-link' to={'/'}> Sign In</Link></text>
        </Box>
      </Paper>
    </Grid >)


}

export default SignUp