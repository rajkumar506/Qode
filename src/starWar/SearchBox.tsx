import React,{useState,ChangeEvent, useCallback} from "react";
import { useDebounce } from "./Debounce";
import { useStarsContext } from "./Layout";
import { filterData } from "../utility/CustomJson";

interface propTypes{
  inputValue:string,
  setInputValue:React.Dispatch<React.SetStateAction<string>>
}
export const SearchInputBox = ({inputValue,setInputValue}:propTypes)=>{
    const debounce = useDebounce();
    const {setData,data,tempDatabase}=useStarsContext()
    const handleSearch = (e: ChangeEvent<HTMLInputElement>)=>{
        setInputValue(e.target.value)
        returnedDebounce(e.target.value);
     }
  
     const returnedDebounce = useCallback(debounce((value: string) => {
     
        const filtered = filterData(tempDatabase, value);
        setData(filtered);
      }, 3000),[data])
    return (
        <input type="text" value={inputValue} placeholder="search here" onChange={(e)=>handleSearch(e)} />
    )
}