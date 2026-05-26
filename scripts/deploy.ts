import { ethers } from "ethers";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
  console.log("Deploying ProofLayer contract to Pharos Atlantic testnet...");

  const provider = new ethers.JsonRpcProvider(
    "https://atlantic.dplabs-internal.com",
    { chainId: 688689, name: "pharos-atlantic" },
    { staticNetwork: true }
  );

  const wallet = new ethers.Wallet(process.env.WALLET_PRIVATE_KEY!, provider);

  const artifactPath = join(
    __dirname,
    "../artifacts/contracts/ProofLayer.sol/ProofLayer.json"
  );
  const artifact = JSON.parse(readFileSync(artifactPath, "utf8"));

  const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
  const contract = await factory.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log(`✅ ProofLayer deployed to: ${address}`);
  console.log(`NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
