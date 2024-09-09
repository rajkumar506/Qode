import React,{useState,useContext,useEffect} from "react";
import "../App.css"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useStarsContext } from "./Layout";
interface urlType{
    url:string
}
 const Card = ({url}:urlType)=>{
 const {setIsModalOpen,currentClickedStarData} = useStarsContext()
    const header="New header"
    return (
        <div className="card-container" >
         <LazyLoadImage
          effect="blur"
          wrapperProps={{
                          style: {transitionDelay: "1s"},
          }}
      alt="Image"
      src={url} 
      />
        </div>
    )
}

export default Card