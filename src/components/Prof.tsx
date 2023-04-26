import {imageUrl} from "../utils/image";
import {Image, Stack, Text, Title} from "@mantine/core";
import {Equipment} from "../models/Equipment";
import {useEffect, useState} from "react";
import api from "../utils/fetchdata";


export function Prof() {
    const [prof, setProf] = useState<Equipment>();

    useEffect(() => {
        api
            .get(`/equipments/15?populate=image`)
            .then((responseJson) => {
                setProf(responseJson.data);

            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    return (
            <Image src={`${imageUrl}${prof?.attributes.image.data[0].attributes.url}`} />
    );
}

