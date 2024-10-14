import { useState, useEffect } from "react";
import { getDTokenBalance } from "../utils/contract";

export function FreeTokenBalance({ userAddress }) {
  const [balance, setBalance] = useState("0");
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(""); 

  useEffect(() => {
    const fetchBalance = async () => {
      setLoading(true);
      setError("");
      try {
        const balance = await getDTokenBalance(userAddress);
        setBalance(balance || "0"); 
      } catch (err) {
        console.error("Error fetching DToken balance:", err);
        setError("Failed to fetch balance"); 
      } finally {
        setLoading(false);
      }
    };

    if (userAddress) {
      fetchBalance();
    }
  }, [userAddress]);

  return (
    <div>
      {loading ? (
        <h3>Loading DToken Balance...</h3>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <h3>Your DToken Balance: {balance}</h3>
      )}
    </div>
  );
}
