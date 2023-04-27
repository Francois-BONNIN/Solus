import { imageUrl } from "../utils/image";
import { BackgroundImage, createStyles } from "@mantine/core";
import { Equipment } from "../models/Equipment";
import { useEffect, useState } from "react";
import api from "../utils/fetchdata";

export function Prof() {
  const [prof, setProf] = useState<Equipment>();
  const { classes } = useStyles();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    api
      .get(`/equipments/14?populate=image`)
      .then((responseJson) => {
        setProf(responseJson.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleHover = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className={classes.wrapper}>
      <BackgroundImage
        src={`${imageUrl}${prof?.attributes.image.data[0].attributes.url}`}
        h="100%"
        className={classes.bgimage}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      ></BackgroundImage>
      <div
        className={`${classes.description} ${isHovering ? classes.hide : ""}`}
      >
        <div className="text-dark text-9xl font-bold text-center">
          {prof?.attributes.specifications}
        </div>
      </div>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  bgimage: {
    width: "100%",
    height: "100%",
    overflow: "hidden",
    filter: "blur(50px)",
    backgroundPosition: "center -280px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    transition: "all 0.9s ease-in-out",
    "&:hover": {
      transform: "scale(1.9)",
      filter: "blur(0px)",
    },
  },
  description: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    transition: "all 0.9s ease-in-out",
  },
  wrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
    overflow: "hidden",
  },
  hide: {
    opacity: 0,
  },
}));
