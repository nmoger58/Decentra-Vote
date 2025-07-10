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
  const createVoter = async (formInput) => {
    try {
      if (!window.ethereum) return setError('Please install MetaMask')
        const web3Modal = new Web3Modal()
      
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const votingContract = fetchContract(signer)
        const { name, address, position, image } = formInput
        // const transaction = await votingContract.createVoter(name, address, position, image)
        // await transaction.wait()
        
        console.log('Voter created successfully:', formInput)
        setError('')
        // Reset form input after successful creation
        setFormInput({
            name: '',
            address: '',
            position: '',
            fileUrl: ''
            })
        // Optionally, you can redirect or update the UI after creation
        router.push('/allowed-voters')
    } catch (error) {
      setError('Error creating voter')
        console.error('Error creating voter:', error)
    }
    }
  // Check wallet connection on component mount
  const getAllVoterData=async () => {
    try {
      const web3Modal=new Web3Modal();
     const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = fetchContract(signer)
        // voter-List
        console.log(contract);
        const voterListData=await contract.getVoterList();
        voterListData.wait()

        setVoterAddress(voterListData);
        console.log(voterListData)
        voterListData.map(async(ele)=>{
          const singleVoterData=await contract.getVoterData(ele);
          pushVoter.push(singleVoterData)
          setVoterArray(pushVoter);
          console.log("Single Voter Data:", singleVoterData);
          console.log(singleVoterData);
        })
        const voterLen=await contract.getVoterLength();
        voterLen.wait()
        console.log(voterLen.toNumber());
        setVoterLength(voterLen.toNumber())
    } catch (error) {
        console.error(error);
    }

  }
  const giveVote=async (id) => {
    try {
      if (!window.ethereum) return setError('Please install MetaMask')
      const web3Modal = new Web3Modal()
      const connection = await web3Modal.connect()
      const provider = new ethers.providers.Web3Provider(connection)
      const signer = provider.getSigner()
      const contract = fetchContract(signer)
      
      // Check if the voter has already voted
      const hasVoted = await contract.hasVoted(currentAccount)
      if (hasVoted) {
        return setError('You have already voted')
      }
      
      // Give vote to the candidate
      const transaction = await contract.giveVote(id)
      await transaction.wait()
      
      console.log('Vote given successfully:', id)
      setError('')
    } catch (error) {
      console.error('Error giving vote:', error)
    }
  }

  // get the candidate data
  // const getAllCandidateData = async () => {
  //   try {
  //     const web3Modal = new Web3Modal()
  //     const connection = await web3Modal.connect()
  //     const provider = new ethers.providers.Web3Provider(connection)
  //     const signer = provider.getSigner()
  //     const contract = fetchContract(signer)
      
  //     // Fetch candidate data
  //     const candidateListData = await contract.getCandidateList()
  //     setCandidateArray(candidateListData)
      
  //     // Fetch candidate length
  //     const candidateLen = await contract.getCandidateLength()
  //     setCandidateLength(candidateLen.toNumber())
      
  //     // Fetch highest vote
  //     const highestVoteData = await contract.getHighestVote()
  //     highestVote.push(highestVoteData)
      
  //   } catch (error) {
  //     console.error('Error fetching candidate data:', error)
  //   }
  // }
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
      const response = await axios.post(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        {
          pinataMetadata: {
            name: 'MyJSONUpload',
          },
          pinataContent: data,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            pinata_api_key: PINATA_API_KEY,
            pinata_secret_api_key: PINATA_SECRET_KEY,
          },
        }
      )
      console.log("IPFS response:", response.data)
      const ipfsHash = response.data.IpfsHash
      console.log("IPFS Hash:", ipfsHash)
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
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const contract = fetchContract(signer)

    // Fetch candidate addresses
    const candidateListData = await contract.getCandidate()
    console.log('Candidate List Data:', candidateListData)

    const pushCandidate = []
    const candidateIndex = []

    await Promise.all(
      candidateListData.map(async (addr) => {
        const data = await contract.getCandidatedata(addr)
        pushCandidate.push(data)
        candidateIndex.push(data[2].toNumber()) // voteCount
        console.log('Single Candidate Data:', data)
      })
    )

    const allCandidateLength = await contract.getCandidateLength()
    console.log('All Candidate Length:', allCandidateLength.toNumber())
    setCandidateLength(allCandidateLength.toNumber())
  } catch (error) {
    console.error('Error fetching candidate data:', error)
  }
}

  useEffect(() => {
    checkIfWalletIsConnected()
    
    // getAllVoterData()
    console.log('Fetching candidate data...')
    console.log(candidateArray,candidateLength,candidateIndex)
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