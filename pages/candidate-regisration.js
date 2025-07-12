import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { fetchContract, VotingContext, setCandidate } from "../context/Voter.js";
import images from "../assets";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

const candidateRegistration = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    fileUrl: "",
    age: ""
  });
  const router = useRouter();

  const { uploadToIPFS, setCandidate, candidateArray } = useContext(VotingContext);
  
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      try {
        const url = await uploadToIPFS(file);
        setFileUrl(url);
        setFormInput((prev) => ({ ...prev, fileUrl: url }));
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  }, [uploadToIPFS]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    },
    maxFiles: 1,
  });

  const styles = `
    .create-voter {
      min-height: 100vh;
      background: linear-gradient(135deg, #f0f9ff 0%, #e0e7ff 100%);
      padding: 40px 20px;
      display: grid;
      grid-template-columns: 1fr 1fr 300px;
      gap: 32px;
      max-width: 1400px;
      margin: 0 auto;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    @media (max-width: 1200px) {
      .create-voter {
        grid-template-columns: 1fr;
        gap: 24px;
      }
    }

    /* Left Section - Candidate Info / Side Info */
    .voter-info {
      background: white;
      border: 1px solid #bfdbfe;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      display: flex;
      flex-direction: column;
      gap: 24px;
      transition: all 0.3s ease;
    }

    .voter-info:hover {
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }

    .voter-info img {
      width: 100%;
      max-width: 300px;
      height: 300px;
      object-fit: cover;
      border-radius: 8px;
      border: 2px solid #bfdbfe;
      margin: 0 auto;
    }

    .voter-info-paragraph {
      background: #f0f9ff;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #bfdbfe;
    }

    .voter-info-paragraph p {
      margin: 8px 0;
      font-size: 16px;
      color: #1f2937;
      font-family: 'Courier New', monospace;
    }

    .voter-info-paragraph span {
      color: #2563eb;
      font-weight: bold;
    }

    .side-info {
      background: white;
      border: 1px solid #bfdbfe;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      transition: all 0.3s ease;
    }

    .side-info:hover {
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }

    .side-info-box h4 {
      color: #2563eb;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 16px;
      font-family: 'Courier New', monospace;
    }

    .side-info-box p {
      color: #6b7280;
      line-height: 1.6;
      margin-bottom: 16px;
    }

    .side-info-para {
      color: #2563eb !important;
      font-weight: bold;
      font-family: 'Courier New', monospace;
      font-size: 18px;
      margin-top: 24px;
    }

    .car {
      display: grid;
      gap: 16px;
      margin-top: 24px;
    }

    .card-box {
      background: #f0f9ff;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      padding: 16px;
      display: flex;
      gap: 16px;
      align-items: center;
      transition: all 0.3s ease;
    }

    .card-box:hover {
      background: #dbeafe;
      transform: scale(1.02);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .card-box .image {
      width: 60px;
      height: 60px;
      border-radius: 8px;
      overflow: hidden;
      border: 2px solid #bfdbfe;
    }

    .card-box .image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .card-info p {
      margin: 4px 0;
      font-size: 14px;
      color: #1f2937;
      font-family: 'Courier New', monospace;
    }

    /* Center Section - Candidate Form */
    .voter {
      background: white;
      border: 1px solid #bfdbfe;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      display: flex;
      flex-direction: column;
      gap: 32px;
      transition: all 0.3s ease;
    }

    .voter:hover {
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }

    .voter-container h1 {
      color: #2563eb;
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 24px;
      font-family: 'Courier New', monospace;
      text-align: center;
    }

    .voter-container-box {
      border: 2px dashed #bfdbfe;
      border-radius: 12px;
      padding: 40px;
      background: #f9fafb;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .voter-container-box:hover {
      border-color: #2563eb;
      background: #f0f9ff;
    }

    .voter-container-box-div-info {
      text-align: center;
    }

    .voter-container-box-div-info p {
      color: #6b7280;
      margin: 8px 0;
      font-family: 'Courier New', monospace;
    }

    .voter-container-box-div-info-image {
      margin: 20px 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .input-container {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }

    .input-container .input {
      background: white;
      border: 1px solid #bfdbfe;
      border-radius: 8px;
      padding: 16px;
      font-size: 16px;
      font-family: 'Courier New', monospace;
      transition: all 0.3s ease;
    }

    .input-container .input:focus {
      outline: none;
      border-color: #2563eb;
      box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
    }

    .button-container {
      display: flex;
      justify-content: center;
      margin-top: 24px;
    }

    .auth-button {
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: white;
      border: none;
      padding: 16px 32px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s ease;
      font-family: 'Courier New', monospace;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    .auth-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
      background: linear-gradient(135deg, #1d4ed8, #1e40af);
    }

    .auth-button:active {
      transform: translateY(0);
    }

    /* Right Section - Created Candidate */
    .created-voter {
      background: white;
      border: 1px solid #bfdbfe;
      border-radius: 12px;
      padding: 32px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      height: fit-content;
      transition: all 0.3s ease;
    }

    .created-voter:hover {
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
      transform: translateY(-2px);
    }

    .created-voter-info {
      text-align: center;
    }

    .created-voter-info img {
      border-radius: 50%;
      border: 3px solid #bfdbfe;
      margin-bottom: 16px;
    }

    .created-voter-info p {
      margin: 12px 0;
      color: #1f2937;
      font-family: 'Courier New', monospace;
    }

    .created-voter-info p:first-of-type {
      font-size: 18px;
      font-weight: bold;
      color: #2563eb;
    }

    .created-voter-info span {
      color: #2563eb;
      font-weight: bold;
    }

    /* Animation for cards */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .create-voter > div {
      animation: fadeInUp 0.6s ease forwards;
    }

    .create-voter > div:nth-child(1) {
      animation-delay: 0.1s;
    }

    .create-voter > div:nth-child(2) {
      animation-delay: 0.2s;
    }

    .create-voter > div:nth-child(3) {
      animation-delay: 0.3s;
    }

    /* Responsive Design */
    @media (max-width: 768px) {
      .create-voter {
        padding: 20px 16px;
      }

      .voter-container h1 {
        font-size: 24px;
      }

      .voter-container-box {
        padding: 24px;
      }

      .card-box {
        flex-direction: column;
        text-align: center;
      }

      .card-box .image {
        width: 80px;
        height: 80px;
      }
    }

    /* Loading States */
    .loading-shimmer {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: shimmer 2s infinite;
    }

    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    /* Error States */
    .error-message {
      background: #fef2f2;
      border: 1px solid #fecaca;
      color: #dc2626;
      padding: 12px;
      border-radius: 8px;
      margin: 8px 0;
      font-family: 'Courier New', monospace;
    }

    /* Success States */
    .success-message {
      background: #f0fdf4;
      border: 1px solid #bbf7d0;
      color: #166534;
      padding: 12px;
      border-radius: 8px;
      margin: 8px 0;
      font-family: 'Courier New', monospace;
    }
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="create-voter">
        <div>
          {fileUrl && (
            <div className="voter-info">
              <img src={fileUrl} alt="Candidate Image" />
              <div className="voter-info-paragraph">
                <p>
                  Name : <span>{formInput.name}</span>
                </p>
                <p>
                  Address : <span>{formInput.address}</span>
                </p>
                <p>
                  Age : <span>{formInput.age}</span>
                </p>
              </div>
            </div>
          )}
          {!fileUrl && (
            <div className="side-info">
              <div className="side-info-box">
                <h4>Create Candidate for Voting</h4>
                <p>
                  Blockchain voting organization, provide ethereum blockchain ecosystem for voting.
                </p> 
                <p className="side-info-para">Contract Candidate List</p>
              </div>
              <div className="car">
                {candidateArray.map((el, i) => (
                  <div key={i+1} className="card-box">
                    <div className="image">
                      <img src={el[3]} alt="Candidate Image" />
                    </div>
                    <div className="card-info">
                      <p>Name: {el[1]}</p>
                      <p>Address: {el[0]}</p>
                      <p>ID: {el[6].slice(0,10)}...</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="voter">
          <div className="voter-container">
            <h1>Create New Candidate</h1>
            <div className="voter-container-box">
              <div className="voter-container-box-div">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="voter-container-box-div-info">
                    <p>Upload File : JPG,PNG,GIF,WEBM MAX 10MB</p>
                    <div className="voter-container-box-div-info-image">
                      <Image 
                        src={images.upload} 
                        alt="Upload Image" 
                        width={150} 
                        height={150}
                        priority
                      />
                    </div>
                    <p>Drag And Drop File</p>
                    <p>Or Browse Media on your device</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="input-container">
            <Input
              inputType="text"
              title="name"
              placeholder="Enter Candidate Name"
              className="input"
              value={formInput.name}
              handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
            />
            <Input
              inputType="text"
              title="Address"
              placeholder="Enter Candidate Address"
              className="input"
              value={formInput.address}
              handleClick={(e) => setFormInput({ ...formInput, address: e.target.value })}
            />
            <Input
              inputType="text"
              title="Age"
              placeholder="Enter Candidate Age"
              className="input"
              value={formInput.age}
              handleClick={(e) => setFormInput({ ...formInput, age: e.target.value })}
            />
            <div className="button-container">
              <Button 
                btnName="Authorized Candidate"
                className="auth-button"
                handleClick={() => setCandidate(formInput, fileUrl, router)}
              />
            </div>
          </div>
        </div>
        
        <div className="created-voter">
          <div className="created-voter-info">
            <Image src={images.creator} alt="User Profile" height={150} width={150}/>
            <p>Notice For User</p>
            <p>
              Organizer <span>0x9393999...</span>
            </p>
            <p>
              Only organizer can create candidate and candidate can vote for candidate.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default candidateRegistration;