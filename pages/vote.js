import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Countdown from "react-countdown";
import { VotingContext } from "../context/Voter.js";
import Style from "../styles/vote.module.css";
import Card from "../components/Card/Card";
import { useRouter } from "next/router";
import image from "../assets/candidate-1.jpg";

const VoteBarGraph = ({ candidateArray }) => {
  // Calculate total votes more safely
  const totalVotes = candidateArray.reduce((sum, candidate) => {
    const votes = parseInt(candidate.voteCount) || 0;
    return sum + votes;
  }, 0);

  // Sort candidates by vote count for better visualization
  const sortedCandidates = [...candidateArray].sort((a, b) => {
    const aVotes = parseInt(a.voteCount) || 0;
    const bVotes = parseInt(b.voteCount) || 0;
    return bVotes - aVotes;
  });

  return (
    <div className={Style.voteGraph}>
      <h3>Vote Distribution</h3>
      <div className={Style.totalVotes}>
        <p>Total Votes Cast: <strong>{totalVotes}</strong></p>
      </div>
      <div className={Style.graphContainer}>
        {sortedCandidates.map((candidate, index) => {
          const candidateVotes = parseInt(candidate.voteCount) || 0;
          const votePercentage = totalVotes > 0 ? (candidateVotes / totalVotes) * 100 : 0;
          
          return (
            <div key={candidate.id || index} className={Style.barItem}>
              <div className={Style.candidateInfo}>
                <span className={Style.candidateName}>
                  {candidate.name || `Candidate ${index + 1}`}
                </span>
                <span className={Style.voteCount}>
                  {candidateVotes} votes ({votePercentage.toFixed(1)}%)
                </span>
              </div>
              <div className={Style.barContainer}>
                <div
                  className={Style.bar}
                  style={{
                    width: `${Math.max(votePercentage, 1)}%`, // Minimum 1% width for visibility
                    backgroundColor: `hsl(${(index * 60) % 360}, 70%, 50%)`,
                    transition: 'width 0.5s ease-in-out'
                  }}
                />
                <span className={Style.percentage}>{votePercentage.toFixed(1)}%</span>
              </div>
            </div>
          );
        })}
      </div>
      {totalVotes === 0 && (
        <div className={Style.noVotes}>
          <p>No votes cast yet</p>
        </div>
      )}
    </div>
  );
};

const vote = () => {
  const {
    votingTitle,
    getNewCandidate,
    voterLength,
    candidateArray,
    giveVote,
    checkIfWalletIsConnected,
    candidateLength,
    currentAccount
  } = useContext(VotingContext);

  const [isLoading, setIsLoading] = useState(true);
  const [isVoting, setIsVoting] = useState(false);

  // Initialize app only once
  useEffect(() => {
    const initializeApp = async () => {
      try {
        await checkIfWalletIsConnected();
        setIsLoading(false);
      } catch (error) {
        console.error("Error initializing app:", error);
        setIsLoading(false);
      }
    };

    initializeApp();
  }, []); // Empty dependency array - runs only once

  // Fetch candidate data only when wallet is connected
  useEffect(() => {
    if (currentAccount && getNewCandidate) {
      getNewCandidate();
    }
  }, [currentAccount]); // Only runs when currentAccount changes

  // Enhanced vote function with refresh
  const handleVote = async (candidateAddress,candidateId) => {
    if (isVoting) return; // Prevent multiple votes
    
    setIsVoting(true);
    try {
      await giveVote(candidateAddress,candidateId);
      // Refresh candidate data after voting
      if (getNewCandidate) {
        setTimeout(() => {
          getNewCandidate();
        }, 3000); // Wait 3 seconds for blockchain confirmation
      }
    } catch (error) {
      console.error("Error voting:", error);
    } finally {
      setIsVoting(false);
    }
  };

  // Manual refresh function
  const handleRefresh = () => {
    if (getNewCandidate && currentAccount) {
      getNewCandidate();
    }
  };

  if (isLoading) {
    return (
      <div className={Style.home}>
        <div className={Style.loading}>
          <p>Loading voting data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={Style.home}>
      {currentAccount && (
        <div className={Style.winner}>
          <div className={Style.winner_info}>
            <div className={Style.candidate_list}>
              <p>
                No of Candidates: <span>{candidateLength}</span>
              </p>
            </div>
            <div className={Style.candidate_list}>
              <p>
                No of Voters: <span>{voterLength}</span>
              </p>
            </div>
          </div>
          <div className={Style.winner_message}>
            <small>
              <Countdown date={Date.now() + 1000000} />
            </small>
          </div>
          <div className={Style.refreshButton}>
            <button 
              onClick={handleRefresh}
              className={Style.refreshBtn}
              disabled={isVoting}
            >
              {isVoting ? "Processing..." : "Refresh Data"}
            </button>
          </div>
        </div>
      )}
      
      <div className={Style.contentContainer}>
        <div className={Style.cardsSection}>
          <Card 
            candidateArray={candidateArray} 
            giveVote={handleVote}
            isVoting={isVoting}
          />
        </div>
        
        <div className={Style.graphSection}>
          <VoteBarGraph candidateArray={candidateArray} />
        </div>
      </div>
    </div>
  );
};

export default vote;