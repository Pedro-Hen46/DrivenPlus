import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Back from "../images/back.png";
import { useUserLogged } from "../contexts/UserLoggedProvider";
import { useUserData } from "../contexts/ContextUserData";

export default function UsersPage() {
  const navigate = useNavigate();
  const { saveDataUser } = useUserLogged();
  const { addInfoOnUser } = useUserData();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCPF] = useState("");
  const [name, setName] = useState("");

  function sendAlterationsToApi(event) {
    event.preventDefault();
    const decision = window.confirm(
      "Tem certeza que deseja atualizar o seu cadastro? Você terá que logar no aplicativo novamente!"
    );
    if (decision) {
      if (
        email !== "" &&
        cpf !== "" &&
        name !== "" &&
        password !== "" &&
        newPassword !== ""
      ) {
        const userAlterations = {
          name: name,
          cpf: cpf,
          email: email,
          currentPassword: password,
          newPassword: newPassword,
        };
        const config = {
          headers: {
            Authorization: `Bearer ${saveDataUser.token}`,
          },
        };
        const promise = axios.put(
          "https://mock-api.driven.com.br/api/v4/driven-plus/users/",
          userAlterations,
          config
        );

        promise.then((response) => {
          addInfoOnUser(response.data);
          console.log(response.data);
          alert("Login alterado com sucesso");
          navigate("/");
        });
        promise.catch((error) => {
          alert(
            "Houve um erro no procedimento, tente novamente mais tarde ",
            error
          );
        });
      } else
        alert(
          "Por favor entre com todos os dados acima para mudar o seu cadastro..."
        );
    }
  }

  return (
    <ContainerUsers>
      <BackArrow>
        <img
          onClick={() => navigate(`/users/${saveDataUser.id}`)}
          src={Back}
          alt="Voltar a tela"
        />
      </BackArrow>
      <form onSubmit={(event) => {
          sendAlterationsToApi(event);
        }}>
        <input
          onChange={(e) => setName(e.target.value)}
          placeholder={saveDataUser.name}
        />
        <input
          type="number"
          onChange={(e) => setCPF(e.target.value)}
          placeholder={saveDataUser.cpf}
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder={saveDataUser.email}
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha Atual"
        />
        <input
          type="password"
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Nova Senha"
        />
        <button>SALVAR</button>
      </form>
    </ContainerUsers>
  );
}
const ContainerUsers = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  input {
    padding: 1rem;
    width: 90%;
    height: 52px;
    margin-top: 10px;
    border-radius: 5px;
    background-color: white;
  }

  button {
    width: 90%;
    height: 52px;
    background-color: #ff4791;
    border: thin solid #ff4791;
    margin-top: 20px;
    border-radius: 5px;
    color: white;

    font-family: "Roboto";
    font-weight: 500;
    font-size: large;

    :hover {
      cursor: pointer;
    }
  }
`;

const BackArrow = styled.div`
  position: fixed;
  top: 40px;
  left: 20px;

  img {
    width: 50px !important;
    height: 40px !important;

    :hover {
      cursor: pointer;
    }
  }
`;
