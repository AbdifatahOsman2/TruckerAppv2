import React from "react";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllStops, addTruckerStops } from "../services";
import image from '../pictures/13.jpg'
import SearchIcon from '@mui/icons-material/Search';
import axios from "axios";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  input: {
    marginTop: "30px",
    width: "400px",
    borderRadius:'10px',
    backgroundColor:'white',
    ['@media (max-width:480px)']: {
      width: '350px'
    }
  },
});

export default function Posts(props) {
  const classes = useStyles();
  const [stops, setStops] = useState([]);
  const [images, setImages] = useState([])
  useEffect(() => {
    getAllStops().then((fetchedStops) => setStops(fetchedStops));
  }, []);
  const handleClick = async (stopId) => {
    const user = await addTruckerStops(stopId);
    props.setUser(user);
  };
  
  // const instance = axios.create({
  //   baseURL: `https://api.pexels.com/v1/search?query=trucks`
  // })
  
  // instance.defaults.withCredentials = false;
  // const getImage = async () => {
  //   try {
  //     const response = await instance.get()
  //     setImages(response.data.photos)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  // getImage()
  return (
    <>
      <div id="text-field" >
      <TextField className={classes.input} variant="outlined" placeholder="Filter by Location"/>
      </div>
    <section className="posts">
      <div className="cards">
        {stops.map((stop) => (
          <div className="card">
          <img src={image}/>
            <p className="date">{stop.created_at}</p>
            <h1>{stop.delivery_location}</h1>
            <p>
              Exercitation elit voluptate esse anim exercitation occaecat
              incididunt dolor sit ullamco sint sint.voluptate esse anim exercitation occaecat
              incididunt dolor sit ullamco sint sint.
            </p>
            <a href="#">
              Learn More <i class="fas fa-chevron-right"></i>
            </a>
          </div>
        ))}
      </div>
    </section>
    </>
  );
}
