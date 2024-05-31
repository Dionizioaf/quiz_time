import React, { useEffect, useState } from "react";
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
  Notification,
} from "grommet";
import { Gamepad, User } from "grommet-icons";

import { getEnv } from "../config/environments.js";

const Cliente = () => {
  const apiUrl = getEnv("api_url");

  const [idGame, setIdGame] = useState("");
  const [idUser, setIdUser] = useState({ id: 0, name: "" });
  const [responseMessage, setResponseMessage] = useState("");
  const [toast, setToast] = useState(false);

  useEffect(() => {
    let userstate = localStorage.getItem("user");

    if (userstate?.id !== undefined && userstate?.name !== undefined) {
      setIdUser(userstate.id, userstate.name);
    }
  }, []);

  useEffect(() => {
    setToast(false);
    setToast(true);
  }, [responseMessage]);
  function setField(e) {
    console.log(e.target.name);
    if (e.target.name === "userid") {
      setIdUser({
        ...idUser,
        name: e.target.value,
      });
    } else if (e.target.name === "quizid") {
      setIdGame({
        ...idGame,
        id: e.target.value,
      });
    }
  }

  const handleLogin = async () => {
    setResponseMessage("Registrando, aguarde...");
    try {
      let bodyContent = {
        id: idUser.id.toString(),
        name: idUser.name.toString(),
      };
      const response = await fetch(apiUrl + "/api/client/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyContent),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setResponseMessage(result.message);
      if (result.uuid !== undefined) {
        const r = {
          name: result.name,
          id: result.uuid,
        };
        setIdUser(r);
        localStorage.setItem("user", r);

        await handleGameConnection();
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("An error occurred");
    }
  };

  const handleGameConnection = async () => {
    setResponseMessage("Conectando ao jogo, aguarde...");
    try {
      let bodyContent = {
        id: idGame.id.toString(),
      };
      const response = await fetch(apiUrl + "/api/game/connect", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyContent),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      setResponseMessage(result.message);
      if (result.uuid !== undefined) {
        const r = {
          uuid: result.uuid,
          id: result.id,
        };
        setIdGame(r);
      }
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("An error occurred");
    }
  };

  return (
    <Page kind="narrow">
      {toast && (
        <Notification
          toast
          title=""
          message={responseMessage}
          onClose={() => setToast(false)}
        />
      )}
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
              value={idGame.id}
              onChange={setField}
            />
            <Text textAlign="start" size="large" tip="informe o id do jogo">
              Seu nome
            </Text>
            <TextInput
              name="userid"
              value={idUser.name}
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
              onClick={handleLogin}
            />
          </CardFooter>
        </Card>
      </PageContent>
    </Page>
  );
};

export default Cliente;
