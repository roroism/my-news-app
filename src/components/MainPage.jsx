import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsbySearch, setHistoryToLocalStorage } from "../store/slice";
import styled from "styled-components";
import ListItem from "./ListItem";

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 0 4%;
`;

const MainPage = () => {
  const [searchwords, setSearchWords] = useState();
  const historyList = useSelector(({ history }) => history.history);
  const newsList = useSelector(({ news }) => news.news);
  const [page, setPage] = useState("1");
  const dispatch = useDispatch();

  const callbackWithSetHistoryToLocalStorage = useCallback(
    (callback) => {
      callback();
      dispatch(setHistoryToLocalStorage());
    },
    [dispatch]
  );

  useEffect(() => {
    let setTime;

    if (searchwords) {
      setTime = setTimeout(() => {
        callbackWithSetHistoryToLocalStorage(() => {
          dispatch(fetchNewsbySearch({ q: searchwords, page }));
        });
      }, 500);
    }

    return () => {
      clearTimeout(setTime);
    };
  }, [searchwords, callbackWithSetHistoryToLocalStorage]);

  const handleChange = (e) => {
    setSearchWords(e.target.value);
  };

  return (
    <Container>
      <input type="text" onChange={handleChange} />
      {historyList.map((item) => (
        <div key={item}>{item}</div>
      ))}
      <main>
        <ul>
          {newsList.map((item) => (
            <ListItem
              key={item._id}
              id={item._id}
              main={item.headline.main}
              date={item.pub_date}
              section={item.section_name}
              multimedia={item.multimedia}
              web_url={item.web_url}
            />
          ))}
        </ul>
      </main>
    </Container>
  );
};

export default MainPage;
