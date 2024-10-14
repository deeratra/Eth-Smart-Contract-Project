
import { withdrawEther } from "../utils/contract"; // We'll define this in utils

export function WithdrawForm() {
  const handleWithdraw = async () => {
    try {
      await withdrawEther(); // Call withdraw function
      alert("Withdrawal successful!"); // Notify user of success
    } catch (error: any) {
      // Set error message if withdrawal fails
      const errorMessage = error.message || "An unknown error occurred.";
      alert("There was an error withdrawing");
      console.error("Error withdrawing: ", errorMessage);
    }
  };

  return (
    <div className="withdraw-form">
      <button onClick={handleWithdraw}>Withdraw</button>
    </div>
  );
}
