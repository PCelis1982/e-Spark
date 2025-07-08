import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { WagmiConfig } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { defaultWagmiConfig, createWeb3Modal } from '@web3modal/wagmi/react';

const projectId = 'cdf1d6c2caf185f3876ea5569333520d';

const metadata = {
  name: 'e-Spark',
  description: 'EV Charging Infrastructure',
  url: 'https://local.e-spark.dev',
  icons: ['/assets/Logot01.png']
};

const chains = [mainnet];
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

createWeb3Modal({
  wagmiConfig,
  projectId,
  chains,
  themeMode: 'dark',
  themeColor: 'cyan',
  themeBackground: 'themeColor'
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiConfig config={wagmiConfig}>
      <App />
    </WagmiConfig>
  </React.StrictMode>
);
