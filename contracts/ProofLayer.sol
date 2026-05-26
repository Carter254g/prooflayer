// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProofLayer {
    event ProofAnchored(
        bytes32 indexed proofHash,
        address indexed creator,
        uint256 timestamp
    );

    mapping(bytes32 => bool) public proofExists;
    mapping(bytes32 => address) public proofCreator;
    mapping(bytes32 => uint256) public proofTimestamp;

    function anchorProof(bytes32 proofHash) external {
        require(!proofExists[proofHash], "Proof already anchored");

        proofExists[proofHash] = true;
        proofCreator[proofHash] = msg.sender;
        proofTimestamp[proofHash] = block.timestamp;

        emit ProofAnchored(proofHash, msg.sender, block.timestamp);
    }

    function getProof(bytes32 proofHash) external view returns (
        bool exists,
        address creator,
        uint256 timestamp
    ) {
        return (
            proofExists[proofHash],
            proofCreator[proofHash],
            proofTimestamp[proofHash]
        );
    }
}
