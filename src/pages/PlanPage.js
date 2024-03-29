import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserLogged } from "../contexts/UserLoggedProvider";
import { useUserData } from "../contexts/ContextUserData";
import styled from "styled-components";
import Back from "../images/back.png";
import Close from "../images/close.png";

import Money from "../images/money.png";
import Report from "../images/report.png";
import { Grid } from "react-loader-spinner";

export default function PlanPage() {
  const navigate = useNavigate();

  const [dataPlan, setDataPlan] = useState({});
  const [assiner, setAssiner] = useState(false);
  const [loading, setLoading] = useState(false);

  const { idPlan } = useParams();
  const { addInfoOnUser } = useUserData();
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
    setLoading(true);
    promise.then((response) => {
      setDataPlan(response.data);
      setLoading(false);
    });
    promise.catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }, []);

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
        addInfoOnUser(response.data);
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
    <>
      {loading ? (
        <Carregando>
          <Grid width="200px" height="200px" color="#ff4791" />
        </Carregando>
      ) : (
        <ContainerPlan>
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

          <BackArrow>
            <img
              onClick={() => navigate("/subscriptions")}
              src={Back}
              alt="Voltar a tela"
            />
          </BackArrow>
          <InfoDadesHeader>
            <img src={dataPlan.image} alt="Logo do Plano selecionado" />
            <h2>{dataPlan.name}</h2>
          </InfoDadesHeader>
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
            : ""}
          <div>
            <img src={Money} alt="Logo preço" />
            <h3>Preço:</h3> <p></p>
          </div>
          <h3>
            R${" "}
            {dataPlan.perks !== undefined
              ? dataPlan.price.replace(".", ",")
              : ""}{" "}
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
              type="text"
              placeholder="Válidade MM/AA"
            />
          </div>
          <button onClick={() => setAssiner(true)}>ASSINAR</button>
        </ContainerPlan>
      )}
    </>
  );
}
const InfoDadesHeader = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column !important;

  img {
    width: 150px !important;
    height: 150px !important;
  }
  h2 {
    margin-top: 20px;
    color: white;
    font-family: "Roboto";
    font-weight: 700;
    font-size: 2rem;
  }
`;

const Carregando = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
  top: 0;
  z-index: 1 !important;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  padding: 4rem;

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
    margin-top: 5rem !important;
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
  height: 100vh;
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
    width: 200px;
    margin-left: 30%;
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
