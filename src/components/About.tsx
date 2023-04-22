import {
  createStyles,
  Container,
  Text,
  Button,
  Group,
  rem,
} from "@mantine/core";
import { MapContainer, Marker, Popup, TileLayer, Tooltip, useMap } from "react-leaflet";
import "./about.css";
import "leaflet/dist/leaflet.css";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: "relative",
    boxSizing: "border-box",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  inner: {
    position: "relative",
    paddingTop: rem(200),
    paddingBottom: rem(120),

    [theme.fn.smallerThan("sm")]: {
      paddingBottom: rem(80),
      paddingTop: rem(80),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontSize: rem(62),
    fontWeight: 900,
    lineHeight: 1.1,
    margin: 0,
    padding: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(42),
      lineHeight: 1.2,
    },
  },

  description: {
    marginTop: theme.spacing.xl,
    fontSize: rem(24),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(18),
    },
  },

  controls: {
    marginTop: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xl,
    },
  },

  control: {
    height: rem(54),
    paddingLeft: rem(38),
    paddingRight: rem(38),

    [theme.fn.smallerThan("sm")]: {
      height: rem(54),
      paddingLeft: rem(18),
      paddingRight: rem(18),
      flex: 1,
    },
  },
}));

export function About() {
  const { classes } = useStyles();

  return (
    <>
      <div className={classes.wrapper}>
        <Container size={700} className={classes.inner}>
          <h1 className={classes.title}>
            Un{" "}
            <Text
              component="span"
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
              inherit
            >
              assistant réactif
            </Text>{" "}
            adapté à vos besoins
          </h1>

          <Text className={classes.description} color="dimmed">
            Notre site permet de trouver rapidement le matériel informatique
            adapté à vos besoins, grâce à une expérience intuitive et un
            assistant réactif.
          </Text>

          <Group className={classes.controls}>
            <Button
              size="xl"
              component="a"
              href="activities/2"
              className={classes.control}
              variant="gradient"
              gradient={{ from: "blue", to: "cyan" }}
            >
              Découvrir
            </Button>

            <Button
              component="a"
              href="activities/2"
              size="xl"
              variant="default"
              className={classes.control}
            >
              Non Merci
            </Button>
          </Group>
        </Container>
      </div>
      <MapContainer
        center={[43.610374839854614, 1.4319977420504015]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[43.610374839854614, 1.4319977420504015]}>
          <Tooltip direction="bottom" offset={[-16, 26]} opacity={1} permanent>
            Siège Solus
          </Tooltip>
        </Marker>
      </MapContainer>
    </>
  );
}

{
  /* <Marker position={[43.610374839854614, 1.4319977420504015]}></Marker> */
}
