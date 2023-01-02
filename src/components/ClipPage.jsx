import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ListItem from "./ListItem";

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
      </Main>
    </Container>
  );
};

export default ClipPage;
