import React, { useState } from 'react'
import { Grid, TextField, Button, Paper, Avatar, Box } from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import './signIn.css'
import { Link } from 'react-router-dom';



function SignIn() {
  const [error, setError] = useState(false)



  const handleSignInClick = () => {

  }


  return (
    <Grid >
      <Paper elevation={10} sx={{ padding: '20px', height: '40vh', width: '300px', margin: '100px auto' }} justifyContent={'center'} alignContent={"center"}>
        <Box fullWidth justifyContent={'center'} alignContent={'center'} alignItems={'center'} display={'flex'}>
          <Avatar sx={{ mb: '10px', bgcolor: 'green', justifyContent: 'center' }} ><LockOutlinedIcon /></Avatar>
        </Box>

        <Box display={'flex'} justifyContent={'center'}>
          <text>Hey welcome back!!</text>
        </Box>


        <TextField sx={{ mt: '10px' }} label="Email" fullWidth required placeholder='Enter your email' />
        <TextField sx={{ mt: '10px' }} label="Password" type='password' fullWidth required placeholder='Enter your password' />
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