import React, { useEffect, useState } from 'react'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import axios from 'axios'
import { useRouter } from 'next/router'
import { VotingAddress, VotingAddressABI } from './constants'

// Pinata configuration - Replace with your actual Pinata credentials
const PINATA_API_KEY = '6b8ac4bcaceeece9573a'
const PINATA_SECRET_KEY = 'd87ddd0f9e450d1df1323d1b717f4817ae3ef84245baa7c4878a930f05ef9427'
const NEXT_PUBLIC_PINATA_JWT='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI3OTM2NjM3MS0xNTJmLTQwNmQtYmI2Mi1iOWU0NGNkOTIzOGMiLCJlbWFpbCI6Im5tb2dlcjU4QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6IkZSQTEifSx7ImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxLCJpZCI6Ik5ZQzEifV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI2YjhhYzRiY2FjZWVlY2U5NTczYSIsInNjb3BlZEtleVNlY3JldCI6ImQ4N2RkZDBmOWU0NTBkMWRmMTMyM2QxYjcxN2Y0ODE3YWUzZWY4NDI0NWJhYTdjNDg3OGE5MzBmMDVlZjk0MjciLCJleHAiOjE3ODMzNzU1OTd9.UAeLlwD8oNeuQ4MzKZcjJnXs-upm8D90v1ZtJj9PGpc'
export const fetchContract = (signerOrProvider) => {
  return new ethers.Contract(VotingAddress, VotingAddressABI, signerOrProvider)
}

export const VotingContext = React.createContext()

export const VotingProvider = ({ children }) => {
  const router = useRouter()
  
  const [currentAccount, setCurrentAccount] = useState('')
  const [candidateLength, setCandidateLength] = useState('')
  const pushCandidate = []
  const candidateIndex = []
  const [candidateArray, setCandidateArray] = useState(pushCandidate)
  
  const [error, setError] = useState('')
  const highestVote = []
  
  const pushVoter = []
  const [voterArray, setVoterArray] = useState(pushVoter)
  const [voterLength, setVoterLength] = useState('')
  const [voterAddress, setVoterAddress] = useState([])

  // connecting the wallet
  const checkIfWalletIsConnected = async () => {
    try {
      if (!window.ethereum) return setError('Please install MetaMask')
      const accounts = await window.ethereum.request({ method: 'eth_accounts' }) // Fixed: was 'account'
      if (accounts.length) {
        setCurrentAccount(accounts[0]) // Fixed: was account[0]
      } else {
        setError('No accounts found')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  // for wallet connection
  const connectWallet = async () => {
    try {
      if (!window.ethereum) return setError('Please install MetaMask')
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
      if (accounts.length) {
        setCurrentAccount(accounts[0])
      } else {
        setError('No accounts found')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  // upload to ipfs voter image using Pinata
  const uploadToIPFS = async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const pinataMetadata = JSON.stringify({
        name: `voter-image-${Date.now()}`,
      })
      formData.append('pinataMetadata', pinataMetadata)
      
      const pinataOptions = JSON.stringify({
        cidVersion: 0,
      })
      formData.append('pinataOptions', pinataOptions)
      
      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        maxBodyLength: 'Infinity',
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          'pinata_api_key': PINATA_API_KEY,
          'pinata_secret_api_key': PINATA_SECRET_KEY,
        },
      })
      
      const url = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`
        console.log('File uploaded to IPFS:', url)
      return url
    } catch (error) {
      setError('Error uploading file to IPFS')
      console.error('Error uploading file to IPFS:', error)
      return null
    }
  }
   const createVoter = async (formInput,fileUrl,router) => {
    
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
      // setFormInput({
      //   name: "",
      //   address: "",
      //   fileUrl: "",
      //   position: ""
      // });
      // setFileUrl(null);
      
    } catch (error) {
      console.error("Error creating voter:", error);
    }
  };
  // Check wallet connection on component mount
  const getAllVoterData = async () => {
  try {
    const provider = new ethers.providers.JsonRpcProvider()
    const contract = fetchContract(provider)
    
    // Get voter list
    const voterListData = await contract.getVoterList()
    setVoterAddress(voterListData)
    console.log('Voter List:', voterListData)
    
    // Get all voter data using Promise.all for proper async handling
    const voterDataPromises = voterListData.map(async (voterAddress) => {
      const singleVoterData = await contract.getVoterData(voterAddress)
      return singleVoterData
    })
    
    const allVoterData = await Promise.all(voterDataPromises)
    
    // Set the voter array state with all data at once
    setVoterArray(allVoterData)
    console.log('All Voter Data:', allVoterData)
    
    // Get voter length
    const voterLen = await contract.getVoterLength()
    setVoterLength(voterLen.toNumber())
    console.log('Voter Length:', voterLen.toNumber())
    
  } catch (error) {
    console.error('Error fetching voter data:', error)
    setError('Error fetching voter data')
  }
}
  const giveVote = async ( candidateAddress,candidateId) => {
  try {
    if (!window.ethereum) return setError('Please install MetaMask')
    console.log('Giving vote to candidate:', candidateAddress, 'with ID:', candidateId)
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const contract = fetchContract(signer)
    
    // Get current account address
    const currentAccount = await signer.getAddress()
    
    // Check if the voter has already voted by getting voter data
    const voterData = await contract.getVoterData(currentAccount)
    const hasVoted = voterData[6] // voter_voted is the 7th element (index 6)
    
    if (hasVoted) {
      return setError('You have already voted')
    }
    
    // Check if voter is allowed to vote
    const voterAllowed = voterData[5] // This should be voter_allowed, but it's actually voter_vote in your return
    // Note: Your getVoterData function returns voter_vote instead of voter_allowed
    // You might need to check the voter struct directly or modify the contract
    
    // Give vote to the candidate
    const transaction = await contract.vote(candidateAddress, candidateId)
    await transaction.wait()
    
    console.log('Vote given successfully to:', candidateAddress, 'with ID:', candidateId)
    setError('')
    
    // Optionally refresh the data after voting
    await getAllVoterData()
    await getNewCandidate()
    
  } catch (error) {
    console.error('Error giving vote:', error)
    
    // Handle specific error messages
    if (error.message.includes('You are voted')) {
      setError('You have already voted')
    } else if (error.message.includes('You have not allowed to vote')) {
      setError('You are not allowed to vote')
    } else {
      setError('Error giving vote: ' + error.message)
    }
  }
}

  const setCandidate=async (formInput,fileUrl,router) => {
    try {
      const {name, address, age} = formInput
      console.log("Form Input:", formInput)
      if(!window.ethereum) return setError('Please install MetaMask')
      if (!name || !address || !age ) {
        return setError('Please fill in all fields and upload an image')
      }
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      const contract = fetchContract(signer)
      // const transaction = await contract.createCandidate(name, position, age, fileUrl)
      // await transaction.wait()
      const data= JSON.stringify({
        name: formInput.name,
        address: formInput.address,
        image: fileUrl,
        age: formInput.age // Use fileUrl instead of image
      })
      // const response = await axios.post(
      //   'https://api.pinata.cloud/pinning/pinJSONToIPFS',
      //   {
      //     pinataMetadata: {
      //       name: 'MyJSONUpload',
      //     },
      //     pinataContent: formInput,
      //   },
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       pinata_api_key: PINATA_API_KEY,
      //       pinata_secret_api_key: PINATA_SECRET_KEY,
      //     },
      //   }
      // )
      // console.log("IPFS response:", response.data)
      // const ipfsHash = response.data.IpfsHash
      // console.log("IPFS Hash:", ipfsHash)
       const ipfsHash=""
      const candidate=await contract.setCandidate(
        formInput.address,
        formInput.name,
        formInput.age,
        fileUrl,
        `https://gateway.pinata.cloud/ipfs/${ipfsHash}` 
      )
      candidate.wait()
      console.log('Candidate has been created:', candidate)
       // Fetch updated candidate data
      setError('')
    } catch (error) {
      console.error('Error setting candidate:', error)  
    }
  }
  // get candidate data on component mount
  const getNewCandidate = async () => {
  try {
    const provider = new ethers.providers.JsonRpcProvider()
    const contract = fetchContract(provider)

    // Fetch candidate addresses
    const candidateListData = await contract.getCandidate()
    console.log('Candidate List Data:', candidateListData)

    // Get all candidate data using Promise.all
    const candidateDataPromises = candidateListData.map(async (addr) => {
      const data = await contract.getCandidatedata(addr)
      return data
    })

    const allCandidateData = await Promise.all(candidateDataPromises)
    
    // Set the candidate array state with all data at once
    setCandidateArray(allCandidateData)
    console.log('All Candidate Data:', allCandidateData)

    // Get candidate length
    const allCandidateLength = await contract.getCandidateLength()
    setCandidateLength(allCandidateLength.toNumber())
    console.log('All Candidate Length:', allCandidateLength.toNumber())
    
  } catch (error) {
    console.error('Error fetching candidate data:', error)
    setError('Error fetching candidate data')
  }
}

  useEffect(() => {
    checkIfWalletIsConnected()
    getAllVoterData()
    getNewCandidate()
  }, [])

  const votingTitle = 'Voting Dapp'

  return (
    <VotingContext.Provider 
      value={{
        votingTitle,
        checkIfWalletIsConnected,
        connectWallet,
        uploadToIPFS,
        createVoter,
        getAllVoterData,
        giveVote,
        setCandidate,
        getNewCandidate,
        error,
        voterArray,
        voterLength,
        voterAddress,
        currentAccount,
        candidateArray,
        candidateLength
      }}
    >
      {children}
    </VotingContext.Provider>
  )
}

const Voter = () => {
  return (
    <div>
      {/* Add your voter component content here */}
    </div>
  )
}

export default Voter