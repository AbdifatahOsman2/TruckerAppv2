import { useEffect, useState } from "react";
import { getAllStops, deleteStop } from "../services";
import { Button, Link } from "@mui/material";
import { useHistory, useParams } from "react-router";

export default function Profile(props) {
  const [filteredPosts, setFilteredPosts] = useState([]);
  const history = useHistory();
  const params = useParams();
  const eventId = params.id;

  useEffect(() => {
    const fetchedFilteredPosts = async () => {
      const fetchedPosts = await getAllStops();
      const filter = fetchedPosts.filter(
        (post) => post.id === props.user.id
      );
      setFilteredPosts(filter);
    };
    fetchedFilteredPosts();
  }, [props.user]);
  const handleDelete = async () => {
    await deleteStop(eventId);
    history.push("/profile");
  };


  return (
    <section className="profile">
      {props.user ? (
        <>
        <div className="cards">
        {filteredPosts.map((stop) => (
          <div className="prof-card">
            <h1>{stop.delivery_location}</h1>
            <p>
              delivery from {stop.address} to {stop.delivery_location} created at{" "}
              {stop.created_at}
            </p>
            <Button href={`/edit/${stop.id}`} size="large" variant="contained">Edit</Button>
            <Button onClick={handleDelete} size="large" variant="contained" color="error">Delete</Button>
          </div>
        ))}
      </div> 
        </>
      ) : (
        <>
          <h1 className="not-in">Login to view your profile</h1>
        </>
      )}
    </section>
  );
}

