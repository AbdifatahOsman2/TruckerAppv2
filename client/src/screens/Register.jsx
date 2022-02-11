import logo from "../pictures/tf-2.png";
import {TextField, Button} from '@mui/material';
import { register } from "../services";
import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function Register(props) {
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const history = useHistory()
    const handleSubmit = async (e) => {
      e.preventDefault();
      const newUser = {
        username,
        email,
        password,
      };
      const user = await register(newUser);
      props.setUser(user);
      history.push('/posts')
    }
  return (
    <section className="register">
    <Link to='/'>
      <img  className="logo" src={logo}/>
    </Link>
      <div className="container">
        <h1>Sign Up</h1>
        <p>A website designed for truckers to share stops and rest areas.</p>
        <TextField style={{margin:'5px'}} id='input' value={username} onChange={(e) => setUsername(e.target.value)} label='username' variant="outlined"/>
        <TextField style={{margin:'5px'}} id='input' value={email} onChange={(e) => setEmail(e.target.value)} label='email' variant="outlined"/>
        <TextField style={{margin:'5px'}} id='input' label='password' variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <TextField style={{margin:'5px'}} id='input' label='confirm password' variant="outlined"/>
        <Button onClick={handleSubmit} style={{width:"300px", height:"50px", alignSelf:"center"}} variant="contained" size="Large">Sign Up</Button>
        <a href="/login">Already a Member?</a>
      </div>
    </section>
  );
}
