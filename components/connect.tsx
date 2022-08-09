import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { v4 as uuidv4 } from 'uuid';

export default function Connect() {
  const [authState, setAuthState] = useState<string>('');
  const [hasMetamask, setHasMetamask] = useState<boolean>();
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  useEffect(() => {
    if (!window.ethereum) {
      setAuthState('Please install MetaMask wallet');
      setHasMetamask(false);

      return;
    }

    setHasMetamask(true);
  }, []);

  const connect = async () => {
    try {
      setIsConnecting(true);
      setAuthState('Connecting to your wallet...');

      const provider = new ethers.providers.Web3Provider(window.ethereum);

      await provider.send('eth_requestAccounts', []);
      const signer = provider.getSigner();

      setAuthState('Please sign the message...');

      const userSignature = await signer.signMessage(
        `Hi, please sign this message: ${process.env.NEXT_PUBLIC_RANDOM_STRING}`
      );

      // TODO: Get user from DB, if found: get user key, if not found: create new user and generate new key

      let key = uuidv4();

      const signedUserKey = await signer.signMessage(key);

      if (!signedUserKey || !userSignature) {
        throw new Error();
      }

      setIsConnecting(false);
      setAuthState('Connected');
    } catch (err) {
      setAuthState('An error occurred. Please try again.');
      console.log(err);
      setIsConnecting(false);
    }
  };

  return (
    <div>
      {hasMetamask && (
        <button type='button' onClick={connect} disabled={isConnecting}>
          Connect to MetaMask wallet
        </button>
      )}
      <p>{authState}</p>
    </div>
  );
}
