import { useEffect, useState } from "react";
import api from "../utils/fetchdata";
import { Equipment } from "../models/Equipment";
import { Stack, Text, Title } from "@mantine/core";
import { Activity } from "../models/Activity";
import { ListMaterials } from "../components/ListMaterials";
import { useParams } from "react-router-dom";

export const ActivityId = () => {
  const [equipments, setEquipments] = useState<Equipment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activity, setActivity] = useState<Activity>();
  const { id } = useParams();

  useEffect(() => {
    api
      .get(`/activities/${id}?populate=equipments.image`)
      .then((responseJson) => {
        setActivity(responseJson.data);
        setEquipments(responseJson.data.attributes.equipments.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setEquipments([]);
        console.log(error);
      });
  }, [id]);

  return (
    <Stack align="center">
      <Stack align="center" p="10">
        <Title>{activity?.attributes.title}</Title>
        <Text w="clamp(60%, 60vw, 100%)" align="center">
          {activity?.attributes.description}
        </Text>
      </Stack>
      <ListMaterials equipments={equipments} />
    </Stack>
  );
};
