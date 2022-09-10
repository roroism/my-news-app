import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHistoryToLocalStorage } from "../store/slice";

const MainPage = () => {
  const [searchwords, setSearchWords] = useState();
  const historyList = useSelector(({ history }) => history.history);
  const dispatch = useDispatch();

  const callbackWithSetHistoryToLocalStorage = useCallback(
    (callback) => {
      callback();
      dispatch(setHistoryToLocalStorage());
    },
    [dispatch]
  );

  useEffect(() => {
    const setTime = setTimeout(() => {
      callbackWithSetHistoryToLocalStorage(() => {
        console.log("searchwords : ", searchwords);
      });
    }, 500);

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
    </>
  );
};

export default MainPage;
