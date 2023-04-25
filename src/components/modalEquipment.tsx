import { createStyles, Text, Title, Image, rem, Button } from "@mantine/core";
import { imageUrl } from "../utils/image";
import { Equipment } from "../models/Equipment";
import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    padding: `calc(${theme.spacing.xl} * 2)`,
    borderRadius: theme.radius.md,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    border: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[3]
    }`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column-reverse",
      padding: theme.spacing.xl,
    },
  },

  image: {
    maxWidth: "40%",

    [theme.fn.smallerThan("sm")]: {
      maxWidth: "100%",
    },
  },

  body: {
    flex: "1",
    paddingRight: `calc(${theme.spacing.xl} * 4)`,

    [theme.fn.smallerThan("sm")]: {
      paddingRight: 0,
      marginTop: theme.spacing.xl,
    },
  },

  title: {
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
    marginBottom: theme.spacing.md,
  },

  controls: {
    display: "flex",
    marginTop: theme.spacing.xl,
  },

  inputWrapper: {
    width: "100%",
    flex: "1",
  },

  input: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderRight: 0,
  },

  control: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
}));

interface ModalEquipmentProps {
  selectedEquipment: Equipment;
  handleFavorite: (idEquipment: number, isFavorite: boolean) => void;
}

export function ModalEquipment({
  selectedEquipment,
  handleFavorite,
}: ModalEquipmentProps) {
  const { classes } = useStyles();
  const { user, isConnected } = useAuth();

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user) {
      setIsFavorite(
        user.favorites.some(
          (equipment) => equipment.id === selectedEquipment.id
        )
      );
    }
  }, [user, selectedEquipment]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.body}>
        <Title className={classes.title}>
          {selectedEquipment.attributes.title}
        </Title>
        <Text fw={700} size={20}>
          Description
        </Text>
        <Text className="mb-6 text-justify">
          {selectedEquipment.attributes.description}{" "}
        </Text>

        <Text fw={700} size={20}>
          Spécifications
        </Text>
        <Text className="text-justify">
          {selectedEquipment.attributes.specifications}
        </Text>

        <div className={classes.controls}>
          <Text fw={700} className="text-4xl mb-6">
            {selectedEquipment.attributes.price} €
          </Text>
        </div>

        <div>
          <Button
            onClick={() => {
              handleFavorite(selectedEquipment.id, isFavorite);
              setIsFavorite(!isFavorite);
            }}
            variant="gradient"
            gradient={
              isFavorite
                ? { from: "orange", to: "red" }
                : { from: "teal", to: "blue", deg: 60 }
            }
            leftIcon={
              isFavorite ? (
                <IconHeartFilled size={16} />
              ) : (
                <IconHeart size={16} />
              )
            }
            // {isConnected ? disabled : null}
            {...(!isConnected && { disabled: true })}
          >
            {isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          </Button>
        </div>
      </div>
      <Image
        src={`${imageUrl}${selectedEquipment.attributes.image.data[0].attributes.url}`}
        alt=""
        width={500}
        height={500}
        fit="contain"
      />
    </div>
  );
}
