import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNewsbySearch,
  setHistoryToLocalStorage,
  setPage,
} from "../store/slice";
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

const MainPage = () => {
  const [searchwords, setSearchWords] = useState();
  // const [page, setPage] = useState(1);
  const [isScrollBottom, setIsScrollBottom] = useState(false);
  const page = useSelector(({ news }) => news.page);
  const historyList = useSelector(({ history }) => history.history);
  const newsList = useSelector(({ news }) => news.news);
  const dispatch = useDispatch();
  const containerRef = useRef();
  console.log("page : ", page);
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
        dispatch(setPage(1));
        callbackWithSetHistoryToLocalStorage(() => {
          dispatch(fetchNewsbySearch({ q: searchwords, page: 1 }));
        });
      }, 500);
    }

    return () => {
      clearTimeout(setTime);
    };
  }, [searchwords, callbackWithSetHistoryToLocalStorage, dispatch]);

  const handleScroll = () => {
    // if (containerRef.current) {
    // const { scrollHeight, offsetHeight, scrollTop } = containerRef.current;

    // const offset = 50;

    // setIsScrollBottom(scrollHeight - offsetHeight - scrollTop < offset);
    // console.log("scrollTop : ", scrollTop);
    // }
    let scrollLocation = document.documentElement.scrollTop; // 현재 스크롤바 위치
    let windowHeight = window.innerHeight; // 스크린 창
    let fullHeight = document.body.scrollHeight; //  margin 값은 포함 x
    const offset = 500;
    setIsScrollBottom(scrollLocation + windowHeight >= fullHeight - offset);
    console.log("scrollTop : ", scrollLocation);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    console.log("isScrollBottom : ", isScrollBottom);
    if (isScrollBottom) {
      dispatch(setPage(page + 1));
      dispatch(fetchNewsbySearch({ q: searchwords, page: page + 1 }));
    }
  }, [isScrollBottom, dispatch]);

  const handleChange = (e) => {
    setSearchWords(e.target.value);
  };

  return (
    <Container ref={containerRef}>
      <input type="text" onChange={handleChange} />
      {historyList.map((item) => (
        <div key={item}>{item}</div>
      ))}
      <Main>
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
      </Main>
    </Container>
  );
};

export default MainPage;
