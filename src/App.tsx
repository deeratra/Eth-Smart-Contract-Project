import { useEffect, useState } from "react";
import "./App.css";
import { DepositForm } from "./components/DepositForm";
import { WithdrawForm } from "./components/WithdrawForm";
import { getDTokenBalance, getUserEtherBalance } from "./utils/contract";
import { FreeTokenBalance } from "./components/FreeTokenBalance";
import { getSigner } from "./utils/contract";

function App() {
  const [userAddress, setUserAddress] = useState<string | null>(null);
  const [dTokenBalance, setDTokenBalance] = useState<string | null>(null);
  const [etherBalance, setEtherBalance] = useState<string | null>(null);

  const fetchUserDetails = async () => {
    const signer = await getSigner();
    const address = await signer.getAddress();
    console.log("Address", address);
    setUserAddress(address);

    const dTokenBalance = await getDTokenBalance(address);
    setDTokenBalance(dTokenBalance);

    const etherBalance = await getUserEtherBalance(address);
    setEtherBalance(etherBalance);
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <div className="app-container">
      <h1>DaPP Bank</h1>
      <div className="form-container">
        <DepositForm />
        <WithdrawForm />
      </div>
      {userAddress && (
        <div className="user-info">
          <h3 className="user-address">User Address: {userAddress}</h3>
          <FreeTokenBalance userAddress={userAddress} />
          <h3>
            Ether Balance: {etherBalance !== null ? etherBalance : "Loading..."}
          </h3>
        </div>
      )}
    </div>
  );
}

export default App;
