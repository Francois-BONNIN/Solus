import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button,
  Anchor,
  Stack,
} from "@mantine/core";
import { IconAt } from "@tabler/icons-react";
import api from "../utils/fetchdata";
import { useAuth } from "../hooks/useAuth";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { notifications } from "@mantine/notifications";

export function Auth() {
  const { user, login } = useAuth();
  const [type, setType] = useState("login");
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 6
          ? "Password should include at least 6 characters"
          : null,
      name: (val) => {
        if (type === "register") {
          return val.length <= 3
            ? "Name should include at least 3 characters"
            : null;
        }
      },
    },

    validateInputOnChange: true,
  });

  const [params] = useSearchParams();
  const param = params.get("param");

  const navigate = useNavigate();

  useEffect(() => {
    param === "register" ? setType("register") : setType("login");
  }, [param]);

  const handleSubmit = () => {
    console.log("submit");

    const authPath = type === "login" ? "/auth/local/" : "/auth/local/register";
    notifications.show({
      id: "auth",
      title: "Connecting...",
      message: "Please wait while we connect you to the server",
      color: "teal",
      loading: true,
      autoClose: false,
    });

    api
      .post(authPath, {
        identifier: form.values.email,
        username: form.values.name,
        email: form.values.email,
        password: form.values.password,
      })
      .then((response) => {
        notifications.update({
          id: "auth",
          title: `Welcome ${response.user.username}`,
          message: "Congratulations, you have successfully connected",
          color: "teal",
          loading: false,
          autoClose: 4000,
        });
        login(response.jwt);
        navigate("/");
      })
      .catch((response) => {
        notifications.update({
          id: "auth",
          title: "Connection failed",
          message: response.error.message,
          color: "red",
          loading: false,
          autoClose: 6000,
        });
        console.log(response);
      });
  };

  return (
    <Paper radius="md" p="xl" className="w-3/5 mx-auto my-auto shadow-md">
      <Text size="xl" weight={500} align="center">
        Welcome to Solus
      </Text>
      <Text size="sm" weight={400} align="center">
        {type} with
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack mt={10}>
          {type === "register" && (
            <TextInput
              required
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              error={
                form.errors.name && "Name should include at least 3 characters"
              }
              radius="md"
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            icon={<IconAt size="0.8rem" />}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            radius="md"
          />
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
            onClick={() => setType(type === "register" ? "login" : "register")}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {type}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
