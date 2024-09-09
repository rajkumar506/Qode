import React, {
  useState,
  useEffect,
  useCallback,
  createContext,
  useContext,
  ChangeEvent,
} from "react";
import { fetchStarsData } from "../services/fetchStarsData";
import Card from "./card";
import { useDebounce } from "./Debounce";
import { ModalComponent } from "./Modal";
import { SearchInputBox } from "./SearchBox";
import { fetchImage } from "../services/fetchRandomImages";
import { createJson, filterData } from "../utility/CustomJson";

import "../App.css";
export const StarsContext = createContext<{
  data: any;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentClickedStarData: any;
  isModalOpen: boolean;
  setData: React.Dispatch<React.SetStateAction<any[]>>;
  tempDatabase: any[];
} | null>(null);
export const StarsList = () => {
  const [data, setData] = useState<Array<any>>([]);
  const [tempDatabase, setTempDataBase] = useState<Array<any>>([]);
  const [page, setPage] = useState<number>(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentClickedStarData, setCurrentClickedStarData] = useState<any>("");
  const [inputValue, setInputValue] = useState<string>("");
  const debounce = useDebounce();

  useEffect(() => {
    const fetchData = async () => {
      let fetchedData = await fetchStarsData(page);
      let newData = fetchedData?.results;
      let response = await fetchImage("https://picsum.photos/400/400.jpg", 10);
      let newJson = createJson(newData, response);
      let pureData = filterData([...data, ...newJson], inputValue);
      setTempDataBase((prev) => [...prev, ...newJson]);
      setData(pureData);
    };
    fetchData();
  }, [page]);

  const handlepage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  let returnedDebounce = useCallback(debounce(handlepage, 1000), [handlepage]);

  useEffect(() => {
    const handleScroll = () => {
      const { clientHeight, scrollHeight, scrollTop } =
        document.documentElement;
      if (clientHeight + scrollTop >= scrollHeight - 50) {
        returnedDebounce();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [returnedDebounce]);

  const handleModalOpen = (data: any) => {
    setCurrentClickedStarData(data);
    setIsModalOpen(true);
  };

  return (
    <StarsContext.Provider
      value={{
        data,
        setIsModalOpen,
        currentClickedStarData,
        isModalOpen,
        setData,
        tempDatabase,
      }}
    >
      <header className="App-header">
        header
        <SearchInputBox inputValue={inputValue} setInputValue={setInputValue} />
      </header>
      <div className="container">
        {isModalOpen ? (
          <ModalComponent />
        ) : (
          data &&
          data?.map((ele, index) => {
            return (
              <div key={index} onClick={() => handleModalOpen(ele)}>
                <Card url={ele.url} />
              </div>
            );
          })
        )}
      </div>
    </StarsContext.Provider>
  );
};

export const useStarsContext = () => {
  const context = useContext(StarsContext);
  if (!context) {
    throw "context is not there";
  }
  return context;
};
