import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Grid } from "react-loader-spinner";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCPF] = useState(0);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  function sendDataToApi(event) {
    event.preventDefault();

    if (email !== "" && password !== 0 && cpf !== 0 && name !== "") {
      setLoading(true)
      const promise = axios.post(
        "https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up",
        {
          email: email,
          name: name,
          cpf: cpf,
          password: password,
        }
      );

      promise.then((response) => {
        alert("Cadastro realizado com sucesso");
        navigate("/")
      });
      promise.catch((error) => {
        if (error.message === "Request failed with status code 409") {
          alert("Email já está em uso por favor tente novamente com outro email.");
        } else alert("Deu falha no cadastro, tente novamente mais tarde.", error);
        
      });
    } else
      alert(
        "Por favor para finalizar o cadastro preciso que entre com os dados válidos"
      );
  }

  return (
    <Container>
      <form onSubmit={sendDataToApi}>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          type="number"
          onChange={(e) => setCPF(e.target.value)}
          placeholder="CPF"
        />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
        />
        {loading ? <Grid width="40px" color="#ff4791"/> : <button>CADASTRAR</button> }
      </form>
      <span onClick={() => navigate("/")}> Já tem uma conta? Clique aqui para logar</span>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: black;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  img {
    width: 95%;
    height: 85px;
    object-fit: cover;
    margin-bottom: 20px;
  }
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
    font-weight: 400;
    font-size: large;

    :hover {
      cursor: pointer;
    }
  }

  span {
    margin-top: 25px;
    color: #ffffff;
    font-family: "Roboto";
    font-weight: 200;
    font-size: 20px;
    transition: 0.3s all;

    :hover {
      font-size: 21px;
      cursor: pointer;
    }
  }
`;
