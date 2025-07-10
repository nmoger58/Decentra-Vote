import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { fetchContract, VotingContext } from "../context/Voter.js";
import Style from "../styles/allowedVoter.module.css";
import images from "../assets";
import Button from "../components/Button/Button";
import Input from "../components/Input/Input";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { create } from "ipfs-http-client";
import axios from "axios";
const PINATA_API_KEY = '6b8ac4bcaceeece9573a'
const PINATA_SECRET_KEY = 'd87ddd0f9e450d1df1323d1b717f4817ae3ef84245baa7c4878a930f05ef9427'
const NEXT_PUBLIC_PINATA_JWT='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3OTM2NjM3MS0xNTJmLTQwNmQtYmI2Mi1iOWU0NGNkOTIzOGMiLCJlbWFpbCI6Im5tb2dlcjU4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI2YjhhYzRiY2FjZWVlY2U5NTczYSIsInNjb3BlZEtleVNlY3JldCI6ImQ4N2RkZDBmOWU0NTBkMWRmMTMyM2QxYjcxN2Y0ODE3YWUzZWY4NDI0NWJhYTdjNDg3OGE5MzBmMDVlZjk0MjciLCJleHAiOjE3ODMzNzU1OTd9.UAeLlwD8oNeuQ4MzKZcjJnXs-upm8D90v1ZtJj9PGpc'
const AllowedVoters = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [formInput, setFormInput] = useState({
    name: "",
    address: "",
    fileUrl: "", // Changed from image to fileUrl to match the state
    position: ""
  });
  const router = useRouter();
  const { uploadToIPFS,getAllVoterData,voterArray } = useContext(VotingContext);
  
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
  const handleSubmit = async (e) => {
    
    // Validate form data
    if (!formInput.name || !formInput.address || !formInput.position || !fileUrl) {
      alert("Please fill in all fields and upload an image");
      return;
    }

    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      // to connect to the blockchain and create the voter
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContract(signer);
      console.log("Creating voter with contract:", contract);

      console.log("Creating voter with data:", formInput);
      const data =JSON.stringify({
        name: formInput.name,
        address: formInput.address,
        position: formInput.position,
        image: formInput.fileUrl // Use fileUrl instead of image
      });
      
      // Option 1: Using ipfs-http-client with Pinata
      try {
    const response = await axios.post(
      'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      {
        pinataMetadata: {
          name: 'MyJSONUpload',
        },
        pinataContent: formInput,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          pinata_api_key:PINATA_API_KEY,
          pinata_secret_api_key:PINATA_SECRET_KEY,
        },
      }
    );
        console.log("IPFS response:", response.data);
        const ipfsHash = response.data.IpfsHash;
        console.log("IPFS Hash:", ipfsHash);
        const url = `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
        console.log("IPFS URL:", url);
        // Call the contract method to create the voter
        const voter=await contract.voterRight(formInput.address, formInput.name,url,formInput.fileUrl);
        await voter.wait();
        console.log('voter has been created',voter)
        const events = await contract.queryFilter("voterCreated");
        console.log("Voter events:", events);
        router.push("/voterList");

      }
      catch (error) {
        console.error("Error uploading JSON to IPFS:", error);
        return;
      }
      setFormInput({
        name: "",
        address: "",
        fileUrl: "",
        position: ""
      });
      setFileUrl(null);
      
    } catch (error) {
      console.error("Error creating voter:", error);
    }
  };
  useEffect(() => {
    // You can add any initialization logic here if needed
    getAllVoterData();
  }, []);
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
                Pos : <span>{formInput.position}</span>
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
                voterArray.map((el, i) => (
                  <div key={i+1} className={Style.card_box}>
                    {/* <Image src={images.candidate} alt="Candidate Image" /> */}
                    <div className={Style.image}>
                      <img src={el[4]} alt="Candidate Image" />
                    </div>
                    <div className={Style.card_info}>
                      <p>Name :{el[1]}</p>
                      <p>Address : {el[3]}</p>
                      {/* <p>Position : {el}</p> */}
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
          <h1>Create New Voter</h1>
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
            placeholder="Enter Voter Name" // Fixed placeholder text
            className={Style.input}
            value={formInput.name} // Added value prop for controlled input
            handleClick={(e) => setFormInput({ ...formInput, name: e.target.value })}
          />
          <Input
            inputType="text"
            title="Address"
            placeholder="Enter Voter Address"
            // className={Style.input}
            value={formInput.address} // Added value prop for controlled input
            handleClick={(e) => setFormInput({ ...formInput, address: e.target.value })}
          />
          <Input
            inputType="text"
            title="Position"
            placeholder="Enter Voter Position"
            // className={Style.input}
            value={formInput.position} // Added value prop for controlled input
            handleClick={(e) => setFormInput({ ...formInput, position: e.target.value })}
          />
          <div className={Style.Button}>
            <Button 
              btnName="Authorized Voter" 
              handleClick={handleSubmit} // Fixed: added proper handler
            />
          </div>
        </div>
      </div>
      
      <div className={Style.createdVoter}>
        <div className={Style.createdVoter_info}>
          <Image src={images.creator} alt="User Profile" height={150} width={150}/>
          <p>Notice For User</p>
          <p>
            Organizer <span>0x9393999...</span>
          </p>
          <p>
            Only organizer can create voter and voter can vote for candidate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllowedVoters;