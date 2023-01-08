import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebProvider } from "@thirdweb-dev/react/solana";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

const network = "devnet";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider
      network={network}
      authConfig={{
        authUrl: "/api/auth",
        domain: "example.org",
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
