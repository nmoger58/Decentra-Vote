import React, { useState } from "react";
import Image from "next/image";
import Style from "./Card.module.css";
import images from "../../assets";

const Card = ({ candidateArray, giveVote }) => {
  const [votingStates, setVotingStates] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleVote = async (candidateAddress, candidateId, index) => {
    setVotingStates(prev => ({ ...prev, [index]: true }));
    console.log("Voting for candidate:", candidateId, "at address:", candidateAddress);
    try {
      await giveVote(candidateAddress, candidateId);
    } catch (error) {
      console.error("Voting failed:", error);
    } finally {
      setVotingStates(prev => ({ ...prev, [index]: false }));
    }
  };

  return (
    <div className={Style.card}>
      {candidateArray.map((el, i) => (
        <div 
          key={i + 1} 
          className={`${Style.card_box} ${hoveredCard === i ? Style.card_hovered : ''}`}
          onMouseEnter={() => setHoveredCard(i)}
          onMouseLeave={() => setHoveredCard(null)}
        >
          <div className={Style.card_header}>
            <div className={Style.candidate_rank}>
              #{el[4].toNumber()}
            </div>
            <div className={Style.vote_count_badge}>
              <span className={Style.vote_number}>{el[2].toNumber()}</span>
              <span className={Style.vote_label}>votes</span>
            </div>
          </div>

          <div className={Style.image_container}>
            <div className={Style.image}>
              <img 
                src={el[3]} 
                alt={`${el[0]} Profile`} 
                className={Style.candidate_image}
              />
              <div className={Style.image_overlay}></div>
            </div>
          </div>

          <div className={Style.card_info}>
            <div className={Style.candidate_name}>
              <h3>{el[0]}</h3>
              <span className={Style.candidate_id}>ID: {el[4].toNumber()}</span>
            </div>
            
            <div className={Style.candidate_details}>
              <div className={Style.detail_item}>
                <span className={Style.detail_icon}>🎂</span>
                <div className={Style.detail_content}>
                  <span className={Style.detail_label}>Age</span>
                  <span className={Style.detail_value}>{el[1]} years</span>
                </div>
              </div>
              
              <div className={Style.detail_item}>
                <span className={Style.detail_icon}>📍</span>
                <div className={Style.detail_content}>
                  <span className={Style.detail_label}>Address</span>
                  <span className={Style.detail_value} title={el[6]}>
                    {el[6].slice(0, 20)}...
                  </span>
                </div>
              </div>
            </div>

            <div className={Style.vote_section}>
              <button
                onClick={() => handleVote(el[6], el[4].toNumber(), i)}
                className={`${Style.vote_button} ${votingStates[i] ? Style.voting : ''}`}
                disabled={votingStates[i]}
              >
                {votingStates[i] ? (
                  <div className={Style.voting_content}>
                    <div className={Style.spinner}></div>
                    <span>Voting...</span>
                  </div>
                ) : (
                  <div className={Style.vote_content}>
                    <span className={Style.vote_icon}>🗳️</span>
                    <span>Vote for {el[0]}</span>
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Card;