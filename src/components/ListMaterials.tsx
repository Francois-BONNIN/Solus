import { createStyles, SimpleGrid, Card, Image, Text, Container, AspectRatio, Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Equipment } from '../models/Equipment';



const useStyles = createStyles((theme) => ({
  card: {
    transition: 'transform 150ms ease, box-shadow 150ms ease',

    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: theme.shadows.md,
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    fontWeight: 600,
  },
}));

export function ListMaterials() {

  const [equipments, setEquipments] = useState<Equipment[]>([]);
  
  useEffect(() => { 
    const fetchEquipments = async () => {
    const response = await fetch("http://localhost:1337/api/equipments?populate=image");
    const jsonResponse = await response.json();
    console.log("JSON", typeof jsonResponse);
    setEquipments(jsonResponse.data);
    console.log(jsonResponse.data);
    
  };

    fetchEquipments();
  }, []);


  const { classes } = useStyles();

  const cards = equipments.map((equipment) => (
    <Card key={equipment.id} p="md" radius="md" component="a" href="#" className={classes.card}>
      <AspectRatio ratio={1920 / 1080}>
        <Image src={`http://localhost/${equipment.attributes.image}`}/>
      </AspectRatio>
      <Text color="dimmed" size="xs" transform="uppercase" weight={700} mt="md">
        {equipment.attributes.title}
      </Text>
      <Text className={classes.title} mt={5}>
        {equipment.attributes.description}
      </Text>
    </Card>
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={2} breakpoints={[{ maxWidth: 'sm', cols: 1,}]}>
        {cards}
      </SimpleGrid>
    </Container>
  );
}






