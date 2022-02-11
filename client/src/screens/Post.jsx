import { useState } from "react";
import { useHistory } from "react-router-dom";
import { postStop } from "../services";
import {TextField, Button} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  input: {
    width:'800px',
    ['@media (max-width:480px)']: {
      width: '350px'
    }
  },
});
export default function Post() {
    const classes = useStyles();
    const history = useHistory();
    const [address, setAddress] = useState("")
    const [deliveryLocation, setDeliveryLocation] = useState("")
    const [routeLength, setRouteLength] = useState()
    const [descriptionOfStop, setDescriptionOfStop] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newStop = {
            address,
            delivery_location: deliveryLocation,
            route_length: routeLength,
            description_of_stop: descriptionOfStop
        }
        await postStop(newStop)
        history.push("/posts");
    }
  return (
    <section className="post-stop">
      <h1>Post A New Stop!</h1>
      <TextField className={classes.input} id='input' value={address} onChange={(e) => setAddress(e.target.value)} label='address' variant="outlined"/>
      <TextField className={classes.input}  id='input' value={deliveryLocation} onChange={(e) => setDeliveryLocation(e.target.value)} label='delivery location' variant="outlined"/>
      <TextField className={classes.input}  id='input' value={descriptionOfStop} onChange={(e) => setDescriptionOfStop(e.target.value)} label='stop description' variant="outlined"/>
      <TextField className={classes.input}  id='input' value={routeLength} onChange={(e) => setRouteLength(e.target.value)} label='route length' variant="outlined"/>
      <Button onClick={handleSubmit} variant="contained">Post</Button>
    </section>
  );
}
