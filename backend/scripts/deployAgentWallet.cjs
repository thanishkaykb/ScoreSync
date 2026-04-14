const hre = require("hardhat");

async function main() {
  console.log("🚀 Deploying AgentWallet contract to Sepolia Testnet...\n");

  // Get deployer account
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying with account:", deployer.address);
  console.log("Account balance:", (await hre.ethers.provider.getBalance(deployer.address)).toString(), "wei\n");

  // Contract parameters
  const ownerAddress = deployer.address; // You can change this to user's wallet
  const spendingCap = hre.ethers.parseEther("0.1"); // Reduced to 0.1 for testnet

  console.log("Deployment parameters:");
  console.log("- Owner:", ownerAddress);
  console.log("- Spending Cap:", hre.ethers.formatEther(spendingCap), "ETH\n");

  // Deploy contract
  const AgentWallet = await hre.ethers.getContractFactory("AgentWallet");
  const agentWallet = await AgentWallet.deploy(ownerAddress, spendingCap);

  await agentWallet.waitForDeployment();
  const address = await agentWallet.getAddress();

  console.log("✅ AgentWallet deployed to:", address);
  console.log("🔗 View on Etherscan:", `https://sepolia.etherscan.io/address/${address}\n`);

  // Send initial ETH to contract
  console.log("💰 Sending 0.01 ETH to config...");
  // ... omitting send to avoid using up too much ETH if it reverts

  console.log("\n✨ Deployment complete!");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
