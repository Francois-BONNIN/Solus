import { SimpleGrid, Container, Button } from "@mantine/core";
import { useEffect, useState } from "react";
import { Activity, ActivityResponse } from "../models/Activity";
import api from "../utils/fetchdata";

export function ButtonCategories() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    void api
      .get("/activities")
      .json()
      .then((jsonResponse) => {
        setActivities(jsonResponse.data);
        console.log("jsonResponse", jsonResponse);
      })
      .catch((error) => {
        setActivities([]);
        console.log(error);
      });

    console.log("env : ", import.meta.env.URL_BACKEND);
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
            {activity.attributes.title}
          </Button>
        ))}
      </SimpleGrid>
    </Container>
  );
}
