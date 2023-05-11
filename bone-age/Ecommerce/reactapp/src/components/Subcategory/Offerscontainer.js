import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const Offerscontainer = ({ photos }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <Carousel responsive={responsive}>
        {Array.isArray(photos) && photos.map(photo => (
          <div className="photo-card" key={photo.id}>
            <div className="photo-card-image">
              <img src={photo.photo_url} style={{ borderRadius: '0', objectFit: 'cover', width:'60%',height:'20%'}} />
            </div>
          </div>
        ))}
      </Carousel>
    </>
  );
};

export default Offerscontainer;