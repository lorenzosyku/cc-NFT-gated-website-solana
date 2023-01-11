import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react/solana";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { Network } from "@thirdweb-dev/sdk/solana";
import { domainName } from "../auth.config";

export const network: Network = "devnet";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      network={network}
      authConfig={{
        authUrl: "/api/auth",
        domain: domainName,
        loginRedirect: "/",
      }}
    >
      <WalletModalProvider>
        <Component {...pageProps} />
      </WalletModalProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;
