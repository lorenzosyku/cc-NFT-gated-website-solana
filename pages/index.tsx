import { ThirdwebSDK } from "@thirdweb-dev/sdk/solana";
import type { GetServerSideProps } from "next";
import { getUser } from "../auth.config";
import { network } from "./_app";

export const getServerSideProps: GetServerSideProps = async ({req, res}) => {
  const sdk = ThirdwebSDK.fromNetwork(network);

  const user = await getUser(req)

  console.log("user is", user)

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  //TODO:check if user has the nft then allow the access

  return {
    props: {}
  }
};

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-2">
      <h1>THIS IS A PROTECETD PAGE</h1>
      <h3>you need to have an gympass nft to accessthis page</h3>
    </div>
  );
};

export default Home;
