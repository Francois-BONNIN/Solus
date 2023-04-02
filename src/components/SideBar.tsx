import { useState, useEffect } from "react";
import {
  createStyles,
  Navbar,
  Group,
  getStylesRef,
  rem,
  Image,
} from "@mantine/core";

import { IconSwitchHorizontal, IconLogout } from "@tabler/icons-react";
import { Activity } from "../models/Activity";
import api from "../utils/fetchdata";
import logoBlack from "../assets/img/logoBlack.svg";
import { imageUrl } from "../utils/image";

export function SideBar() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    void api
      .get("/activities?populate=icon")
      .json()
      .then((jsonResponse) => {
        setActivities(jsonResponse.data);
      })
      .catch((error) => {
        setActivities([]);
        console.log(error);
      });
  }, []);

  const links = activities.map((activity) => (
    // rome-ignore lint/a11y/useValidAnchor: <explanation>
    <a
      className={cx(classes.link, {
        [classes.linkActive]: activity.attributes.title === active,
      })}
      href="#"
      key={activity.attributes.title}
      onClick={(event) => {
        event.preventDefault();
        setActive(activity.attributes.title);
      }}
    >
      <Image
        src={`${imageUrl}${activity.attributes.icon.data.attributes.url}`}
        className={classes.linkIcon}
        width={25}
        height={25}
      />
      <span>{activity.attributes.title}</span>
    </a>
  ));

  return (
    <Navbar width={{ sm: 300 }} p="md" fixed={true}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          {/* image asset/img/logo.png */}
          <Image src={logoBlack} height={30} fit="contain" />
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        {/* rome-ignore lint/a11y/useValidAnchor: <explanation> */}
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Change account</span>
        </a>

        {/* rome-ignore lint/a11y/useValidAnchor: <explanation> */}
        <a
          href="#"
          className={classes.link}
          onClick={(event) => event.preventDefault()}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
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
