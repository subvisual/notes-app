import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { v4 as uuidv4 } from "uuid";
import axios from "../lib/axios";
import { useStore } from "../lib/store";

export default function Connect() {
  const [authState, setAuthState] = useState<string>("");
  const [hasMetamask, setHasMetamask] = useState<boolean>();
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const {
    user: { setUserSig, setSignedKey },
    userNotes: { getAllNotes },
    userFolders: { getFolders },
    session: { isConnected, setIsConnected },
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
    if (!window.ethereum) return;

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
      let key = "";

      try {
        const res = await axios.get(`users?userSig=${userSignature}`);

        key = res?.data.userData.key;
      } catch (err: any) {
        if (err.data.message === "User not found") {
          key = uuidv4();
          await axios.post("users", {
            userSig: userSignature,
            key,
          });
        } else {
          throw err;
        }
      }

      const signedKey = await signer.signMessage(key);

      if (!signedKey || !userSignature) {
        throw new Error("Missing user information");
      }

      setUserSig(userSignature);
      setSignedKey(signedKey);
      setIsConnecting(false);
      setAuthState("Connected");
      setIsConnected(true);
      getAllNotes(userSignature, signedKey);
      getFolders(userSignature, signedKey);
    } catch (err: any) {
      if (err.code === 4001) {
        setAuthState("");
      } else {
        setAuthState("An error occurred. Please try again.");
      }

      setIsConnecting(false);
    }
  };

  return (
    <div className="mx-auto mt-24">
      {hasMetamask && !isConnected && (
        <button
          className="mb-9 rounded-3xl border-none bg-pistachio px-12 py-6 text-xl leading-none drop-shadow-connect-light dark:bg-dark-3 dark:drop-shadow-connect-dark"
          type="button"
          onClick={connect}
          disabled={isConnecting}
        >
          Connect to MetaMask wallet
        </button>
      )}
      <p>{authState}</p>
    </div>
  );
}
