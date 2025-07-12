import React, { useState, useEffect } from 'react';
import { ChevronDown, Vote, Shield, Users, Zap, Github, Twitter, Linkedin, ArrowRight, CheckCircle, Code, Terminal, Database, Lock } from 'lucide-react';
import Link from 'next/link';
const index = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const codeSnippets = [
    'contract DecentraVote {',
    '  mapping(address => bool) public hasVoted;',
    '  function vote(uint256 _candidate) public {',
    '    require(!hasVoted[msg.sender]);',
    '    hasVoted[msg.sender] = true;',
    '  }',
    '}'
  ];

  useEffect(() => {
    const text = codeSnippets[currentTextIndex];
    if (typedText.length < text.length) {
      const timeout = setTimeout(() => {
        setTypedText(text.slice(0, typedText.length + 1));
      }, 100);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % codeSnippets.length);
        setTypedText('');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [typedText, currentTextIndex]);

  const features = [
    {
      icon: <Lock style={{ width: '32px', height: '32px' }} />,
      title: "Cryptographic Security",
      description: "Military-grade encryption ensures vote integrity and voter privacy",
      code: "keccak256(abi.encodePacked(vote, nonce))"
    },
    {
      icon: <Database style={{ width: '32px', height: '32px' }} />,
      title: "Immutable Records",
      description: "Blockchain storage guarantees permanent, tamper-proof voting records",
      code: "bytes32 voteHash = sha256(votingData)"
    },
    {
      icon: <Terminal style={{ width: '32px', height: '32px' }} />,
      title: "Smart Contract Logic",
      description: "Automated vote counting and validation through battle-tested smart contracts",
      code: "require(block.timestamp <= votingDeadline)"
    }
  ];

  const techStack = [
    { name: "Next.js", color: "blue-500", icon: "⚛️" },
    { name: "Solidity", color: "blue-400", icon: "💎" },
    { name: "Hardhat", color: "blue-600", icon: "🔨" },
    { name: "Pinata", color: "blue-300", icon: "📌" }
  ];

  const FloatingCard = ({ children, delay = 0 }) => (
    <div 
      className="floating-card"
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );

  const FloatingDots = () => (
    <div className="floating-dots">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="floating-dot"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );

  const CodeBlock = ({ code, language = "solidity" }) => (
    <div className="code-block">
      <div className="code-header">
        <div className="code-dot red"></div>
        <div className="code-dot yellow"></div>
        <div className="code-dot green"></div>
        <span className="code-language">{language}</span>
      </div>
      <code className="code-content">{code}</code>
    </div>
  );

  const styles = `
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* Hero Section */
    .hero-section {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
      position: relative;
      overflow: hidden;
    }

    .floating-dots {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      pointer-events: none;
      overflow: hidden;
    }

    .floating-dot {
      position: absolute;
      width: 8px;
      height: 8px;
      background: #bfdbfe;
      border-radius: 50%;
      opacity: 0.3;
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 0.8; }
    }

    .hero-content {
      text-align: center;
      z-index: 10;
      position: relative;
      transform: translateY(0);
      opacity: 1;
      transition: all 1s ease;
    }

    .hero-badge {
      color: #2563eb;
      font-size: 18px;
      font-family: 'Courier New', monospace;
      background: #dbeafe;
      padding: 8px 16px;
      border-radius: 24px;
      margin-bottom: 32px;
      display: inline-block;
    }

    .hero-title {
      font-size: 4rem;
      font-weight: bold;
      margin-bottom: 24px;
      color: #2563eb;
      font-family: 'Courier New', monospace;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 3rem;
      }
    }

    .hero-code-block {
      background: white;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      padding: 24px;
      max-width: 800px;
      margin: 0 auto 32px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      text-align: left;
    }

    .hero-code-comment {
      color: #3b82f6;
      margin-bottom: 8px;
      font-family: 'Courier New', monospace;
    }

    .hero-code-text {
      color: #1d4ed8;
      font-family: 'Courier New', monospace;
      font-size: 18px;
    }

    .hero-cursor {
      animation: blink 1s infinite;
      color: #2563eb;
    }

    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }

    .hero-subtitle {
      font-size: 1.5rem;
      margin-bottom: 32px;
      color: #2563eb;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      font-family: 'Courier New', monospace;
    }

    @media (max-width: 768px) {
      .hero-subtitle {
        font-size: 1.25rem;
      }
    }

    .hero-buttons {
      display: flex;
      gap: 16px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn-primary {
      background: #2563eb;
      color: white;
      padding: 16px 32px;
      border-radius: 8px;
      font-size: 18px;
      font-weight: bold;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .btn-primary:hover {
      background: #1d4ed8;
      transform: scale(1.05);
    }

    .btn-secondary {
      border: 2px solid #2563eb;
      color: #2563eb;
      background: white;
      padding: 16px 32px;
      border-radius: 8px;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .btn-secondary:hover {
      background: #2563eb;
      color: white;
      transform: scale(1.05);
    }

    .chevron-down {
      position: absolute;
      bottom: 40px;
      left: 50%;
      transform: translateX(-50%);
      animation: bounce 2s infinite;
      color: #2563eb;
    }

    @keyframes bounce {
      0%, 20%, 53%, 80%, 100% {
        transform: translateX(-50%) translateY(0);
      }
      40%, 43% {
        transform: translateX(-50%) translateY(-10px);
      }
      70% {
        transform: translateX(-50%) translateY(-5px);
      }
      90% {
        transform: translateX(-50%) translateY(-2px);
      }
    }

    /* Features Section */
    .features-section {
      padding: 80px 0;
      background: white;
      position: relative;
    }

    .section-title {
      text-align: center;
      margin-bottom: 64px;
    }

    .section-heading {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 24px;
      color: #2563eb;
      font-family: 'Courier New', monospace;
    }

    @media (max-width: 768px) {
      .section-heading {
        font-size: 2.5rem;
      }
    }

    .section-subtitle {
      font-size: 1.25rem;
      color: #3b82f6;
      max-width: 600px;
      margin: 0 auto;
      font-family: 'Courier New', monospace;
    }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 32px;
    }

    .floating-card {
      transform: translateY(0);
      opacity: 1;
      transition: all 1s ease;
    }

    .floating-card:hover {
      transform: translateY(-8px) scale(1.05);
    }

    .feature-card {
      background: white;
      border: 1px solid #bfdbfe;
      padding: 32px;
      border-radius: 8px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .feature-card:hover {
      border-color: #60a5fa;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .feature-icon {
      color: #2563eb;
      margin-bottom: 16px;
    }

    .feature-title {
      font-size: 1.5rem;
      font-weight: bold;
      margin-bottom: 16px;
      color: #2563eb;
      font-family: 'Courier New', monospace;
    }

    .feature-description {
      color: #6b7280;
      margin-bottom: 16px;
      line-height: 1.6;
    }

    .feature-code {
      background: #f0f9ff;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      padding: 12px;
    }

    .feature-code code {
      color: #1d4ed8;
      font-size: 14px;
      font-family: 'Courier New', monospace;
    }

    /* Technology Stack */
    .tech-section {
      padding: 80px 0;
      background: #f9fafb;
    }

    .tech-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 24px;
    }

    .tech-card {
      background: white;
      border: 2px solid #3b82f6;
      padding: 24px;
      border-radius: 8px;
      text-align: center;
      transition: all 0.3s ease;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .tech-card:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .tech-card.blue-500 {
      border-color: #3b82f6;
      color: #2563eb;
    }

    .tech-card.blue-400 {
      border-color: #60a5fa;
      color: #3b82f6;
    }

    .tech-card.blue-600 {
      border-color: #2563eb;
      color: #1d4ed8;
    }

    .tech-card.blue-300 {
      border-color: #93c5fd;
      color: #60a5fa;
    }

    .tech-icon {
      font-size: 2rem;
      margin-bottom: 8px;
    }

    .tech-name {
      font-size: 1.25rem;
      font-weight: bold;
      font-family: 'Courier New', monospace;
    }

    /* Code Demo */
    .code-demo-section {
      padding: 80px 0;
      background: white;
    }

    .code-block {
      background: #f9fafb;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      padding: 16px;
      font-family: 'Courier New', monospace;
      font-size: 14px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      max-width: 800px;
      margin: 0 auto;
    }

    .code-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }

    .code-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .code-dot.red {
      background: #ef4444;
    }

    .code-dot.yellow {
      background: #f59e0b;
    }

    .code-dot.green {
      background: #10b981;
    }

    .code-language {
      color: #2563eb;
      font-size: 12px;
      font-weight: bold;
      margin-left: 8px;
    }

    .code-content {
      color: #1d4ed8;
      white-space: pre-wrap;
      display: block;
    }

    /* Stats Section */
    .stats-section {
      padding: 80px 0;
      background: #f0f9ff;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;
      text-align: center;
    }

    .stat-card {
      background: white;
      border: 1px solid #bfdbfe;
      padding: 32px;
      border-radius: 8px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    }

    .stat-icon {
      font-size: 2.5rem;
      margin-bottom: 8px;
    }

    .stat-number {
      font-size: 3rem;
      font-weight: bold;
      color: #2563eb;
      margin-bottom: 8px;
      font-family: 'Courier New', monospace;
    }

    .stat-label {
      font-size: 1.25rem;
      color: #3b82f6;
      font-family: 'Courier New', monospace;
    }

    /* CTA Section */
    .cta-section {
      padding: 80px 0;
      background: linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%);
      color: white;
      text-align: center;
    }

    .cta-content {
      max-width: 600px;
      margin: 0 auto;
    }

    .cta-badge {
      color: #dbeafe;
      font-size: 18px;
      font-family: 'Courier New', monospace;
      background: #1e40af;
      padding: 8px 16px;
      border-radius: 24px;
      margin-bottom: 32px;
      display: inline-block;
    }

    .cta-title {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 24px;
      color: white;
      font-family: 'Courier New', monospace;
    }

    @media (max-width: 768px) {
      .cta-title {
        font-size: 2.5rem;
      }
    }

    .cta-subtitle {
      font-size: 1.25rem;
      color: #dbeafe;
      margin-bottom: 32px;
      font-family: 'Courier New', monospace;
    }

    .cta-button {
      background: white;
      color: #2563eb;
      padding: 16px 48px;
      border-radius: 8px;
      font-size: 1.25rem;
      font-weight: bold;
      border: none;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .cta-button:hover {
      background: #f0f9ff;
      transform: scale(1.05);
    }

    /* Footer */
    .footer {
      padding: 48px 0;
      background: white;
      border-top: 1px solid #bfdbfe;
    }

    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
    }

    .footer-logo {
      font-size: 1.5rem;
      font-weight: bold;
      color: #2563eb;
      font-family: 'Courier New', monospace;
    }

    .footer-social {
      display: flex;
      gap: 24px;
    }

    .footer-social svg {
      width: 24px;
      height: 24px;
      color: #2563eb;
      cursor: pointer;
      transition: color 0.3s ease;
    }

    .footer-social svg:hover {
      color: #1d4ed8;
    }

    .footer-bottom {
      margin-top: 32px;
      padding-top: 32px;
      border-top: 1px solid #bfdbfe;
      text-align: center;
      color: #3b82f6;
    }

    .footer-tech {
      font-family: 'Courier New', monospace;
    }

    .footer-copyright {
      margin-top: 8px;
      color: #6b7280;
    }

    @media (max-width: 768px) {
      .footer-content {
        flex-direction: column;
        text-align: center;
      }
      
      .hero-buttons {
        flex-direction: column;
        align-items: center;
      }
      
      .btn-primary,
      .btn-secondary {
        width: 100%;
        max-width: 300px;
        justify-content: center;
      }
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div style={{ minHeight: '100vh', background: 'white', color: '#1f2937', overflow: 'hidden' }}>
        {/* Hero Section */}
        <section className="hero-section">
          <FloatingDots />
          <div className="container">
            <div className="hero-content">
              <div style={{ marginBottom: '32px' }}>
                <span className="hero-badge">
                  $ ./deploy-democracy.sh
                </span>
              </div>
              <h1 className="hero-title">
                &gt; DecentraVote_
              </h1>
              <div className="hero-code-block">
                <div className="hero-code-comment">// Blockchain-Powered Voting System</div>
                <div className="hero-code-text">
                  {codeSnippets[currentTextIndex].slice(0, typedText.length)}
                  <span className="hero-cursor">|</span>
                </div>
              </div>
              <p className="hero-subtitle">
                /* Secure, Transparent, Decentralized Voting */
              </p>
              <div className="hero-buttons">
                <Link href='/vote'>
                <button className="btn-primary">
                  <Terminal style={{ width: '20px', height: '20px' }} />
                  Start Voting
                  <ArrowRight style={{ width: '20px', height: '20px' }} />
                </button></Link>
                <Link href='https://github.com/nmoger58/Decentra-Vote'>
                <button className="btn-secondary">
                  <Code style={{ width: '20px', height: '20px' }} />
                  View Source
                </button></Link>
              </div>
            </div>
          </div>
          <div className="chevron-down">
            <ChevronDown style={{ width: '32px', height: '32px' }} />
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <div className="container">
            <div className="section-title">
              <h2 className="section-heading">
                {'<Features />'}
              </h2>
              <p className="section-subtitle">
                // Advanced cryptographic voting implementation
              </p>
            </div>
            <div className="features-grid">
              {features.map((feature, index) => (
                <FloatingCard key={index} delay={index * 200}>
                  <div className="feature-card">
                    <div className="feature-icon">
                      {feature.icon}
                    </div>
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-description">{feature.description}</p>
                    <div className="feature-code">
                      <code>{feature.code}</code>
                    </div>
                  </div>
                </FloatingCard>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="tech-section">
          <div className="container">
            <div className="section-title">
              <h2 className="section-heading">
                {'<TechStack />'}
              </h2>
              <p className="section-subtitle">
                // Built with industry-standard blockchain tools
              </p>
            </div>
            <div className="tech-grid">
              {techStack.map((tech, index) => (
                <FloatingCard key={index} delay={index * 150}>
                  <div className={`tech-card ${tech.color}`}>
                    <div className="tech-icon">{tech.icon}</div>
                    <h3 className="tech-name">{tech.name}</h3>
                  </div>
                </FloatingCard>
              ))}
            </div>
          </div>
        </section>

        {/* Code Demo Section */}
        <section className="code-demo-section">
          <div className="container">
            <div className="section-title">
              <h2 className="section-heading">
                {'<CodeDemo />'}
              </h2>
              <p className="section-subtitle">
                // Smart contract implementation preview
              </p>
            </div>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              <CodeBlock 
                code={`//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Create{
   using Counters for Counters.Counter;
   Counters.Counter public _voterId;
    Counters.Counter public _candidateId;

    address public votingOrganizer;

    struct Candidate{
        uint256 candidateId;
        string name;
        string age;
        uint256 voteCount;
        string image;
        address _address;
        string ipfs;
    }
    event CandidateCreate(
        uint256 candidateId,
        string name,
        string age,
        uint256 voteCount,
        string image,
        address _address,
        string ipfs
    );
    address[] public candidateAddress;
    mapping(address => Candidate) public candidates;


    address[] public votedVoters;
    address[] public votersAddress;
    mapping(address => Voter) public voters;
    struct Voter{
        uint256 voter_voterId;
        string voter_name;
        string voter_image;
        address voter_address;
        uint voter_allowed;
        bool voter_voted;
        uint voter_vote;
        string voter_ipfs;
    }
   event voterCreated(
        uint256 voter_voterId,
        string voter_name,
        string voter_image,
        address voter_address,
        uint voter_allowed,
        bool voter_voted,
        uint voter_vote,
        string voter_ipfs
    );

    constructor() {
        votingOrganizer = msg.sender;
    }
    
    function vote(address _candidateAddress,uint256 _candidateVoteId) external {
        Voter storage voter = voters[msg.sender];

        require(!voter.voter_voted, "You are voted");
        require(voter.voter_allowed!=0, "You have not allowed to vote");

        voter.voter_voted = true;
        voter.voter_vote = _candidateVoteId;

        votedVoters.push(msg.sender);
        // Console log the votedVoters array
        console.log("Voted Voters List: ");
        for (uint i = 0; i < votedVoters.length; i++) {
            console.log(votedVoters[i]);
        }
        candidates[_candidateAddress].voteCount += 1;
    }
    
    `}
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="stats-section">
          <div className="container">
            <div className="stats-grid">
              {[
                { number: "256-bit", label: "Encryption", symbol: "🔐" },
                { number: "0%", label: "Fraud Rate", symbol: "🛡️" },
                { number: "99.9%", label: "Uptime", symbol: "⚡" }
              ].map((stat, index) => (
                <FloatingCard key={index} delay={index * 200}>
                  <div className="stat-card">
                    <div className="stat-icon">{stat.symbol}</div>
                    <div className="stat-number">{stat.number}</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                </FloatingCard>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="container">
            <div className="cta-content">
              <div style={{ marginBottom: '32px' }}>
                <span className="cta-badge">
                  $ npm install @decentravote/core
                </span>
              </div>
              <h2 className="cta-title">
                Ready to Choose Democracy?
              </h2>
              <p className="cta-subtitle">
                // Initialize your decentralized voting system
              </p>
              <Link href='/vote'>
              <button className="cta-button">
                <Terminal style={{ width: '24px', height: '24px' }} />
                Vote For Better Future
              </button></Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="footer-content">
              <div className="footer-logo">
                &gt; DecentraVote_
              </div>
              <div className="footer-social">
                <Github />
                <Twitter />
                <Linkedin />
              </div>
            </div>
            <div className="footer-bottom">
              <p className="footer-tech">// Built with Next.js, Solidity, Hardhat & Pinata Cloud</p>
              <p className="footer-copyright">© 2024 DecentraVote. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default index;