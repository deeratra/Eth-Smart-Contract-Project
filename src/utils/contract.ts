import { ethers } from "ethers";
import { getProvider, requestAccount } from "./web3";

import DBank from "../abi/DBank.json";
import DToken from "../abi/DToken.json";

// Contract addresses
const DBANK_CONTRACT_ADDRESS = import.meta.env.VITE_DBANK_CONTRACT_ADDRESS;
const DTOKEN_CONTRACT_ADDRESS = import.meta.env.VITE_DTOKEN_CONTRACT_ADDRESS;

let dbankContract: ethers.Contract;
let dTokenContract: ethers.Contract;

// Utility function to get the signer
export const getSigner = async (): Promise<ethers.Signer> => {
  const provider = getProvider();
  return provider.getSigner();
};

// Utility function to initialize and return DBank contract
const getDBankContract = async (): Promise<ethers.Contract | null> => {
  if (dbankContract) return dbankContract;

  try {
    const signer = await getSigner();
    dbankContract = new ethers.Contract(DBANK_CONTRACT_ADDRESS, DBank, signer);
    return dbankContract;
  } catch (error) {
    console.error("Error initializing DBank contract:", error);
    return null;
  }
};

// Utility function to initialize and return DToken contract
const getDTokenContract = async (): Promise<ethers.Contract | null> => {
  if (dTokenContract) return dTokenContract;

  try {
    const signer = await getSigner();
    dTokenContract = new ethers.Contract(
      DTOKEN_CONTRACT_ADDRESS,
      DToken,
      signer
    );
    return dTokenContract;
  } catch (error) {
    console.error("Error initializing DToken contract:", error);
    return null;
  }
};

// Function to deposit Ether into DBank
export const depositEther = async (amount: string): Promise<void> => {
  try {
    await requestAccount();

    const contract = await getDBankContract();
    if (!contract) throw new Error("DBank contract not found");

    const tx = await contract.deposit({ value: ethers.parseEther(amount) });
    await tx.wait();
    console.log("Deposit successful:", tx);
  } catch (error) {
    console.error("Error in deposit transaction:", error);
  }
};

// Function to withdraw Ether from DBank
export const withdrawEther = async (): Promise<void> => {
  try {
    await requestAccount();

    const contract = await getDBankContract();
    if (!contract) throw new Error("DBank contract not found");

    const tx = await contract.withdraw();
    await tx.wait();
    console.log("Withdrawal successful:", tx);
  } catch (error) {
    console.error("Error in withdrawal transaction:", error);
    throw Error(error);
  }
};

// Function to get DToken balance for a specific address
export const getDTokenBalance = async (address: string) => {
  const dTokenContract = await getDTokenContract();
  if (!dTokenContract) throw new Error("DToken contract not found");

  try {
    const balance = await dTokenContract.balanceOf(address);
    console.log("DToken Balance:", ethers.formatUnits(balance, 18)); // Assuming 18 decimals
    return ethers.formatUnits(balance, 18); // Returning as a string for easy display
  } catch (error) {
    console.error("Error fetching DToken balance:", error);
    return null;
  }
};

// Function to get the Ether balance of the user
export const getUserEtherBalance = async (address: string) => {
  const provider = getProvider();

  try {
    const balance = await provider.getBalance(address);
    return ethers.formatEther(balance); // Return balance in Ether format
  } catch (error) {
    console.error("Error fetching Ether balance:", error);
    return null;
  }
};
