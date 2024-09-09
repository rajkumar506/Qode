import React from "react";
import { ReactNode } from "react";
import "../App.css"
import Modal from 'react-modal';
import { useStarsContext } from "./Layout";
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%', 
      transform: 'translate(-50%, -50%)',
      width:"50%"
    },
  };
export const ModalComponent = ()=>{
  const {currentClickedStarData,isModalOpen,setIsModalOpen} = useStarsContext()

  const handleModalOpen = ()=>{
    setIsModalOpen(false)
  }
    return(
        <Modal  isOpen={isModalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={handleModalOpen}
        style={customStyles}
        contentLabel="Example Modal">
           <h2 style={{marginTop:"0px"}}>Hello</h2>
          
             <div className="modal-info-container">
                  <div className="modal-photo">

                  </div>
                <div className="info-container">
                <div className="info">Height: {currentClickedStarData?.height}</div>
                <div  className="info">Mass: {currentClickedStarData?.mass}</div>
                <div  className="info">Hair color: {currentClickedStarData?.hair_color}</div>
                <div  className="info">Skin Color: {currentClickedStarData?.skin_color}</div>
                <div  className="info">Birth Year: {currentClickedStarData?.birth_year}</div>
                <div  className="info">Eye Color: {currentClickedStarData?.eye_color}</div>
                <div  className="info">Films Number: {currentClickedStarData?.films.length}</div>

                </div>
                </div>
                <button onClick={()=>setIsModalOpen(false)}>close</button>
        </Modal>
    )
}