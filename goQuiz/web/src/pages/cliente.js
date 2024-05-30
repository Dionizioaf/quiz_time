import React, { useState } from "react";
import {
  Page,
  PageHeader,
  PageContent,
  Card,
  CardBody,
  Text,
  TextInput,
  CardFooter,
  Button,
} from "grommet";
import { Gamepad, User } from "grommet-icons";

const Cliente = () => {
  const [idGame, setIdGame] = useState("");
  const [idUser, setIdUser] = useState("");

  function setField(e) {
    console.log(e.target.name);
    if (e.target.name === "userid") {
      setIdUser(e.target.value);
    } else if (e.target.name === "quizid") {
      setIdGame(e.target.value);
    }
  }
  return (
    <Page kind="narrow">
      <PageContent>
        <PageHeader title="Quiz Time" subtitle="Cliente" />
        <Card align="stretch" pad="small" gap="small">
          <CardBody pad="small">
            <Text textAlign="start" size="large" tip="informe o id do jogo">
              Id do jogo
            </Text>
            <TextInput
              name="quizid"
              icon={<Gamepad />}
              value={idGame}
              onChange={setField}
            />
            <Text textAlign="start" size="large" tip="informe o id do jogo">
              Seu nome
            </Text>
            <TextInput
              name="userid"
              value={idUser}
              icon={<User />}
              onChange={setField}
            />
          </CardBody>
          <CardFooter
            align="stretch"
            direction="row-responsive"
            justify="end"
            gap="none"
            pad="small"
          >
            <Button
              label="CONECTAR"
              primary
              type="button"
              pad="small"
              style={{ borderRadius: "0px" }}
            />
          </CardFooter>
        </Card>
      </PageContent>
    </Page>
  );
};

export default Cliente;
