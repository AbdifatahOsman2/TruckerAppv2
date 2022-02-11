import HashLoader from "react-spinners/HashLoader";
import { Route, Switch } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import Nav from "./Components/Nav";
import Home from "./screens/Home";
import Login from './screens/Login'
import Register from './screens/Register'
import Posts from "./screens/Posts";
import Profile from "./screens/Profile";
import Post from "./screens/Post";
import EditPost from "./screens/EditPost";


// scss/css
import "./App.scss";
import "./Components/Nav.scss";
import "./screens/Home.scss";
import './screens/Login.scss';
import './screens/Register.scss'
import './screens/Posts.scss'
import './screens/Profile.scss'
import './screens/Post.scss'
import './screens/EditPost.scss'

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="App">
      {loading ? (
        <div className="load">
          <HashLoader
            id="loading"
            color={"#f50057"}
            loading={loading}
            size={150}
          />
        </div>
      ) : (
        <>
          <Switch>
            {/* components here will have no Navbar */}
            <Route path="/login">
              <Login setUser={setUser}/>
            </Route>
            <Route path="/register">
              <Register setUser={setUser}/>
            </Route>
            <>
              <Route path="/profile">
                <Profile user={user}/>
              </Route>
              <Route path="/edit/:id">
                <EditPost setUser={setUser}/>
              </Route>
              <Route path="/new">
                <Post user={user} setUser={setUser} />
              </Route>
              <Nav user={user} setUser={setUser} />
              <Route exact path="/posts" component={Posts} />
              <Route exact path="/" component={Home} />
            </>
          </Switch>
        </>
      )}
    </div>
  );
}

export default App;
