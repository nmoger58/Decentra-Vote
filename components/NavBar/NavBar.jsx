import React, { useContext, useState } from "react";
import Style from "./NavBar.module.css";
import Image from "next/image";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { VotingContext } from "../../context/Voter";
import Link from "next/link";
import Button from "../Button/Button";

const NavBar = () => {
  const { 
    currentAccount, 
    connectWallet, 
    isVotingStarted, 
    setIsVotingStarted, 
    error 
  } = useContext(VotingContext);
  
  const [openNav, setOpenNav] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const openNavigation = () => {
    setOpenNav(!openNav);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={Style.navbar}>
      {/* Error Message with Animation */}
      {error !== "" && (
        <div className={Style.message_box}>
          <div className={Style.message}>
            <p>{error}</p>
            <div className={Style.message_close}>×</div>
          </div>
        </div>
      )}

      <div className={Style.navbar_box}>
        {/* Logo Section */}
        <div className={Style.title}>
          <Link href={{ pathname: '/' }}>
            <div className={Style.logo_container}>
              <img 
                src='https://acegif.com/wp-content/uploads/loading-1.gif' 
                alt="logo" 
                width={50} 
                height={50}
                className={Style.logo}
              />
              <span className={Style.brand_text}>DecentraVote</span>
            </div>
          </Link>
        </div>

        {/* Connect Section */}
        <div className={Style.connect}>
          {currentAccount ? (
            <div 
              className={Style.connect_box}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className={Style.account_info}>
                <div className={Style.account_avatar}>
                  <div className={Style.avatar_dot}></div>
                </div>
                <div className={Style.account_details}>
                  <p className={Style.account_address}>
                    {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                  </p>
                  <span className={Style.account_status}>Connected</span>
                </div>
                <div className={Style.lock_icon_container}>
                  {openNav ? (
                    <AiFillUnlock 
                      className={`${Style.icon} ${Style.unlock_icon}`} 
                      onClick={openNavigation} 
                    />
                  ) : (
                    <AiFillLock 
                      className={`${Style.icon} ${Style.lock_icon}`} 
                      onClick={openNavigation} 
                    />
                  )}
                </div>
              </div>

              {/* Animated Navigation Links */}
              <div className={`${Style.navbar_box_links} ${openNav ? Style.links_open : Style.links_closed}`}>
                <div className={Style.nav_backdrop}></div>
                <Link href={{ pathname: '/' }} className={Style.nav_link}>
                  <span className={Style.nav_icon}>🏠</span>
                  <span>Home</span>
                </Link>
                <Link href={{ pathname: '/candidate-regisration' }} className={Style.nav_link}>
                  <span className={Style.nav_icon}>👤</span>
                  <span>Candidate Registration</span>
                </Link>
                <Link href={{ pathname: '/allowed-voters' }} className={Style.nav_link}>
                  <span className={Style.nav_icon}>✅</span>
                  <span>Allowed Voters</span>
                </Link>
                <Link href={{ pathname: '/voterList' }} className={Style.nav_link}>
                  <span className={Style.nav_icon}>📋</span>
                  <span>{isVotingStarted ? "End Voting" : "List of Voters"}</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className={Style.connect_wallet_container}>
              <Button onClick={connectWallet} className={Style.connect_button}>
                <span className={Style.button_text}>Connect Wallet</span>
                <div className={Style.button_glow}></div>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;