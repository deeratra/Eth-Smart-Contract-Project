// import { ethers } from "ethers";
import { BrowserProvider } from "ethers";

let provider: BrowserProvider;


export const getProvider = () => {
  if (!provider) {
    provider = new BrowserProvider(window.ethereum);
    console.log("Provider", provider);
  }
  console.log("Provider", provider);
  return provider;
};

export const requestAccount = async () => {
  await window.ethereum.request({ method: "eth_requestAccounts" });
};
