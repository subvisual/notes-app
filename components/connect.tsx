import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { v4 as uuidv4 } from 'uuid';
import axios from 'redaxios';
import { useStore } from '../lib/store';

export default function Connect() {
  const [authState, setAuthState] = useState<string>('');
  const [hasMetamask, setHasMetamask] = useState<boolean>();
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const {
    user: { setUserSig, setSignedKey },
    session: { isConnected, setIsConnected },
  } = useStore();

  useEffect(() => {
    if (!window.ethereum) {
      setAuthState('Please install MetaMask wallet');
      setHasMetamask(false);
      return;
    }

    setHasMetamask(true);
  }, []);

  const connect = async () => {
    if (!window.ethereum) return;
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

      let key = '';

      try {
        const res = await axios.get(`http://localhost:3000/api/users?userSig=${userSignature}`);
        key = res?.data.userData.key;
      } catch (err: any) {
        if (err.data.message === 'User not found') {
          key = uuidv4();
          await axios.post('http://localhost:3000/api/users', {
            userSig: userSignature,
            key,
          });
        } else {
          throw err;
        }
      }

      const signedKey = await signer.signMessage(key);

      if (!signedKey || !userSignature) {
        throw new Error('Missing user information');
      }

      setUserSig(userSignature);
      setSignedKey(signedKey);
      setIsConnecting(false);
      setAuthState('Connected');
      setIsConnected(true);
    } catch (err: any) {
      if (err.code === 4001) {
        setAuthState('');
      } else {
        setAuthState('An error occurred. Please try again.');
      }

      setIsConnecting(false);
    }
  };

  return (
    <div>
      {hasMetamask && !isConnected && (
        <button type='button' onClick={connect} disabled={isConnecting}>
          Connect to MetaMask wallet
        </button>
      )}
      <p>{authState}</p>
    </div>
  );
}
