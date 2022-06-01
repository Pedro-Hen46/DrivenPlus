import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserLogged } from "../contexts/UserLoggedProvider";
import styled from "styled-components";
import Back from "../images/back.png";
import Close from "../images/close.png";

import Money from "../images/money.png";
import Report from "../images/report.png";

export default function PlanPage({ setData }) {
  const navigate = useNavigate();

  const [dataPlan, setDataPlan] = useState({});
  const [assiner, setAssiner] = useState(false);

  const { idPlan } = useParams();
  const { saveDataUser } = useUserLogged();

  //Controle de dados do Input
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [securityNumber, setSecurityNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${saveDataUser.token}`,
      },
    };

    const promise = axios.get(
      `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${idPlan}`,
      config
    );

    promise.then((response) => {
      setDataPlan(response.data);
    });

    promise.catch((error) =>
      alert("Deu um erro ao acessar por favor tente novamente: ", error)
    );
  }, [saveDataUser.token, idPlan]);

  //   console.log(dataPlan);

  function SendPlanAssinerToApi() {
    if (
      //Check nos inputs, se estiverem com dados executa...
      cardNumber !== "" &&
      expirationDate !== "" &&
      cardName !== "" &&
      securityNumber !== ""
    ) {
      const userPayment = {
        membershipId: dataPlan.id,
        cardName: cardName,
        cardNumber: cardNumber,
        securityNumber: securityNumber,
        expirationDate: expirationDate,
      };
      console.log(userPayment);
      const config = {
        headers: {
          Authorization: `Bearer ${saveDataUser.token}`,
        },
      };

      const promise = axios.post(
        "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions",
        userPayment,
        config
      );

      promise.then((response) => {
        console.log(response.data);
        setData(response.data);
        alert("Parabens seu pagamento foi feito com sucesso!");
        navigate("/home");
      });
      promise.catch((error) => {
        alert(
          "Ocorreu um erro durante o seu pagamento, tente novamente mais tarde ",
          error
        );
      });
    } else alert("Por favor preencha os dados corretamente.");
  }

  return (
    <ContainerPlan>
      <BackArrow>
        <img
          onClick={() => navigate("/subscriptions")}
          src={Back}
          alt="Voltar a tela"
        />
      </BackArrow>
      <img src={dataPlan.image} alt="Logo do Plano selecionado" />
      <h2>{dataPlan.name}</h2>
      <div>
        <img src={Report} alt="Benefícios" />
        <h3>Benefícios:</h3>
      </div>
      {dataPlan.perks !== undefined
        ? dataPlan.perks.map((perks, index) => (
            <h3 key={index}>
              {index + 1}. {perks.title}{" "}
            </h3>
          ))
        : console.log("Estou carregando o map")}
      <div>
        <img src={Money} alt="Logo preço" />
        <h3>Preço:</h3> <p></p>
      </div>
      <h3>
        R${" "}
        {dataPlan.perks !== undefined ? dataPlan.price.replace(".", ",") : ""}{" "}
        cobrados mensalmente
      </h3>

      <input
        onChange={(e) => setCardName(e.target.value)}
        type="text"
        placeholder="Nome impresso no cartão"
      />
      <input
        onChange={(e) => setCardNumber(e.target.value)}
        type="number"
        placeholder="Digitos do cartão"
      />
      <div>
        <input
          onChange={(e) => setSecurityNumber(e.target.value)}
          type="number"
          placeholder="Código de segurança"
        />
        <input
          onChange={(e) => setExpirationDate(e.target.value)}
          type="date"
          placeholder="Válidade"
        />
      </div>
      <button onClick={() => setAssiner(true)}>ASSINAR</button>

      {assiner ? (
        <AssinarDiv>
          <img
            onClick={() => setAssiner(false)}
            src={Close}
            alt="Voltar para tela de Payment"
          />
          <div>
            <h3>
              Tem certeza que deseja assinar o pacote {dataPlan.name} ? (R${" "}
              {dataPlan.perks !== undefined
                ? dataPlan.price.replace(".", ",")
                : ""}
              )
            </h3>
            <p>
              <button onClick={() => setAssiner(false)}>NÃO</button>
              <button onClick={() => SendPlanAssinerToApi()}>SIM</button>
            </p>
          </div>
        </AssinarDiv>
      ) : (
        ""
      )}
    </ContainerPlan>
  );
}
const BackArrow = styled.div`
  position: fixed;
  top: 10px;
  left: 38px;

  img {
    width: 50px !important;
    height: 40px !important;

    :hover {
      cursor: pointer;
    }
  }
`;

const AssinarDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 200vh;
  margin-top: -100px !important;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;

  img {
    width: 40px !important;
    height: 40px !important;

    position: fixed;
    top: 42px;
    right: 38px;

    :hover {
      cursor: pointer;
    }
  }

  div {
    width: 400px !important;
    margin-left: -4rem !important;
    padding: 2rem;
    height: 200px;
    border-radius: 5px;
    box-shadow: 0px 0px 10px rgba(999, 999, 999, 0.7);
    background-color: white;

    display: flex;
    flex-direction: column !important;
    justify-content: center !important;
    align-items: center !important;
    h3 {
      color: #000000 !important;
      font-family: "Roboto";
      font-weight: 500;
      font-size: 18px;
    }

    p {
      width: 100%;
      display: flex;
      margin-top: 20px;
      justify-content: space-around;
      button {
        width: 100px;
        :first-child {
          background-color: #cecece;
          border: thin solid #cecece;
        }
        :hover {
          cursor: pointer;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
        }
      }
    }
  }
`;

const ContainerPlan = styled.div`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  input {
    margin-top: 10px;
    border-radius: 5px;
    height: 55px;
    padding: 1rem;
    width: 100%;
  }
  img {
    width: 60%;
    margin-left: 6rem;
  }

  h2 {
    margin-top: 20px;
    color: white;
    font-family: "Roboto";
    font-weight: 700;
    font-size: 36px;

    margin-left: 4rem;
  }
  div {
    width: 100%;
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex;
    align-items: center;
    margin-bottom: 10px;

    img {
      margin-left: 0px;
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
    input {
      margin-top: -30px;
    }
  }

  h3 {
    color: white;
    font-family: "Roboto";
    font-weight: 300;
    font-size: 18px;
  }
  button {
    height: 55px;
    background-color: #ff4791;
    border: thin solid #ff4791;
    border-radius: 5px;
    color: #ffffff;
    font-family: "Roboto";
    font-weight: 500;
    font-size: 18px;

    :hover {
      box-shadow: 0px 0px 10px rgba(999, 999, 999, 0.7);
      cursor: pointer;
    }
  }
`;
