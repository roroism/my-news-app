import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ListItem from "./ListItem";
import { HiddenH2 } from "./MainPage";

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 0 4%;
`;

const Main = styled.main`
  width: 100%;
`;

const ClipPage = () => {
  const clipNewsList = useSelector(({ history }) => history.clip);

  console.log("clipNewsList : ", clipNewsList);
  return (
    <Container>
      <Main>
        <section>
          <HiddenH2>Clipped News Area</HiddenH2>
          <ul>
            {clipNewsList.map((item) => (
              <ListItem
                key={item.id}
                id={item.id}
                main={item.main}
                date={item.date}
                section={item.section}
                multimedia={item.multimedia}
                web_url={item.web_url}
              />
            ))}
          </ul>
        </section>
      </Main>
    </Container>
  );
};

export default ClipPage;
