import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserLogged } from "../contexts/UserLoggedProvider";
import { useUserData } from "../contexts/ContextUserData";
import ProfileUser from "../images/profile-user.png";

export default function HomePage() {
  const navigate = useNavigate();
  const { saveDataUser } = useUserLogged();
  const { infoUser, setInfoUser } = useUserData();

  function deletePlanDataFromApi() {
    const config = {
      headers: {
        Authorization: `Bearer ${saveDataUser.token}`,
      },
    };
    const decision = window.confirm(
      "Tem certeza que deseja cancelar o seu Plano ?"
    );

    if (decision) {
      const promise = axios.delete(
        "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions",
        config
      );

      promise.then(() => {
        alert(
          "Seu plano foi cancelado com sucesso, contrate outro agora mesmo..."
        );
        navigate("/subscriptions");
      });
      promise.catch((error) => {
        alert(
          "Tive um problema tecnico ao cancelar o seu Plano, por favor tente mais tarde ",
          error
        );
      });
    } // fim do if
  }

  return (
    <ContainerHome>
      <Header>
        <img src={infoUser.membership.image} alt="Imagem do Perfil" />
        <img
          onClick={() => navigate(`/users/${saveDataUser.id}`)}
          src={ProfileUser}
          alt="Imagem do Perfil"
          width="20px"
        />
      </Header>
      <h1>Olá, {saveDataUser.name}</h1>

      <ButtonsFromApi>
        {infoUser.membership.perks === undefined
          ? console.log("Eu sou o array undefined")
          : infoUser.membership.perks.map((perks, index) => (
              <a key={index} href={perks.link} target="_blank">
                <button key={index}>{perks.title}</button>
              </a>
            ))}
      </ButtonsFromApi>

      <ButtonsHomeContainer>
        <button onClick={() => navigate("/subscriptions")}>Mudar Plano</button>
        <button onClick={() => deletePlanDataFromApi()}>Cancelar Plano</button>
      </ButtonsHomeContainer>
    </ContainerHome>
  );
}
const ButtonsFromApi = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 5%;
  margin-bottom: 40%;

  button {
    width: 22rem;
    height: 50px;
    margin-bottom: 10px;
    border-radius: 5px;

    background-color: #ff4791;
    border: thin solid #ff4791;
    color: #ffffff;
    font-family: "Roboto";
    font-size: 18px;
    font-weight: 300;
    :hover {
      cursor: pointer;
      box-shadow: 0px 0px 10px rgba(999, 999, 999, 0.9);
    }
  }
`;
const ButtonsHomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  button {
    width: 22rem;
    height: 50px;
    margin-bottom: 10px;
    border-radius: 5px;
    background-color: #ff4791;
    border: thin solid #ff4791;
    color: #ffffff;
    font-family: "Roboto";
    font-size: 18px;
    font-weight: 300;

    :hover {
      cursor: pointer;
      box-shadow: 0px 0px 10px rgba(999, 999, 999, 0.9);
    }

    &:last-child {
      background-color: #ff4747;
      border: thin solid #ff4747;
      color: #ffffff;
      font-family: "Roboto";
      font-size: 18px;
      font-weight: 700;
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 8%;
  width: 100%;
  
  img {
    width: 100px;
    height: 100px;

    :last-child {
      width: 50px;
      height: 50px;
      :hover {
        cursor: pointer;
      }
    }
  }
`;

const ContainerHome = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  flex-direction: column;
  align-items: center;

  h1 {
    margin-top: 30px;
    color: white;
    font-family: "Roboto";
    font-size: 28px;
  }
`;
