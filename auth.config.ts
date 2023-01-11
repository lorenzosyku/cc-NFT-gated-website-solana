import { ThirdwebAuth } from "@thirdweb-dev/auth/next/solana";

export const domainName = 'example.org'

export const { ThirdwebAuthHandler, getUser } = ThirdwebAuth({
  privateKey: process.env.PRIVATE_KEY as string,
  domain: domainName,
});
