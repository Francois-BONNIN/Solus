import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import { Link } from "react-router-dom";

export function Login() {
  return (
    <Container size="sm" my={40}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        De retour !
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Vous n'avez pas encore de compte ?{" "}
        <Link to={"/auth/register"}>Créer un compte</Link>
      </Text>

      <Paper withBorder shadow="md" p="xl" mt={30} radius="md">
        <TextInput label="Email" placeholder="you@mantine.dev" required />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
        />
        <Group position="apart" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Mot de passe oublié ?
          </Anchor>
        </Group>
        <Button fullWidth mt="xl">
          Se connecter
        </Button>
      </Paper>
    </Container>
  );
}
