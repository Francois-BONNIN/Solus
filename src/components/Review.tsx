import { createStyles, Text, Avatar, Group, rem } from "@mantine/core";
import { Review } from "../models/Review";
import { imageUrl } from "../utils/image";

const useStyles = createStyles((theme) => ({
  body: {
    paddingLeft: rem(54),
    paddingTop: theme.spacing.sm,
  },
}));

export function CommentSimple(props: Review) {
  const { classes } = useStyles();
  return (
    <div>
      <Group>
        <Avatar
          src={
            imageUrl +
            props.attributes.user.data.avatar.formats.thumbnail.url
          }
          radius="xl"
        />
        <div>
          <Text size="sm">{props.attributes.user.data.username}</Text>
          <Text size="xs" color="dimmed">
            {props.attributes.rating} / 5
          </Text>
        </div>
      </Group>
      <Text className={classes.body} size="sm">
        {props.attributes.comment}
      </Text>
    </div>
  );
}
