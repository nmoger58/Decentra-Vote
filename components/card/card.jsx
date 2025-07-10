import React from "react";
import Image from "next/image";
import Style from "./Card.module.css"; // Assuming you have a CSS module for styling
import images from "../../assets"; // Adjust the path as necessary
const Card = ({candidateArray,giveVote}) => {
  return (
    <div className={Style.card}>
      {
        candidateArray.map((el, i) => (
          <div key={i+1} className={Style.card_box}>
            <div className={Style.image}>
              <img src={el[3]} alt="Profile" />
            </div>
            <div className={Style.card_info}>
              <p>Name :{el[1]} #{el[2].toNumber()}</p>
              <p>{el[0]}</p>
              {/* <p>Position : {el}</p> */}
              <p>Address : {el[6].slice(0,30)}...</p>
              <p>Votes : {el[4].toNumber()}</p>
              
              <button onClick={() => giveVote({id : el[3].toNumber(),address :el[6] })}>Vote</button>
            </div>
          </div>
        ))
      }
    </div>
  )
};

export default Card;
