import { useState, useEffect } from "react";
import {
  createStyles,
  Navbar,
  Group,
  getStylesRef,
  rem,
  Image,
  Stack,
} from "@mantine/core";

import { Activity } from "../models/Activity";
import api from "../utils/fetchdata";
import logoBlack from "../assets/img/logoBlack.svg";
import { imageUrl } from "../utils/image";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { IconUserCircle } from "@tabler/icons-react";
import { DisplayInfoUser } from "./DisplayInfoUser";

export function SideBar() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("");
  const [activities, setActivities] = useState<Activity[]>([]);
  const { isConnected } = useAuth();

  useEffect(() => {
    void api
      .get("/activities?populate=icon")
      .then((jsonResponse) => {
        setActivities(jsonResponse.data);
      })
      .catch((error) => {
        setActivities([]);
        console.log(error);
      });
  }, []);

  const links = activities.map((activity) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: activity.attributes.title === active,
      })}
      to={`activities/${activity.id}`}
      key={activity.id}
      onClick={() => {
        setActive(activity.attributes.title);
      }}
    >
      <Image
        src={`${imageUrl}${activity.attributes.icon.data.attributes.url}`}
        className={classes.linkIcon}
        width={25}
        height={25}
      />
      {activity.attributes.title}
    </Link>
  ));

  return (
    <Navbar width={{ sm: 300 }} p="md" fixed={true}>
      <Navbar.Section grow>
        <Group className={classes.header} position="center">
          <Link to="/home">
            <Image src={logoBlack} height={30} fit="contain" />
          </Link>
        </Group>
        <Stack className="gap-0">{links}</Stack>
      </Navbar.Section>

      {isConnected ? (
        <DisplayInfoUser />
      ) : (
        <Link to="/auth" className={classes.link}>
          <IconUserCircle
            className={classes.linkIcon}
            stroke={1.5}
            color="black"
          />
          <span>Login</span>
        </Link>
      )}
    </Navbar>
  );
}

const useStyles = createStyles((theme) => ({
  header: {
    paddingBottom: theme.spacing.md,
    marginBottom: `calc(${theme.spacing.md} * 1.5)`,
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  footer: {
    paddingTop: theme.spacing.md,
    marginTop: theme.spacing.md,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
    }`,
  },

  link: {
    ...theme.fn.focusStyles(),
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[1]
        : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,

      [`& .${getStylesRef("icon")}`]: {
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef("icon"),
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[2]
        : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
      [`& .${getStylesRef("icon")}`]: {
        color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
          .color,
      },
    },
  },
}));
