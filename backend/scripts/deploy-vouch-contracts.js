/**
 * Deploy FLEX + Vouch/vlayer Integration Contracts
 * Deploys to Shardeum Mezame Testnet
 */

const hre = require("hardhat");

async function main() {
  console.log('🚀 Deploying FLEX + Vouch Contracts to Shardeum Mezame...\n');

  const [deployer] = await hre.ethers.getSigners();
  console.log('Deploying with account:', deployer.address);
  const balance = await hre.ethers.provider.getBalance(deployer.address);
  console.log('Account balance:', hre.ethers.formatEther(balance), 'ETH\n');

  // 1. Deploy FlexCreditCore 
  console.log('📝 Deploying FlexCreditCore...');
  const FlexCreditCore = await hre.ethers.getContractFactory('FlexCreditCore');
  const creditCore = await FlexCreditCore.deploy();
  await creditCore.waitForDeployment();
  const creditCoreAddress = await creditCore.getAddress();
  console.log('✅ FlexCreditCore deployed to:', creditCoreAddress, '\n');

  // 2. Deploy AgentPolicy
  console.log('📝 Deploying AgentPolicy...');
  const AgentPolicy = await hre.ethers.getContractFactory('AgentPolicy');
  const agentPolicy = await AgentPolicy.deploy(creditCoreAddress);
  await agentPolicy.waitForDeployment();
  const agentPolicyAddress = await agentPolicy.getAddress();
  console.log('✅ AgentPolicy deployed to:', agentPolicyAddress, '\n');

  // 3. Deploy IncomeProofVerifier
  console.log('📝 Deploying IncomeProofVerifier...');
  const IncomeProofVerifier = await hre.ethers.getContractFactory('IncomeProofVerifier');
  const incomeVerifier = await IncomeProofVerifier.deploy(creditCoreAddress);
  await incomeVerifier.waitForDeployment();
  const incomeVerifierAddress = await incomeVerifier.getAddress();
  console.log('✅ IncomeProofVerifier deployed to:', incomeVerifierAddress, '\n');

  // 4. Deploy AgentPerformanceVerifier
  console.log('📝 Deploying AgentPerformanceVerifier...');
  const AgentPerformanceVerifier = await hre.ethers.getContractFactory('AgentPerformanceVerifier');
  const agentVerifier = await AgentPerformanceVerifier.deploy(creditCoreAddress, agentPolicyAddress);
  await agentVerifier.waitForDeployment();
  const agentVerifierAddress = await agentVerifier.getAddress();
  console.log('✅ AgentPerformanceVerifier deployed to:', agentVerifierAddress, '\n');

  // 5. Authorize verifiers in FlexCreditCore
  console.log('🔐 Authorizing verifiers...');
  await creditCore.authorizeVerifier(incomeVerifierAddress, true);
  console.log('✅ IncomeProofVerifier authorized');
  
  await creditCore.authorizeVerifier(agentVerifierAddress, true);
  console.log('✅ AgentPerformanceVerifier authorized\n');

  // 6. Authorize AgentPerformanceVerifier in AgentPolicy
  console.log('🔐 Authorizing AgentPerformanceVerifier in AgentPolicy...');
  await agentPolicy.authorizeExecutor(agentVerifierAddress, true);
  console.log('✅ AgentPerformanceVerifier authorized in AgentPolicy\n');

  // Print summary
  console.log('═══════════════════════════════════════════════════════');
  console.log('🎉 DEPLOYMENT COMPLETE!');
  console.log('═══════════════════════════════════════════════════════\n');
  
  console.log('📋 Contract Addresses:');
  console.log('─────────────────────────────────────────────────────');
  console.log('FlexCreditCore:           ', creditCoreAddress);
  console.log('AgentPolicy:              ', agentPolicyAddress);
  console.log('IncomeProofVerifier:      ', incomeVerifierAddress);
  console.log('AgentPerformanceVerifier: ', agentVerifierAddress);
  console.log('─────────────────────────────────────────────────────\n');

  console.log('📝 Add these to your .env file:');
  console.log('─────────────────────────────────────────────────────');
  console.log(`NEXT_PUBLIC_FLEX_CREDIT_CORE=${creditCoreAddress}`);
  console.log(`NEXT_PUBLIC_AGENT_POLICY=${agentPolicyAddress}`);
  console.log(`NEXT_PUBLIC_INCOME_VERIFIER=${incomeVerifierAddress}`);
  console.log(`NEXT_PUBLIC_AGENT_VERIFIER=${agentVerifierAddress}`);
  console.log('─────────────────────────────────────────────────────\n');

  console.log('🔗 Verify on Shardeum Explorer:');
  console.log(`https://explorer-mezame.shardeum.org/address/${creditCoreAddress}`);
  console.log(`https://explorer-mezame.shardeum.org/address/${agentPolicyAddress}`);
  console.log(`https://explorer-mezame.shardeum.org/address/${incomeVerifierAddress}`);
  console.log(`https://explorer-mezame.shardeum.org/address/${agentVerifierAddress}`);
  console.log('\n');

  // Save deployment info
  const deployment = {
    network: "shardeum-mezame",
    chainId: 11155111,
    timestamp: new Date().toISOString(),
    deployer: deployer.address,
    contracts: {
      FlexCreditCore: creditCoreAddress,
      AgentPolicy: agentPolicyAddress,
      IncomeProofVerifier: incomeVerifierAddress,
      AgentPerformanceVerifier: agentVerifierAddress,
    },
  };

  const fs = require('fs');
  fs.writeFileSync(
    'deployment-shardeum.json',
    JSON.stringify(deployment, null, 2)
  );
  console.log('💾 Deployment info saved to deployment-shardeum.json\n');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
