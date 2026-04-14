const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying ConfidentialScore contract to Base Sepolia...");

  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);

  const balance = await deployer.provider.getBalance(deployer.address);
  console.log("Account balance:", hre.ethers.formatEther(balance), "ETH");

  const ConfidentialScore = await hre.ethers.getContractFactory("ConfidentialScore");
  const contract = await ConfidentialScore.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log("\n✅ ConfidentialScore deployed to:", address);
  console.log("Verify on Blockscout: https://base-sepolia.blockscout.com/address/" + address);

  console.log("\nNEXT STEPS:");
  console.log("1. Add this address to your frontend constants.");
  console.log("2. Use setScore() to assign scores, and checkEligibility() to gate access.");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
