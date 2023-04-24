import { SimpleGrid, Container, Button, Image } from "@mantine/core";
import { useEffect, useState } from "react";
import { Activity } from "../models/Activity";
import api from "../utils/fetchdata";
import { imageUrl } from "../utils/image";

export function ButtonCategories() {
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

  return (
    <Container pt={"lg"}>
      <SimpleGrid cols={1}>
        {activities.map((activity) => (
          <Button
            key={activity.attributes.title}
            variant="outline"
            color="dark"
          >
            <Image
              src={`${imageUrl}${activity.attributes.icon.data.attributes.url}`}
              pr={"md"}
              width={100}
              height={100}
            />
            {activity.attributes.title}
          </Button>
        ))}
      </SimpleGrid>
    </Container>
  );
}
