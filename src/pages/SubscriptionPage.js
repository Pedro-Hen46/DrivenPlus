import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import Plan from "../components/Plan";

import { useUserLogged } from "../contexts/UserLoggedProvider";
import { Grid } from "react-loader-spinner";


export default function SubscriptionPage() {

  const [planFromApi, setPlanFromApi] = useState([{}]);
  const { saveDataUser } = useUserLogged();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    const config = {
      headers: {
        Authorization: `Bearer ${saveDataUser.token}`,
      },
    };

    const promise = axios.get(
      "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships",
      config
    );
    setLoading(true);
    promise.then((response) => {
      setLoading(false);
      setPlanFromApi(response.data);
      
    });
    promise.catch((error) => {
      console.log(error);
    });
  }, [saveDataUser.token]); // Final do Use effect

  return (
    <Container>
      <h1>Escolha o seu plano</h1>
      {loading === false ? (
        planFromApi.length === 0 ? (
          ""
        ) : (
          planFromApi.map((plano, index) => <Plan data={plano} key={index} />)
        )
      ) : (
        <Carregando><Grid width="200px" height="200px" color="#ff4791" /></Carregando>
      )}

    </Container>
  );
}
const Carregando = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
  
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;

  h1 {
    color: #ffffff;
    font-family: "Roboto";
    font-size: 32px;
  }
`;
