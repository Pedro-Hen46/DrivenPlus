import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import Back from "../images/back.png";
import { useUserData } from "../contexts/ContextUserData";
import { useUserLogged } from "../contexts/UserLoggedProvider";

export default function UsersPage() {
  const navigate = useNavigate();
  const { idUser } = useParams();

  const { infoUser } = useUserData();
  const { saveDataUser } = useUserLogged();

  return (
    <ContainerUsers>
      <BackArrow>
        <img onClick={() => navigate("/home")} src={Back} alt="Voltar a tela" />
      </BackArrow>
      <input value={saveDataUser.name} disabled="false" />
      <input value={saveDataUser.cpf} disabled="false" />
      <input value={saveDataUser.email} disabled="false" />
      <button onClick={() => navigate(`/users/${infoUser.id}/update`)}>
        ATUALIZAR
      </button>
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

    :disabled{
      background-color: darkgray;
      cursor: not-allowed; 
    }
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
