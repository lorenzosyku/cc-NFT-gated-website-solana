import { useLogout } from "@thirdweb-dev/react/solana";
import { NFT } from "@thirdweb-dev/sdk";
import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import type { GetServerSideProps } from "next";
import { getUser } from "../auth.config";
import { network } from "./_app";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const sdk = ThirdwebSDK.fromNetwork(network);

  const user = await getUser(req);

  console.log("user is", user);

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  //TODO:check if user has the nft then allow the access
  const program = await sdk.getNFTDrop(process.env.NEXT_PUBLIC_PROGRAM_ADDRESS!);

  const nfts = await program.getAllClaimed();

  const nft = nfts.find((nft) => nft.owner === user.address);

  if (!nft) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      usersNFT: nft
    },
  };
};

type Props = {
  usersNFT: NFT
}

enum Membership {
  Standard="GYMPASS Standard",
  Gold="GYMPASS Gold",
  Platinium="GYMPASS Platinium"
}

type MembershipType ={
  name: Membership
}

const Home = ({usersNFT}: Props) => {
  const logout = useLogout();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1>THIS IS A PROTECETD PAGE</h1>
      <h3>you need to have an gympass nft to accessthis page</h3>

      <button onClick={logout}>Logout</button>

      <div className="">
        {usersNFT.metadata.image}
        {usersNFT.metadata.name}

        {usersNFT.metadata.name === Membership.Platinium && (
          <h1>Platinium Content</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
