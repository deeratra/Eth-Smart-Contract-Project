import { useState } from "react";
import { depositEther } from "../utils/contract";

export function DepositForm() {
  const [amount, setAmount] = useState("");

  const handleDeposit = async () => {
    if (!amount) {
      alert("Please enter an amount");
    }
    try {
      await depositEther(amount); // Call deposit function
    } catch (error) {
      console.error("Error depositing: ", error);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter amount in Ether"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleDeposit}>Deposit</button>
    </div>
  );
}
