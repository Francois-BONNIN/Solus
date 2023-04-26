import { createStyles, Avatar, Text, Group } from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import { imageUrl } from "../utils/image";
import { useAuth } from "../hooks/useAuth";

interface UserInfoIconsProps {
  avatar: string;
  name: string;
  title: string;
  phone: string;
  email: string;
}

export function Profile() {
  const { classes } = useStyles();
  const { user } = useAuth();

  // TODO : Add a loading state
  if (!user)
    return (
      <div>
        <Text>Not logged in</Text>
      </div>
    );

  return (
    <div>
      <Group noWrap>
        {user.avatar && (
          <Avatar radius="xl" src={`${imageUrl}${user.avatar.url}`} size={94}/>
        )}
        <div>
          <Text fz="lg" fw={500} className={classes.name}>
            {user.username}
          </Text>

          <Group noWrap spacing={10} mt={3}>
            <IconAt stroke={1.5} size="1rem" className={classes.icon} />
            <Text fz="xs" c="dimmed">
              {user.email}
            </Text>
          </Group>
        </div>
      </Group>
    </div>
  );
}

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));
