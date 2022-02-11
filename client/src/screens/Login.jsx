import logo from "../pictures/tf-2.png";
import {TextField, Button} from '@mui/material';
import { login } from "../services";
import { useState } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

export default function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userInfo = {
      username,
      password,
    };
    const user = await login(userInfo);
    props.setUser(user);
    history.push("/profile")
  }
  return (
    <section className="login">
    <Link to='/'>
      <img  className="logo" src={logo}/>
    </Link>
      <div className="login-container">
        <h1>Sign in</h1>
        <p>Log back in and share stops and rest areas.</p>
        <TextField value={username} onChange={(e) => setUsername(e.target.value)} label='username' variant="outlined"/>
        <TextField label='password' variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)}/>
        <Button onClick={handleSubmit} style={{width:"300px", height:"50px", alignSelf:"center"}} variant="contained" size="Large">Sign in</Button>
        <a href="/register">Not a Member?</a>
      </div>
    </section>
  );
}
