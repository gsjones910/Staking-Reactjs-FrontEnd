import { IChainData } from "./types";

const supportedChains: IChainData[] = [
  {
    name: "Ethereum Rinkeby",
    short_name: "rin",
    chain: "ETH",
    network: "rinkeby",
    chain_id: 4,
    network_id: 4,
    rpc_url: "https://rinkeby.infura.io/v3/" + process.env.REACT_APP_INFURA_ID,
    native_currency: {
      symbol: "ETH",
      name: "Ethereum",
      decimals: "18",
      contractAddress: "",
      balance: ""
    }
  }
];

export default supportedChains;
