import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ListItem from "./ListItem";

const Main = styled.main`
  width: 100%;
`;

const ClipPage = () => {
  const clipNewsList = useSelector(({ history }) => history.clip);

  console.log("clipNewsList : ", clipNewsList);
  return (
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
  );
};

export default ClipPage;
