import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewsbySearch, setHistoryToLocalStorage } from "../store/slice";
import ListItem from "./ListItem";

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
    <>
      <input type="text" onChange={handleChange} />
      {historyList.map((item) => (
        <div key={item}>{item}</div>
      ))}
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
          // <div key={item._id} style={{ border: "1px solid black" }}>
          //   <div>{item.headline.main}</div>
          //   <div>{item.pub_date.replace("T", " ").substring(0, 19)}</div>

          //   <div>id: {item._id}</div>
          // </div>
        ))}
      </ul>
    </>
  );
};

export default MainPage;
