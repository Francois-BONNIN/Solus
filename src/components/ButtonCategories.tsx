import { SimpleGrid, Container, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { Activity } from "../models/Activity";



export function ButtonCategories() {

  const [activities, setActivities] = useState<Activity[]>([]);
  
  useEffect(() => { 
    const fetchActivities = async () => {
    const response = await fetch("http://localhost:1337/api/activities");
    const jsonResponse = await response.json();
    console.log("JSON", typeof jsonResponse);
    setActivities(jsonResponse.data);
    console.log(jsonResponse.data);
    
  };

    fetchActivities();
  }, []);

 
  return (
    <Container py="sm">
      <SimpleGrid cols={1}>
        {
          activities.map((activity)=>
            <Button key={activity.attributes.title} variant="outline" color="dark">{activity.attributes.title}</Button>
          )
        }
        </SimpleGrid>
    </Container>
  );
};