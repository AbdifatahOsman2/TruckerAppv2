import { useEffect } from "react";
import Aos from "aos";
import bg from '../pictures/tes.jpg'
import sec2 from '../pictures/sec2.png'
import sec3 from '../pictures/pngfind 1.png'
import { Button } from "@mui/material";
import logo from '../pictures/tf-2.png'

const Home = () => {
  useEffect(() => {
    Aos.init({
      duration: 1000,
      offset: 200,
      easing: "ease-in",
    });
  }, []);

  return (
    <>
    <section className="section-one">
      <div className="container">
      <img className="landing-img" src={bg} />
      <h1 className="welcome">Welcome to Tofu Express</h1>
      <p className="welcome_bot">A website for truckers and dispatchers to post and share truck stops or rest areas. Dispatchers will also soon have their own console see all stops on a map</p>
      <Button href='/register' id="welcome_btn" variant="contained" size='large'>Sign Up</Button>
      </div>
    </section>
    <section className="section-two">
      <div className="container">
      <img className="sec-two-pic" src={sec2}/>
      <p className="section-two-p">Share, and edit all your favororite Truck and rest areas with other truck.Anim magna enim aliquip labore occaecat qui et veniam. Aute quis est elit ullamco in irure quis cillum magna. Consectetur sunt Lorem nisi do et.</p>
      </div>
    </section>
    <section className="section-three">
      <div className="container">
      <img className="sec-three-pic" src={sec3}/>
      <p className="section-three-p">In culpa ullamco duis ex nisi veniam ipsum ut ea quis velit proident minim.Anim magna enim aliquip labore occaecat qui et veniam. Aute quis est elit ullamco in irure quis cillum magna. Consectetur sunt Lorem nisi do et.</p>
      </div>
      <div className="footer">
        <p>Copyright © 2022 Abdifatah Osman</p>
        <img className="logo" src={logo}/>
        <div className="links">
        <i id="link" class="fab fa-github"></i>
        <i id="link" class="fab fa-linkedin-in"></i>
        </div>
      </div>
    </section>
    </>
  );
};

export default Home;
