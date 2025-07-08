import React from 'react';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { Web3Modal } from '@web3modal/react';
import LandingPage from './LandingPage.jsx';

const projectId = 'cdf1d6c2caf185f3876ea5569333520d';

export default function App() {
  const { open } = useWeb3Modal();

  return (
    <>
      <LandingPage openWalletModal={open} />
      <Web3Modal projectId={projectId} />
    </>
  );
}
