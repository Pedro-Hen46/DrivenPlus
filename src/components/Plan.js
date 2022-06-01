import styled from "styled-components";

export default function Plan({ data }) {
  console.log(data);
  return (
    <ContainerPlan>
      <img src={data.image} alt="Logo do plano" />
      <h3>R$ {data.price} </h3>
    </ContainerPlan>
  );
}

const ContainerPlan = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  width: 90%;
  height: 200px;
  margin-top: 10px;
  margin-bottom: 20px;
  padding: 2.5rem;
  border: 2px solid #7E7E7E;
  border-radius: 10px;

  background-color: #000000;
  transition: 0.1s all;
  :hover {
      box-shadow: 0px 0px 10px rgba(999,999,999,0.6);
      cursor: pointer;
  }

  h3{
      color: white;
      font-family: "Roboto";
      font-size: 30px;
  }
`;
