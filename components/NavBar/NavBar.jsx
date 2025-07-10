import React, { useContext, useState } from "react";
import Style from "./NavBar.module.css"; // Assuming you have a CSS module for styling
import Image from "next/image";
import {AiFillLock,AiFillUnlock} from "react-icons/ai";
import { VotingContext } from "../../context/Voter";
import Link from "next/link";
import Button from "../Button/Button";
const NavBar = () => {
  const { currentAccount, connectWallet, isVotingStarted, setIsVotingStarted,error } = useContext(VotingContext);
  const [openNav,setOpenNav] = useState(true);
  const openNavigation = () => {
    setOpenNav(!openNav);
  };
  return <div className={Style.navbar}>
    {
      error === ""?(
        ""
      ):(
       <div className={Style.message_box}>
           <div className={Style.message}>
            <p>{error}</p>
           </div>
       </div> 
      )
    }
  <div className={Style.navbar_box}>
    <div className={Style.title}>
      <Link href={{pathname : '/'}}>
        <img src='https://acegif.com/wp-content/uploads/loading-1.gif' alt="logo" width={80} height={80} ></img>
      </Link>
    </div>
    <div className={Style.connect}>
      {currentAccount ? (
        <div className={Style.connect_box}>
          <p>{currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}</p>
          {
            currentAccount && (
              <span>{openNav?(
                <AiFillUnlock className={Style.icon} onClick={()=>openNavigation()} />
              ):(
                <AiFillLock className={Style.icon} onClick={()=>openNavigation()} />
              )}</span>
            )
          }
          {
            openNav && (
              <div className={Style.navbar_box_links}>
                <Link href={{pathname : '/'}}>Home</Link>
                <Link href={{pathname : '/candidate-regisration'}}>Candidate Registration</Link>
                <Link href={{pathname : '/allowed-voters'}}>Allowed Voter</Link>
                <Link href={{pathname : '/voting'}}>{isVotingStarted?"End Voting":"Start Voting"}</Link>  
              </div>
            )
          }
        </div>
      ) : (
        <Button onClick={()=>connectWallet()}>Connect Wallet</Button>
      )}
    </div>
  </div>
  </div>
};

export default NavBar;
