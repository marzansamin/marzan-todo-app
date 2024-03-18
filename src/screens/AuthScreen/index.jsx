/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { Container, Stack, TextField, Button, Typography } from '@mui/material'
import logo from '/src/assets/list.svg'
import ImageEl from '../../components/utils/imageEl';
import { auth } from '../../firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import useStore from '../../store';

const initForm = {
  email: "",
  password: "",
}

const AuthScreen = () => {
  const [loading, setloading] = useState(false); //used to stop the unauthorized user
  const [isLogin, setisLogin] = useState(true); //used to toggle between the login and signup page
  const [form, setform] = useState(initForm) 
  const {setToaster} = useStore();

  const authText = isLogin ? "Don't Have An Account?" : "Already Have An Account?"

  // to store the value of form given by user
  const handleChange = event => setform((oldform) => ({...oldform, [event.target.name]:event.target.value,}));

  // for making network request whenever the user clicks the button
  const handleAuth = async () => {
    try{
      setloading(true);
      if(isLogin){
        await signInWithEmailAndPassword(auth, form.email, form.password);
      }else{
        await createUserWithEmailAndPassword(auth, form.email, form.password);
      }
    }catch(err){
      const msg= err.code.split('auth/')[1].split('-').join(' ')
      setToaster(msg);
      setloading(false);
    }
  };

  return (
    <Container maxWidth="xs"> 
    {/* Contains the complete heading */}
      <Stack mb={4} spacing={4} alignItems={'center'} textAlign={'center'}>
        {/* 2 elements, image+title, the text below */}
        {/* 1st element */}
        <div style={{display:'flex', justifyContent:'center', alignContent:'center'}}>
          <ImageEl sx={{height:100, mt:3}} src={logo} alt="Daily Biz!" />
          <Typography sx={{fontSize:30, mt:6}}>Daily Biz!</Typography>
        </div>
        {/* 2nd element */}
        <Typography color="rgba(255, 255, 255, 0.6)" sx={{fontSize:15}}>
        Visualize Your Workflow to Boost Productivity. 
        <br/>Look Up Your Tasks Anytime, Anywhere.
        </Typography>
      </Stack>
      {/* the signing form */}
      <Stack spacing={2}>
        <TextField value={form.email} name='email' onChange={handleChange} label="Email" />
        <TextField value={form.password} name='password' onChange={handleChange} label="Password" />
        <Button disabled={loading || !form.email.trim() || !form.password.trim()} onClick={handleAuth} size='large' variant="contained"> 
          {isLogin ? "Login" : "Register"} {/* toggle between login and signup page */}
        </Button>
      </Stack>
      <Typography sx={{cursor: 'pointer'}} onClick={() => setisLogin(o => !o)} textAlign={'center'} mt={3}>
        {authText} {/* toggle between login and signup page */}
      </Typography> 
    </Container>
  );
};

export default AuthScreen