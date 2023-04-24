import { createStyles, Navbar, getStylesRef, rem } from "@mantine/core";

import { IconUserCircle, IconLogout } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const DisplayInfoUser = () => {
  const { classes, cx } = useStyles();
  const { user, logout, isConnected } = useAuth();

  return (
    <Navbar.Section className={classes.footer}>
      <Link key={"profile"} to="/profile" className={classes.link}>
        <IconUserCircle className={classes.linkIcon} stroke={1.5} />
        <span>{user?.username}</span>
      </Link>

      <Link
        key={"logout"}
        to="/auth"
        className={classes.link}
        onClick={() => {
          logout();
        }}
      >
        <IconLogout className={classes.linkIcon} stroke={1.5} />
        <span>Logout</span>
      </Link>
    </Navbar.Section>
  );
};

const useStyles = createStyles((theme) => ({
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
}));
