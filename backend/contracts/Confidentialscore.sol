// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ConfidentialScore {
    // Mapping from user address to their credit score
    mapping(address => uint256) internal scores;

    // Owner address for access control
    address public owner;

    event ScoreUpdated(address indexed user, uint256 score);
    event EligibilityChecked(address indexed user, bool isEligible, uint256 threshold);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    /**
     * @notice Sets the credit score for the caller.
     * @param score The plaintext credit score (e.g., 300–850).
     */
    function setScore(uint256 score) external {
        require(score <= 1000, "Score out of range");
        scores[msg.sender] = score;
        emit ScoreUpdated(msg.sender, score);
    }

    /**
     * @notice Allows the owner to set a score on behalf of a user (e.g., from a verifier).
     * @param user The user address.
     * @param score The credit score to assign.
     */
    function setScoreFor(address user, uint256 score) external onlyOwner {
        require(score <= 1000, "Score out of range");
        scores[user] = score;
        emit ScoreUpdated(user, score);
    }

    /**
     * @notice Returns the caller's credit score.
     */
    function getScore() external view returns (uint256) {
        return scores[msg.sender];
    }

    /**
     * @notice Checks if the caller's score meets a given threshold.
     * @param threshold The minimum score required (e.g., 700).
     * @return isEligible True if the user's score is above the threshold.
     */
    function checkEligibility(uint256 threshold) external returns (bool isEligible) {
        uint256 userScore = scores[msg.sender];
        isEligible = userScore >= threshold;
        emit EligibilityChecked(msg.sender, isEligible, threshold);
        return isEligible;
    }
}
