import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { getUser, createUser } from "../pages/api/db";
import { v4 as uuidv4 } from "uuid";
import { useStore } from "../lib/store";

const Connect = () => {
  const [authState, setAuthState] = useState<string>("");
  const [hasMetamask, setHasMetamask] = useState<boolean>();
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const {
    user: { setUserSig, setSignedKey },
    session: { setIsConnected },
  } = useStore();

  useEffect(() => {
    if (!window.ethereum) {
      setAuthState("Please install MetaMask wallet");
      setHasMetamask(false);
      return;
    }
    setHasMetamask(true);
  }, []);

  const connect = async () => {
    try {
      setIsConnecting(true);
      setAuthState("Connecting to your wallet...");

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();

      setAuthState("Please sign the message...");

      const userSignature = await signer.signMessage(
        `Hi, please sign this message: ${process.env.NEXT_PUBLIC_RANDOM_STRING}`,
      );

      const user = await getUser(userSignature);

      let key = "";
      if (user?.data?.length) {
        key = user.data[0].key;
      } else {
        key = uuidv4();
        let { data } = await createUser(userSignature, key);
      }

      const signedUserKey = await signer.signMessage(key);

      if (!signedUserKey || !userSignature) {
        throw new Error();
      }

      setSignedKey(signedUserKey);
      setUserSig(userSignature);
      setIsConnecting(false);
      setIsConnected(true);
      setAuthState("Connected");
    } catch (err) {
      setAuthState("An error occurred. Please try again.");
      console.log(err);
      setIsConnecting(false);
    }
  };

  return (
    <div className="mx-auto">
      {hasMetamask && (
        <button onClick={connect} disabled={isConnecting}>
          Connect to MetaMask wallet
        </button>
      )}
      <p>{authState}</p>
    </div>
  );
};

export default Connect;
