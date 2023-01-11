import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  useClaimNFT,
  useLogin,
  useProgram,
  useUser,
} from "@thirdweb-dev/react/solana";

function Loginpage() {
  const { publicKey, connect } = useWallet();
  const { user } = useUser();
  const login = useLogin();
  const program = useProgram(
    process.env.PROGRAM_ADDRESS,
    "nft-drop"
  );
  const { mutate, isLoading } = useClaimNFT(program.data);

  return (
    <div>
      <div>
      <h1>NFT Gated Website on Solana</h1>
      {!publicKey && <WalletMultiButton />}
      {publicKey && !user && (
        <button onClick={() => login()}>
          Login
        </button>
      )}

      {user && <p>Logged in as {user.address} </p>}

      {user && (
        <button
          onClick={() =>
            mutate({
              amount: 1,
            })
          }
        >
          {isLoading ? "Claiming..." : "Claim NFT"}
        </button>
      )}
    </div>
    </div>
  );
}

export default Loginpage;
