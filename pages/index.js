import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Countdown from "react-countdown";
import { VotingContext } from "../context/Voter.js";
import Style from "../styles/index.module.css";
import Card from "../components/Card/Card";
import { useRouter } from "next/router";
import image from "../assets/candidate-1.jpg";
const index = () => {
  const { votingTitle,getNewCandidate,voterLength,candidateArray,giveVote,checkIfWalletIsConnected,candidateLength,
    currentAccount
  } = useContext(VotingContext);
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);
  return <div className={Style.home}>{currentAccount && (
    <div className={Style.winner}>
      <div className={Style.winner_info}>
        <div className={Style.candidate_list}>
          <p>
            No candidate : <span>{candidateLength}</span>
          </p>
        </div>
        <div className={Style.candidate_list}>
          <p>
            No Voter : <span>{voterLength}</span>
          </p>
        </div>
      </div>
      <div className={Style.winner_message}>
        <small>
          <Countdown date={Date.now() + 1000000} />
        </small>
      </div>
    </div>
  )}
  <Card candidateArray={candidateArray} giveVote={giveVote}/>
  </div>
};

export default index;
