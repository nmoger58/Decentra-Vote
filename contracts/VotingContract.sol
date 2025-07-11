//SPDX-License-Identifier: UNLICENSED
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
    function setCandidate(address _address,string memory _name, string memory _age, string memory _image, string memory _ipfs) public  {
        require(votingOrganizer==msg.sender, "Only the voting organizer can create candidates");
        _candidateId.increment();
        uint256 idNumber = _candidateId.current();
        Candidate storage candidate = candidates[_address];
        candidate.age= _age;
        candidate.name = _name;
        candidate.candidateId = idNumber;
        candidate.voteCount = 0;
        candidate.image = _image;
        candidate._address = _address;
        candidate.ipfs = _ipfs; 

        candidateAddress.push(_address);
        // Console log the candidateAddress array
        console.log("Candidate Address List: ");
        for (uint i = 0; i < candidateAddress.length; i++) {
            console.log(candidateAddress[i]);
        }
        emit CandidateCreate(
            idNumber,
            _name,
            _age,
            0,
            _image,
            _address,
            _ipfs
        );
    }

    function getCandidate() public view returns (address[] memory) {
        return candidateAddress;
    }
    function getCandidateLength() public view returns (uint256) {
        return candidateAddress.length;
    }
    function getCandidatedata(address _address) public view returns (string memory,string memory,uint256,string memory,uint256,string memory,address) {
        return (
            candidates[_address].name,
            candidates[_address].age,
            candidates[_address].voteCount,
            candidates[_address].image,
            candidates[_address].candidateId,
            candidates[_address].ipfs,
            candidates[_address]._address
        );
    }
    function voterRight(address _address, string memory _name, string memory _image, string memory _ipfs) public {
        require(votingOrganizer==msg.sender, "Only the voting organizer can create voters");
        _voterId.increment();
        uint256 idNumber = _voterId.current();
        Voter storage voter = voters[_address];
        require(voter.voter_allowed == 0, "Voter already exists with this address");
        voter.voter_voterId = idNumber;
        voter.voter_name = _name;
        voter.voter_image = _image;
        voter.voter_address = _address;
        voter.voter_allowed = 1;
        voter.voter_voted = false;
        voter.voter_vote = 1000;
        voter.voter_ipfs = _ipfs;

        votersAddress.push(_address);

        emit voterCreated(
            idNumber,
            _name,
            _image,
            _address,
            1,
            false,
            1000,
            _ipfs
        );
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
    function getVoterData(address _address) public view returns (uint256,string memory,string memory,address,string memory,uint256,bool) {
        return (
            voters[_address].voter_voterId,
            voters[_address].voter_name,
            voters[_address].voter_image,
            voters[_address].voter_address,
            voters[_address].voter_ipfs,
            voters[_address].voter_vote,
            voters[_address].voter_voted
        );
    }
    function getVoterLength() public view returns (uint256) {
        return votersAddress.length;
    }
    function getVotedVotersList() public view returns (address[] memory) {
        return votedVoters;
    }
    function getVoterList() public view returns (address[] memory) {
        return votersAddress;
    }
}