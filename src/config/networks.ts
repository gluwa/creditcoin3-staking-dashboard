// Copyright 2023 @paritytech/polkadot-staking-dashboard authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { DefaultParams } from 'consts';
import CreditcoinIconSVG from 'img/ic_creditcoin.svg?react';
import CreditcoinLogoSVG from 'img/logo_creditcoin.svg?react';

import type { Network, NetworkName, Networks } from 'types';

const CreditcoinTokenSVG = CreditcoinIconSVG;

type NetworkConfig = {
  name: NetworkName;
  endpoints: Network['endpoints'];
  namespace?: string;
  subscanEndpoint: string;
  subscanUrl: string;
  currentEraWhenUpgraded?: number;
};

const makeCreditcoinNetwork = ({
  name,
  endpoints,
  namespace,
  subscanEndpoint,
  subscanUrl,
  currentEraWhenUpgraded,
}: NetworkConfig): Network => {
  return {
    name,
    endpoints,
    namespace: namespace ?? '09573a3526818a8ecd6eb92f60f1175d',
    subscanEndpoint,
    subscanUrl,
    currentEraWhenUpgraded,

    api: {
      unit: 'CTC',
      priceTicker: 'CTCUSDT',
    },
    params: {
      ...DefaultParams,
    },
    ss58: 42,
    unit: 'CTC',
    units: 18,
    brand: {
      icon: CreditcoinIconSVG,
      token: CreditcoinTokenSVG,
      logo: {
        svg: CreditcoinLogoSVG,
        width: '7.2em',
      },
      inline: {
        svg: CreditcoinIconSVG,
        size: '1.05em',
      },
    },
    colors: {
      primary: {
        light: 'rgb(211, 48, 121)',
        dark: 'rgb(211, 48, 121)',
      },
      secondary: {
        light: '#552bbf',
        dark: '#6d39ee',
      },
      stroke: {
        light: 'rgb(211, 48, 121)',
        dark: 'rgb(211, 48, 121)',
      },
      transparent: {
        light: 'rgb(211, 48, 121, 0.05)',
        dark: 'rgb(211, 48, 121, 0.05)',
      },
      pending: {
        light: 'rgb(211, 48, 121, 0.33)',
        dark: 'rgb(211, 48, 121, 0.33)',
      },
    },
    defaultFeeReserve: 0.1,
  };
};

const makeNetworkList = () => {
  const networks: Networks = {};
  if (import.meta.env.VITE_ENVIRONMENT !== 'prod') {
    networks.creditcoinDev = makeCreditcoinNetwork({
      name: 'creditcoinDev',
      endpoints: {
        lightClient: null,
        defaultRpcEndpoint: 'Gluwa',
        rpcEndpoints: {
          Gluwa: 'wss://rpc.cc3-devnet.creditcoin.network/ws',
        },
      },
      namespace: '09573a3526818a8ecd6eb92f60f1175d',
      subscanEndpoint: 'https://subscan-cc3-devnet.creditcoin.network',
      subscanUrl: 'https://creditcoin3-dev.subscan.io',
    });
    networks.creditcoindryrun = makeCreditcoinNetwork({
      name: 'creditcoindryrun',
      endpoints: {
        lightClient: null,
        defaultRpcEndpoint: 'Gluwa',
        rpcEndpoints: {
          Gluwa: 'wss://rpc.cc3-devnet-dryrun.creditcoin.network/ws',
        },
      },
      namespace: '09573a3526818a8ecd6eb92f60f1175d',
      subscanEndpoint: 'https://subscan-cc3-testnet.creditcoin.network',
      subscanUrl: 'https://creditcoin3-testnet.subscan.io',
      currentEraWhenUpgraded: 4,
    });
  }
  networks.creditcoinTest = makeCreditcoinNetwork({
    name: 'creditcoinTest',
    endpoints: {
      lightClient: null,
      defaultRpcEndpoint: 'Gluwa',
      rpcEndpoints: {
        Gluwa: 'wss://rpc.cc3-testnet.creditcoin.network/ws',
      },
    },
    namespace: '09573a3526818a8ecd6eb92f60f1175d',
    subscanEndpoint: 'https://subscan-cc3-testnet.creditcoin.network',
    subscanUrl: 'https://creditcoin3-testnet.subscan.io',
    currentEraWhenUpgraded: 557,
  });
  networks.creditcoin = makeCreditcoinNetwork({
    name: 'creditcoin',
    endpoints: {
      lightClient: null,
      defaultRpcEndpoint: 'Gluwa',
      rpcEndpoints: {
        Gluwa: 'wss://mainnet3.creditcoin.network',
      },
    },
    namespace: 'creditcoin-mainnet',
    subscanEndpoint: 'https://subscan-cc3-mainnet.creditcoin.network',
    subscanUrl: 'https://creditcoin.subscan.io',
    currentEraWhenUpgraded: 384,
  });
  if (import.meta.env.DEV) {
    networks.creditcoinLocal = makeCreditcoinNetwork({
      name: 'creditcoinLocal',
      endpoints: {
        lightClient: null,
        defaultRpcEndpoint: 'Local',
        rpcEndpoints: {
          Local: 'ws://127.0.0.1:9944',
        },
      },
      subscanEndpoint: 'http://127.0.0.1:4399',
      subscanUrl: 'https://creditcoin3-testnet.subscan.io',
    });
  }
  return networks;
};

export const NetworkList: Networks = makeNetworkList();
