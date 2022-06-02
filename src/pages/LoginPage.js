import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../images/LogoDriven.png";
import { Grid } from "react-loader-spinner";

import { useUserLogged } from "../contexts/UserLoggedProvider";
import { useUserData } from "../contexts/ContextUserData";

export default function LoginPage() {
  const { saveDataUserLogged } = useUserLogged();
  const {setInfoUser} = useUserData();

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  function sendDataUserToApi() {
    
    if (email !== "" && senha !== "") {
        
        setLoading(true);
        const promise = axios.post(
        "https://mock-api.driven.com.br/api/v4/driven-plus/auth/login",
        {
          email: email,
          password: senha,
        })

        promise.then( (response) => {
          saveDataUserLogged(response.data);
          setInfoUser(response.data);
            if (response.data.membership === null){
                navigate("/subscriptions")
            } else navigate("/home")
        })
        promise.catch( (error) => {
            alert("Usuario ou senha invalidos, por favor tente novamente, se não tiver cadastro crie um agora mesmo.")
            setLoading(false);
        })
        // promise.finally(setLoading(false)); // Quando terminar qualquer processo setar o loading como false novamente.
    } else alert("Por favor entre com seus dados para logar");
            
    
  }

  return (
    <Container>
      <img src={Logo} alt="Logo da Driven Plus" />
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="E-mail"
      />
      <input
        type="password"
        onChange={(e) => setSenha(e.target.value)}
        placeholder="Senha"
      />
      {loading ? <Grid width="40px" color="#ff4791"/> : <button onClick={() => sendDataUserToApi()}>ENTRAR</button> }
      <span onClick={() => navigate("/sign-up")}>
        Não tem conta? Cadastre-se agora
      </span>
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

  img {
    width: 95%;
    height: 85px;
    object-fit: contain;
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
    font-weight: 500;
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
