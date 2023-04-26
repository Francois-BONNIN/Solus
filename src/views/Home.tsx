import {
  createStyles,
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Anchor,
  Group,
  rem,
  Image,
} from '@mantine/core';
import {
  IconCreditCard,
  IconBuildingBank,
  IconRepeat,
  IconReceiptRefund,
  IconReceipt,
  IconReceiptTax,
  IconReport,
  IconCashBanknote,
  IconCoin,
} from '@tabler/icons-react';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/fetchdata';
import { Activity } from '../models/Activity';
import { imageUrl } from '../utils/image';


const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 700,
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: rem(90),
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: theme.shadows.md,
      transform: 'scale(1.05)',
    },
  },
}));

export function Home() {
  const { classes, theme } = useStyles();
  const [activities, setActivities] = useState<Activity[]>([]);

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

  const items = activities.map((activity) => (
    <UnstyledButton key={activity.id} className={classes.item} component={Link}  to={`activities/${activity.id}`} >
     <Image
        src={`${imageUrl}${activity.attributes.icon.data.attributes.url}`}
        width={25}
        height={25}
      />
      {activity.attributes.title}
    </UnstyledButton>
  ));

  return (
    <Card withBorder radius="md" className={classes.card}>
      <Group position="apart">
        <Text className={classes.title}>Services</Text>
        <Anchor size="xs" color="dimmed" sx={{ lineHeight: 1 }} component={Link} to="/prof">
          Le prof il est sympa ( mito )
        </Anchor>
      </Group>
      <SimpleGrid cols={3} mt="md">
        {items}
      </SimpleGrid>
    </Card>
  );
}