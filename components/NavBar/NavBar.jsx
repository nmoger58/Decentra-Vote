import React, { useContext, useState, useEffect } from "react";
import { AiFillLock, AiFillUnlock } from "react-icons/ai";
import { HiHome, HiUser, HiCheckCircle, HiClipboardList, HiMenuAlt3, HiX, HiAcademicCap } from "react-icons/hi";
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
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showError, setShowError] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSignIn = () => {
    // Add your sign-in logic here
    console.log("Sign In clicked");
  };

  const closeError = () => {
    setShowError(false);
  };

  useEffect(() => {
    if (error !== "") {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuOpen && !event.target.closest('.mobile-nav-container')) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [mobileMenuOpen]);

  const navigationLinks = [
    { href: "/", label: "Home", icon: HiHome },
    {href: "/vote", label: "Vote", icon: HiClipboardList },
    { href: "/candidate-regisration", label: "Candidate Registration", icon: HiUser },
    { href: "/allowed-voters", label: "Allowed Voters", icon: HiCheckCircle },
    { href: "/voterList", label: isVotingStarted ? "End Voting" : "List of Voters", icon: HiClipboardList },
    { href : "/milestone", label: "Milestones", icon: HiAcademicCap },
  ];

  return (
    <>
      <nav className="navbar">
        {/* Error Message */}
        {showError && error !== "" && (
          <div className="message-box">
            <div className="message">
              <p>{error}</p>
              <div className="message-close" onClick={closeError}>×</div>
            </div>
          </div>
        )}

        <div className="navbar-box">
          {/* Logo Section */}
          <div className="logo-section">
            <Link href="/" className="logo-link">
              <div className="logo-container">
                <div className="logo-icon">
                  <div className="vote-symbol">V</div>
                </div>
                <div className="brand-info">
                  <span className="brand-text">DecentraVote</span>
                  <span className="brand-subtitle">Blockchain Voting</span>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="desktop-nav-links">
            {navigationLinks.map((link, index) => {
              const IconComponent = link.icon;
              return (
                <Link key={index} href={link.href} className="desktop-nav-link">
                  <IconComponent className="nav-link-icon" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="navbar-right">
            {currentAccount ? (
              <div className="account-section">
                <div className="account-info">
                  <div className="account-avatar">
                    <div className="avatar-circle">
                      <span className="avatar-text">{currentAccount.slice(2, 4).toUpperCase()}</span>
                    </div>
                    <div className="status-indicator"></div>
                  </div>
                  <div className="account-details">
                    <p className="account-address">
                      {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                    </p>
                    <span className="account-status">Connected</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="auth-buttons">
                <button className="signin-button" onClick={handleSignIn}>
                  <span>Sign In</span>
                </button>
                <Button className="connect-button" onClick={connectWallet}>
                  <span className="button-text">Connect Wallet</span>
                  <div className="button-glow"></div>
                </Button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <div className="mobile-nav-container">
              <button 
                className={`mobile-toggle ${mobileMenuOpen ? 'active' : ''}`}
                onClick={toggleMobileMenu}
              >
                {mobileMenuOpen ? <HiX /> : <HiMenuAlt3 />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-nav ${mobileMenuOpen ? 'mobile-nav-open' : 'mobile-nav-closed'}`}>
          <div className="mobile-nav-content">
            {currentAccount && (
              <div className="mobile-account-info">
                <div className="account-avatar">
                  <div className="avatar-circle">
                    <span className="avatar-text">{currentAccount.slice(2, 4).toUpperCase()}</span>
                  </div>
                  <div className="status-indicator"></div>
                </div>
                <div className="account-details">
                  <p className="account-address">
                    {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
                  </p>
                  <span className="account-status">Connected</span>
                </div>
              </div>
            )}

            <div className="mobile-nav-links">
              {navigationLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <Link 
                    key={index} 
                    href={link.href} 
                    className="mobile-nav-link" 
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <IconComponent className="nav-link-icon" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>

            {!currentAccount && (
              <div className="mobile-auth-buttons">
                <button className="signin-button" onClick={handleSignIn}>
                  Sign In
                </button>
                <Button className="connect-button" onClick={connectWallet}>
                  Connect Wallet
                </Button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: rgba(249, 250, 251, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(29, 78, 216, 0.1);
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .navbar-box {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 80px;
        }

        .message-box {
          position: fixed;
          top: 80px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 1001;
          animation: slideDown 0.3s ease;
        }

        .message {
          background: #EF4444;
          color: white;
          padding: 14px 24px;
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(239, 68, 68, 0.3);
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 320px;
          font-weight: 500;
        }

        .message-close {
          cursor: pointer;
          font-size: 20px;
          font-weight: bold;
          opacity: 0.8;
          transition: opacity 0.2s;
          padding: 4px;
          border-radius: 4px;
        }

        .message-close:hover {
          opacity: 1;
          background: rgba(255, 255, 255, 0.1);
        }

        @keyframes slideDown {
          from {
            transform: translateX(-50%) translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }

        .logo-section {
          display: flex;
          align-items: center;
        }

        .logo-link {
          text-decoration: none;
          color: inherit;
        }

        .logo-container {
          display: flex;
          align-items: center;
          gap: 16px;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        .logo-container:hover {
          transform: scale(1.02);
        }

        .logo-icon {
          position: relative;
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #1D4ED8, #10B981);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(29, 78, 216, 0.3);
        }

        .vote-symbol {
          font-size: 24px;
          font-weight: 900;
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .brand-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .brand-text {
          font-size: 28px;
          font-weight: 800;
          background: linear-gradient(135deg, #1D4ED8, #64748B);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }

        .brand-subtitle {
          font-size: 12px;
          color: #64748B;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .desktop-nav-links {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .desktop-nav-link {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          color: #64748B;
          text-decoration: none;
          border-radius: 50px;
          font-weight: 500;
          font-size: 14px;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .desktop-nav-link::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(29, 78, 216, 0.1), rgba(16, 185, 129, 0.1));
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .desktop-nav-link:hover::before {
          opacity: 1;
        }

        .desktop-nav-link:hover {
          color: #1D4ED8;
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(29, 78, 216, 0.2);
        }

        .nav-link-icon {
          font-size: 18px;
          position: relative;
          z-index: 1;
        }

        .desktop-nav-link span {
          position: relative;
          z-index: 1;
        }

        .navbar-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .account-section {
          display: flex;
          align-items: center;
        }

        .account-info {
          display: flex;
          align-items: center;
          gap: 12px;
          background: white;
          padding: 12px 20px;
          border-radius: 50px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(29, 78, 216, 0.1);
          transition: all 0.3s ease;
        }

        .account-info:hover {
          box-shadow: 0 8px 32px rgba(29, 78, 216, 0.15);
          transform: translateY(-2px);
        }

        .account-avatar {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .avatar-circle {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #1D4ED8, #10B981);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .avatar-text {
          color: white;
          font-size: 14px;
          font-weight: 700;
        }

        .status-indicator {
          position: absolute;
          bottom: 2px;
          right: 2px;
          width: 10px;
          height: 10px;
          background: #10B981;
          border-radius: 50%;
          border: 2px solid white;
          box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
        }

        .account-details {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .account-address {
          font-size: 14px;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .account-status {
          font-size: 12px;
          color: #10B981;
          font-weight: 500;
        }

        .auth-buttons {
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .signin-button {
          background: white;
          color: #1D4ED8;
          border: 2px solid #1D4ED8;
          padding: 12px 24px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .signin-button:hover {
          background: #1D4ED8;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(29, 78, 216, 0.3);
        }

        .connect-button {
          background: linear-gradient(135deg, #1D4ED8, #10B981);
          color: white;
          border: none;
          padding: 12px 28px;
          border-radius: 50px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 4px 20px rgba(29, 78, 216, 0.3);
        }

        .connect-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(29, 78, 216, 0.4);
        }

        .button-glow {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .connect-button:hover .button-glow {
          left: 100%;
        }

        .mobile-nav-container {
          display: none;
        }

        .mobile-toggle {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          cursor: pointer;
          border-radius: 12px;
          transition: all 0.2s ease;
          background: white;
          border: 1px solid rgba(29, 78, 216, 0.1);
          color: #1D4ED8;
          font-size: 20px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .mobile-toggle:hover {
          background: rgba(29, 78, 216, 0.1);
          transform: scale(1.05);
        }

        .mobile-nav {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          background: white;
          border-top: 1px solid rgba(29, 78, 216, 0.1);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 999;
          max-height: calc(100vh - 80px);
          overflow-y: auto;
        }

        .mobile-nav-closed {
          transform: translateY(-100%);
          opacity: 0;
          visibility: hidden;
        }

        .mobile-nav-open {
          transform: translateY(0);
          opacity: 1;
          visibility: visible;
        }

        .mobile-nav-content {
          padding: 24px;
        }

        .mobile-account-info {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 20px;
          background: linear-gradient(135deg, rgba(29, 78, 216, 0.05), rgba(16, 185, 129, 0.05));
          border-radius: 16px;
          margin-bottom: 20px;
          border: 1px solid rgba(29, 78, 216, 0.1);
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          color: #111827;
          text-decoration: none;
          border-radius: 12px;
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .mobile-nav-link:hover {
          background: rgba(29, 78, 216, 0.08);
          color: #1D4ED8;
          transform: translateX(4px);
        }

        .mobile-auth-buttons {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 20px;
          border-top: 1px solid rgba(29, 78, 216, 0.1);
        }

        .mobile-auth-buttons .signin-button,
        .mobile-auth-buttons .connect-button {
          width: 100%;
          text-align: center;
          justify-content: center;
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .navbar-box {
            padding: 0 20px;
          }
          
          .desktop-nav-links {
            gap: 4px;
          }
          
          .desktop-nav-link {
            padding: 10px 16px;
            font-size: 13px;
          }
        }

        @media (max-width: 768px) {
          .navbar-box {
            padding: 0 16px;
            height: 70px;
          }

          .brand-text {
            font-size: 24px;
          }

          .brand-subtitle {
            font-size: 10px;
          }

          .desktop-nav-links {
            display: none;
          }

          .auth-buttons {
            display: none;
          }

          .account-section {
            display: none;
          }

          .mobile-nav-container {
            display: block;
          }

          .mobile-nav {
            top: 70px;
            max-height: calc(100vh - 70px);
          }

          .message {
            min-width: 280px;
            margin: 0 16px;
          }
        }

        @media (max-width: 480px) {
          .navbar-box {
            padding: 0 12px;
          }

          .brand-text {
            font-size: 20px;
          }

          .logo-container {
            gap: 12px;
          }

          .logo-icon {
            width: 40px;
            height: 40px;
          }

          .vote-symbol {
            font-size: 20px;
          }

          .mobile-nav-content {
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default NavBar;