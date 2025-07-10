import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { fetchContract, VotingContext ,setCandidate } from "../context/Voter.js";
import Style from "../styles/allowedVoter.module.css";
import images from "../assets";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";

// const PINATA_API_KEY = '6b8ac4bcaceeece9573a'
// const PINATA_SECRET_KEY = 'd87ddd0f9e450d1df1323d1b717f4817ae3ef84245baa7c4878a930f05ef9427'
// const NEXT_PUBLIC_PINATA_JWT='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3OTM2NjM3MS0xNTJmLTQwNmQtYmI2Mi1iOWU0NGNkOTIzOGMiLCJlbWFpbCI6Im5tb2dlcjU4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI2YjhhYzRiY2FjZWVlY2U5NTczYSIsInNjb3BlZEtleVNlY3JldCI6ImQ4N2RkZDBmOWU0NTBkMWRmMTMyM2QxYjcxN2Y0ODE3YWUzZWY4NDI0NWJhYTdjNDg3OGE5MzBmMDVlZjk0MjciLCJleHAiOjE3ODMzNzU1OTd9.UAeLlwD8oNeuQ4MzKZcjJnXs-upm8D90v1ZtJj9PGpc'
const candidateRegistration = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    fileUrl: "", // Changed from image to fileUrl to match the state
    age: ""
  });
  const router = useRouter();

  const { uploadToIPFS , setCandidate,candidateArray} = useContext(VotingContext);
  
  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      try {
        const url = await uploadToIPFS(file);
        setFileUrl(url);
        setFormInput((prev) => ({ ...prev, fileUrl: url })); // Fixed: use fileUrl instead of image
      } catch (error) {
        console.error("Error uploading file:", error);
        // You might want to show an error message to the user here
      }
    }
  }, [uploadToIPFS]); // Added uploadToIPFS as dependency

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    },
    maxFiles: 1,
  });
  // Function to handle form submission
  return (
    <div className={Style.createVoter}>
      <div>
        {fileUrl && (
          <div className={Style.voterInfo}>
            <img src={fileUrl} alt="Voter Image" />
            <div className={Style.voterInfo_paragraph}>
              <p>
                Name : <span>{formInput.name}</span>
              </p>
              <p>
                Address : <span>{formInput.address}</span>
              </p>
              <p>
                Pos : <span>{formInput.age}</span>
              </p>
            </div>
          </div>
        )}
        {!fileUrl && (
          <div className={Style.sideInfo}>
            <div className={Style.sideInfo_box}>
              <h4>Create Candidate for Voting</h4>
              <p>
                Blockchain voting organization, provide ethereum blockchain ecosystem for voting.
              </p> 
              <p className={Style.sideInfo_para}>Contract Candidate List</p>
            </div>
            <div className={Style.car}>
              {
                candidateArray.map((el, i) => (
                  <div key={i+1} className={Style.card_box}>
                    {/* <Image src={images.candidate} alt="Candidate Image" /> */}
                    <div key={i+1} className={Style.image}>
                      <img src={el[3]} alt="Candidate Image" />
                    </div>
                    <div className={Style.card_info}>
                      <p>{el[1].toNumber()}</p>
                      <p>{el[0]}</p>
                      <p>{el[6].slice(0,10)}...</p>
                  </div>
                  </div>
                ))
              }
            </div>
          </div>
        )}
      </div>
      
      <div className={Style.voter}>
        <div className={Style.voter_container}>
          <h1>Create New Candidate</h1>
          <div className={Style.voter_container_box}>
            <div className={Style.voter_container_box_div}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <div className={Style.voter_container_box_div_info}>
                  <p>Upload File : JPG,PNG,GIF,WEBM MAX 10MB</p>
                  <div className={Style.voter_container_box_div_info_image}>
                    <Image 
                      src={images.upload} 
                      alt="Upload Image" 
                      width={150} 
                      height={150}
                      priority
                    />
                  </div>
                  <p>Drag And Drop File </p>
                  <p> Or Browse Media on your device </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className={Style.input_container}>
          <Input
            inputType="text"
            title="name"
            placeholder="Enter candidate Name" // Fixed placeholder text
            className={Style.input}
            value={formInput.name} // Added value prop for controlled input
            handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
          />
          <Input
            inputType="text"
            title="Address"
            placeholder="Enter candidate Address"
            // className={Style.input}
            value={formInput.address} // Added value prop for controlled input
            handleClick={(e) => setFormInput({ ...formInput, address: e.target.value })}
          />
          <Input
            inputType="text"
            title="age"
            placeholder="Enter candidate age"
            // className={Style.input}
            value={formInput.age} // Added value prop for controlled input
            handleClick={(e) => setFormInput({ ...formInput, age: e.target.value })}
          />
          <div className={Style.Button}>
            <Button 
              btnName="Authorized candidate" 
              handleClick={()=>setCandidate(formInput,fileUrl,router)} // Fixed: added proper handler
            />
          </div>
        </div>
      </div>
      
      <div className={Style.createdcandidate}>
        <div className={Style.createdcandidate_info}>
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
  );
};

export default candidateRegistration;