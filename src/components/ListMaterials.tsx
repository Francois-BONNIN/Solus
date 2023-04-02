import {
  createStyles,
  SimpleGrid,
  Card,
  Text,
  Container,
  getStylesRef,
  rem,
  Group,
} from "@mantine/core";
import { useEffect, useState } from "react";
import { Equipment } from "../models/Equipment";
import { imageUrl } from "../utils/image";
import api from "../utils/fetchdata";

export function ListMaterials() {
  const [equipments, setEquipments] = useState<Equipment[]>([]);

  useEffect(() => {
    void api
      .get("/equipments?populate=image")
      .json()
      .then((responseJson) => {
        setEquipments(responseJson.data);
      })
      .catch((error) => {
        setEquipments([]);
        console.log(error);
      });
  }, []);

  const { classes } = useStyles();

  const cards = equipments.map((equipment) => (
    // <Card
    //   key={equipment.id}
    //   p="md"
    //   radius="md"
    //   component="a"
    //   href="#"
    //   className={classes.card}
    // >
    //   <AspectRatio ratio={1920 / 1080}>
    //     <Image
    //       src={`${imageUrl}${equipment.attributes.image.data[0].attributes.url}`}
    //     />
    //   </AspectRatio>
    //   <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
    //     {equipment.attributes.title}
    //   </Text>
    //   <Text className={classes.title} mt={5}>
    //     {equipment.attributes.description}
    //   </Text>
    // </Card>
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      component="a"
      target="_blank"
    >
      <div
        className={classes.image}
        style={{
          backgroundImage: `url(${imageUrl}${equipment.attributes.image.data[0].attributes.url})`,
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="lg" className={classes.title} weight={500}>
            {equipment.attributes.title}
          </Text>

          <Group position="apart" spacing="xs">
            <Text size="sm" className={classes.author}>
              {equipment.attributes.price} €
            </Text>
          </Group>
        </div>
      </div>
    </Card>
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: "sm", cols: 1 }]}>
        {cards}
      </SimpleGrid>
    </Container>
  );
}

const useStyles = createStyles((theme) => ({
  card: {
    position: "relative",
    height: rem(280),
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],

    [`&:hover .${getStylesRef("image")}`]: {
      transform: "scale(1.03)",
    },
  },

  image: {
    ...theme.fn.cover(),
    ref: getStylesRef("image"),
    backgroundSize: "cover",
    transition: "transform 500ms ease",
  },

  overlay: {
    position: "absolute",
    top: "20%",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage:
      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, .85) 90%)",
  },

  content: {
    height: "100%",
    position: "relative",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    zIndex: 1,
  },

  title: {
    color: theme.white,
    marginBottom: rem(5),
  },

  bodyText: {
    color: theme.colors.dark[2],
    marginLeft: rem(7),
  },

  author: {
    color: theme.colors.dark[2],
  },
}));
