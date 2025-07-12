import React, { useState } from 'react';
import { CheckCircle, Vote, Users, Shield, Zap, Globe, Lock, Eye } from 'lucide-react';
import Navbar from '../components/NavBar/NavBar.jsx';
const ElectionMilestones = () => {
  const [selectedMilestone, setSelectedMilestone] = useState(null);

  const milestones = [
    {
      id: 1,
      year: "Ancient Times",
      title: "Hand-Raised Voting",
      description: "Citizens gathered in public spaces to vote by raising hands or using pottery shards (ostraca).",
      icon: <Users style={{ width: '24px', height: '24px' }} />,
      color: "#3B82F6",
      issues: ["Limited participation", "Public voting (no privacy)", "Easily manipulated"]
    },
    {
      id: 2,
      year: "1856",
      title: "Paper Ballot System",
      description: "Introduction of standardized paper ballots for secret voting.",
      icon: <Vote style={{ width: '24px', height: '24px' }} />,
      color: "#2563EB",
      issues: ["Ballot stuffing", "Manual counting errors", "Slow results"]
    },
    {
      id: 3,
      year: "1960s",
      title: "Mechanical Voting Machines",
      description: "Lever-operated machines introduced to speed up voting and reduce fraud.",
      icon: <Zap style={{ width: '24px', height: '24px' }} />,
      color: "#1D4ED8",
      issues: ["Mechanical failures", "Limited audit trails", "High maintenance costs"]
    },
    {
      id: 4,
      year: "1990s",
      title: "Electronic Voting Systems",
      description: "Digital touchscreen systems and optical scan machines modernized elections.",
      icon: <CheckCircle style={{ width: '24px', height: '24px' }} />,
      color: "#1E40AF",
      issues: ["Security vulnerabilities", "Software bugs", "Lack of transparency"]
    },
    {
      id: 5,
      year: "2000s",
      title: "Internet Voting Pilots",
      description: "Limited trials of online voting for military overseas and disabled voters.",
      icon: <Globe style={{ width: '24px', height: '24px' }} />,
      color: "#1E3A8A",
      issues: ["Cybersecurity risks", "Digital divide", "Trust concerns"]
    },
    {
      id: 6,
      year: "2025",
      title: "Decentralized Voting Application",
      description: "Your revolutionary blockchain-based voting system ensuring transparency, security, and accessibility.",
      icon: <Shield style={{ width: '24px', height: '24px' }} />,
      color: "#1E40AF",
      benefits: ["Immutable records", "End-to-end encryption", "Real-time transparency", "Global accessibility"],
      isNew: true
    }
  ];

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #EFF6FF 0%, #FFFFFF 50%, #DBEAFE 100%)',
    padding: '32px'
  };

  const headerStyle = {
    textAlign: 'center',
    marginBottom: '48px'
  };

  const titleStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: '16px'
  };

  const subtitleStyle = {
    fontSize: '1.25rem',
    color: '#1E40AF'
  };

  const timelineContainerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative'
  };

  const timelineLineStyle = {
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '4px',
    height: '100%',
    background: 'linear-gradient(to bottom, #93C5FD, #2563EB)',
    borderRadius: '2px'
  };

  const milestonesStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '48px'
  };

  const milestoneRowStyle = (index) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    flexDirection: index % 2 === 0 ? 'row' : 'row-reverse'
  });

  const timelineDotStyle = (milestone) => ({
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 10,
    width: '48px',
    height: '48px',
    borderRadius: '50%',
    backgroundColor: milestone.color,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    animation: milestone.isNew ? 'pulse 2s infinite' : 'none'
  });

  const contentCardStyle = (index) => ({
    width: '41.66%',
    paddingLeft: index % 2 === 0 ? '0' : '32px',
    paddingRight: index % 2 === 0 ? '32px' : '0'
  });

  const cardStyle = (milestone) => ({
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(8px)',
    borderRadius: '8px',
    padding: '24px',
    boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
    border: milestone.isNew ? '2px solid #2563EB' : '1px solid #DBEAFE',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.95)'
    }
  });

  const cardHeaderStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '12px'
  };

  const cardTitleStyle = {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    color: '#1E3A8A'
  };

  const yearBadgeStyle = (isNew) => ({
    padding: '4px 12px',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '500',
    backgroundColor: isNew ? '#2563EB' : '#EFF6FF',
    color: isNew ? 'white' : '#1E40AF'
  });

  const descriptionStyle = {
    color: '#1E40AF',
    marginBottom: '16px'
  };

  const expandedContentStyle = {
    marginTop: '16px',
    paddingTop: '16px',
    borderTop: '1px solid #DBEAFE'
  };

  const sectionHeaderStyle = (color) => ({
    color: color,
    fontWeight: '600',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px'
  });

  const listStyle = {
    color: '#1E40AF',
    fontSize: '0.875rem',
    listStyle: 'none',
    padding: 0,
    margin: 0
  };

  const listItemStyle = {
    display: 'flex',
    alignItems: 'flex-start',
    marginBottom: '4px'
  };

  const newFeatureStyle = {
    marginTop: '16px',
    padding: '12px',
    backgroundColor: '#EFF6FF',
    borderRadius: '8px',
    border: '1px solid #DBEAFE'
  };

  const newFeatureTextStyle = {
    color: '#1E40AF',
    fontSize: '0.875rem',
    fontWeight: '500'
  };

  const footerStyle = {
    marginTop: '64px',
    textAlign: 'center'
  };

  const footerCardStyle = {
    backgroundColor: '#EFF6FF',
    borderRadius: '8px',
    padding: '24px',
    border: '1px solid #DBEAFE'
  };

  const footerTitleStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1E3A8A',
    marginBottom: '16px'
  };

  const footerTextStyle = {
    color: '#1E40AF',
    maxWidth: '768px',
    margin: '0 auto',
    lineHeight: '1.6'
  };
  const keyframesStyle = `
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
  `;

  return (
    <>
      <style>{keyframesStyle}</style>
      <div style={containerStyle}>
        <Navbar></Navbar>
        <div style={timelineContainerStyle}>
          <div style={headerStyle}>
            <h1 style={titleStyle}>Evolution of Democratic Voting</h1>
            <p style={subtitleStyle}>From ancient assemblies to decentralized digital democracy</p>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={timelineLineStyle}></div>

            <div style={milestonesStyle}>
              {milestones.map((milestone, index) => (
                <div key={milestone.id} style={milestoneRowStyle(index)}>
                  <div style={timelineDotStyle(milestone)}>
                    {milestone.icon}
                  </div>

                  <div style={contentCardStyle(index)}>
                    <div
                      style={cardStyle(milestone)}
                      onClick={() => setSelectedMilestone(selectedMilestone === milestone.id ? null : milestone.id)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
                      }}
                    >
                      <div style={cardHeaderStyle}>
                        <h3 style={cardTitleStyle}>{milestone.title}</h3>
                        <span style={yearBadgeStyle(milestone.isNew)}>
                          {milestone.year}
                        </span>
                      </div>
                      
                      <p style={descriptionStyle}>{milestone.description}</p>

                      {selectedMilestone === milestone.id && (
                        <div style={expandedContentStyle}>
                          {milestone.issues && (
                            <div>
                              <h4 style={sectionHeaderStyle('#DC2626')}>
                                <Eye style={{ width: '16px', height: '16px' }} />
                                Challenges:
                              </h4>
                              <ul style={listStyle}>
                                {milestone.issues.map((issue, idx) => (
                                  <li key={idx} style={listItemStyle}>
                                    <span style={{ color: '#DC2626', marginRight: '8px' }}>•</span>
                                    {issue}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          
                          {milestone.benefits && (
                            <div>
                              <h4 style={sectionHeaderStyle('#059669')}>
                                <Lock style={{ width: '16px', height: '16px' }} />
                                Revolutionary Features:
                              </h4>
                              <ul style={listStyle}>
                                {milestone.benefits.map((benefit, idx) => (
                                  <li key={idx} style={listItemStyle}>
                                    <span style={{ color: '#059669', marginRight: '8px' }}>✓</span>
                                    {benefit}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      )}

                      {milestone.isNew && (
                        <div style={newFeatureStyle}>
                          <p style={newFeatureTextStyle}>
                            🚀 Click to explore the future of democratic participation
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={footerStyle}>
            <div style={footerCardStyle}>
              <h3 style={footerTitleStyle}>The Democratic Revolution</h3>
              <p style={footerTextStyle}>
                Your decentralized voting application represents the next evolutionary leap in democratic participation. 
                By leveraging blockchain technology, it solves centuries-old problems of trust, transparency, and accessibility 
                while maintaining the fundamental principles of secret ballot and voter privacy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ElectionMilestones;