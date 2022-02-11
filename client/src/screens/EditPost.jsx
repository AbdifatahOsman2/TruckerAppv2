import { useEffect, useState } from "react"
import { updateStop, deleteStop } from "../services";
import { getAllStops } from "../services"
import { useHistory, useParams } from "react-router"
import {TextField, Button} from '@mui/material';

export default function EditPost() {
    const [selectedStop, setSelectedStop] = useState({})
    const [address, setAddress] = useState("")
    const [deliveryLocation, setDeliveryLocation] = useState("")
    const [routeLength, setRouteLength] = useState()
    const [descriptionOfStop, setDescriptionOfStop] = useState("")
    const history = useHistory()
    const params = useParams();
    const stopId = params.id;
    useEffect(() => {
        const fetchStops = async () => {
            const fetchedStops = await getAllStops();
            const stop = fetchedStops.find((stop) => stop.id == stopId)
            setSelectedStop(stop)
            setAddress(stop.address)
            setDeliveryLocation(stop.delivery_location)
            setRouteLength(stop.route_length)
            setDescriptionOfStop(stop.description_of_stop)
        }
        fetchStops()
    }, [])
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const updatedStop = {
                address,
                delivery_location: deliveryLocation,
                route_length: routeLength,
                description_of_stop: descriptionOfStop
            }
            await updateStop(updatedStop, stopId)
            history.push("/posts")
        } catch (error) {
            console.error(error.message)
        }
    }
    const handleDelete = async () => {
        await deleteStop(stopId)
        history.push("/posts")
    }
  return (
    <section className="post-stop">
      <h1>Post A New Stop!</h1>
      <TextField style={{width:"800px"}} id='edit-input' value={address} onChange={(e) => setAddress(e.target.value)} label='address' variant="outlined"/>
      <TextField style={{width:"800px"}}  id='edit-input' value={deliveryLocation} onChange={(e) => setDeliveryLocation(e.target.value)} label='delivery location' variant="outlined"/>
      <TextField style={{width:"800px"}}  id='edit-input' value={descriptionOfStop} onChange={(e) => setDescriptionOfStop(e.target.value)} label='stop description' variant="outlined"/>
      <TextField style={{width:"800px"}}  id='edit-input' value={routeLength} onChange={(e) => setRouteLength(e.target.value)} label='route length' variant="outlined"/>
      <div>
      <Button style={{margin:'10px'}} size='large' onClick={handleSubmit} variant="contained">Confirm</Button>
      <Button style={{margin:'10px'}} size='large' onClick={handleDelete} color='error' variant="contained">Delete</Button>
      </div>
    </section>
  );
}
