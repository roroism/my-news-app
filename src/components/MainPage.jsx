import { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchNewsbySearch,
  setHistoryToLocalStorage,
  setPage,
  SEARCH_HISTORY_KEY,
} from "../store/slice";
import styled from "styled-components";
import ListItem from "./ListItem";

const Container = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 0 4%;
`;

export const HiddenEl = styled.div`
  display: block;
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip-path: polygon(0 0, 0 0, 0 0);
`;

export const HiddenH1 = HiddenEl.withComponent("h1");
export const HiddenH2 = HiddenEl.withComponent("h2");
export const HiddenH3 = HiddenEl.withComponent("h3");
export const HiddenH4 = HiddenEl.withComponent("h4");

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .search {
    margin-bottom: 1rem;
    position: relative;
    width: 50%;

    input {
      position: relative;
      float: left;
      &:focus {
        outline: none;
        border: 1px solid #666;
      }
      &::placeholder {
        color: #999;
        font-size: 1.3rem;
        font-weight: 300;
      }
      width: 100%;
      font-size: 1.5rem;
      padding: 0.4rem 1rem;
      border-style: none;
      box-sizing: border-box;
      border: 1px solid #999;
      border-radius: 3px;
      position: relative;
      z-index: 3;
    }
    .search_btn_wrapper {
      position: relative;
      float: left;
      #search_btn {
        height: 42.78px;
        width: 60px;
        position: absolute;
        z-index: 4;
        right: 0;
        top: 0;
        background: none;
        background-image: url(./img/icon_search.png);
        background-position: center;
        background-repeat: no-repeat;
        box-sizing: border-box;
        text-indent: -9999px;
        border: 1px solid transparent;
      }
    }
    .search_history_wrapper {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      padding-top: 2.55rem;
      box-sizing: border-box;
      border-radius: 3px;
      border: 1px solid #666;
      z-index: 2;
      display: none;
      &.on {
        display: block;
      }
      ul {
        width: 100%;
        background-color: #fff;
        padding: 5px 0;
        li {
          padding: 5px 1rem;
          &:hover {
            background-color: #f8f8f8;
          }
          a {
            padding: 0.5rem 0;
            font-size: 1.125rem;
            display: block;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
        }
      }
    }
  }
`;

const Main = styled.main`
  width: 100%;
`;

const VisualImageWrap = styled.div`
  margin: 0 auto;
  width: 80%;
  padding: 50px 0;
`;

const VisualImage = styled.img`
  width: 100%;
  display: block;
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
  const [toggleDisplay, setToggleDisplay] = useState(false);

  console.log("page : ", page);
  // const callbackWithSetHistoryToLocalStorage = useCallback(
  //   (callback) => {
  //     callback();
  //     dispatch(setHistoryToLocalStorage());
  //   },
  //   [searchwords, dispatch]
  // );

  useEffect(() => {
    if (searchwords === "") return;

    let setTime;

    if (searchwords) {
      setTime = setTimeout(() => {
        dispatch(setPage(0));
        // callbackWithSetHistoryToLocalStorage(() => {
        //   dispatch(fetchNewsbySearch({ q: searchwords, page: 1 }));
        // });
        dispatch(fetchNewsbySearch({ q: searchwords, page: 0 }));
      }, 500);
    }

    return () => {
      clearTimeout(setTime);
    };
  }, [searchwords, dispatch]);

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
    // console.log("scrollTop : ", scrollLocation);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    // console.log("isScrollBottom : ", isScrollBottom);
    if (isScrollBottom) {
      dispatch(setPage(page + 1));
      dispatch(fetchNewsbySearch({ q: searchwords, page: page + 1 }));
    }
  }, [isScrollBottom, dispatch]);

  const handleChange = (e) => {
    setSearchWords(e.target.value.trim());
  };

  return (
    <Container ref={containerRef}>
      <Main>
        <VisualImageWrap>
          <VisualImage src="../img/The_New_York_Times_logo.png" />
        </VisualImageWrap>
        <section>
          <HiddenH2>Search Area</HiddenH2>
          <SearchWrapper>
            <div className="search">
              <input
                type="text"
                onChange={handleChange}
                onFocus={() => {
                  if (historyList.length > 0) setToggleDisplay(true);
                }}
                onBlur={() => {
                  setToggleDisplay(false);
                }}
                placeholder="Search"
              />
              <div className="search_btn_wrapper">
                <button type="button" id="search_btn">
                  검색
                </button>
              </div>
              <div
                className={
                  "search_history_wrapper" + (toggleDisplay ? " on" : "")
                }
              >
                <ul className="search_history_list">
                  {historyList.map((item) => (
                    <li key={item}>
                      <div>{item}</div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </SearchWrapper>
        </section>
        <section>
          <HiddenH2>Contents Area</HiddenH2>
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
        </section>
      </Main>
    </Container>
  );
};

export default MainPage;
