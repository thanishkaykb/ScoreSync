const hre = require("hardhat");

async function main() {
  console.log("Estimating total deployment gas fees on Sepolia...");
  
  // Contracts that will be deployed
  const contractsToEstimate = [
    { name: "FlexCreditCore", args: [] },
    { name: "Confidentialscore", args: [] },
    { name: "AgentWallet", args: ["0x0000000000000000000000000000000000000000"] } // placeholder for owner
  ];

  let totalGasLimit = 0n;

  // 1. Get current Sepolia gas prices using the configured provider
  const feeData = await hre.ethers.provider.getFeeData();
  const gasPrice = feeData.gasPrice || feeData.maxFeePerGas;
  console.log(`Current Base Fee / Gas Price: ${hre.ethers.formatUnits(gasPrice, "gwei")} gwei`);

  // 2. Estimate gas for each contract
  for (const { name, args } of contractsToEstimate) {
    try {
      const Factory = await hre.ethers.getContractFactory(name);
      const deployTx = await Factory.getDeployTransaction(...args);
      
      // We estimate gas using ethers
      const estimatedGas = await hre.ethers.provider.estimateGas(deployTx);
      totalGasLimit += estimatedGas;
      
      console.log(`${name} deploy gas: ${estimatedGas.toString()}`);
    } catch (error) {
       console.log(`Failed to estimate exactly for ${name}, assuming 2,000,000 gas.`);
       totalGasLimit += 2000000n;
    }
  }

  // 3. Calculate total ETH cost
  const totalEth = totalGasLimit * gasPrice;
  
  console.log("\n====================================");
  console.log(`Total Estimated Gas: ${totalGasLimit.toString()}`);
  console.log(`Total Estimated Fee: ${hre.ethers.formatEther(totalEth)} ETH`);
  console.log("====================================\n");
}

main().catch(console.error);
