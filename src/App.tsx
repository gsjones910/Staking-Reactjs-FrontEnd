import * as React from "react";
import Web3 from "web3";

import Web3Modal from "web3modal";
// @ts-ignore
import WalletConnectProvider from "@walletconnect/web3-provider";
import {
  getChainData
} from "./helpers/utilities";

import { callInit, callStaking, callWithdraw } from "./helpers/web3";

import Header from './components/Home/Header'
import Content from './components/Home/Content'
import ScreenWrapper from './components/Home/ScreenWrapper'
import Container from '@material-ui/core/Container';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


interface IAppState {
  fetching: boolean;
  address: string;
  web3: any;
  provider: any;
  connected: boolean;
  chainId: number;
  networkId: number;
  showModal: boolean;
  modalStatus: number;
  result: any | null;
  isLoaded: boolean;
  isHide: boolean;
  ethBalance: string;
  rwdBalance: string;
  stakingAmount: string;
  rewardsAmount: string;
}

const INITIAL_STATE: IAppState = {
  fetching: false,
  address: "",
  web3: null,
  provider: null,
  connected: false,
  chainId: 4,
  networkId: 4,
  showModal: false,
  modalStatus: 0,
  result: null,
  isLoaded: false,
  isHide: true,
  ethBalance: '0',
  rwdBalance: '0',
  stakingAmount: '0',
  rewardsAmount: '0'
};

function initWeb3(provider: any) {
  const web3: any = new Web3(provider);

  web3.eth.extend({
    methods: [
      {
        name: "chainId",
        call: "eth_chainId",
        outputFormatter: web3.utils.hexToNumber
      }
    ]
  });
  return web3;
}

class App extends React.Component<any, any> {
  // @ts-ignore
  public web3Modal: Web3Modal;
  public state: IAppState;

  constructor(props: any) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };

    this.web3Modal = new Web3Modal({
      network: this.getNetwork(),
      cacheProvider: true,
      providerOptions: this.getProviderOptions(),
      // theme: {
      //   background: "rgba(43, 51, 94, 0.9)",
      //   main: "rgb(250, 250, 250)",
      //   secondary: "rgba(250, 250, 250, 0.7)",
      //   border: "rgba(196, 196, 196, 0.3)",
      //   hover: "rgba(53, 61, 104, 0.75)"
      // }
    });
  }

  public componentDidMount() {
    if (this.web3Modal.cachedProvider) {
      this.onConnect();
    }
    
  }

  public onConnect = async () => {
    
    const provider = await this.web3Modal.connect();

    await this.subscribeProvider(provider);

    const web3: any = initWeb3(provider);

    const accounts = await web3.eth.getAccounts();

    const address = accounts[0];

    const networkId = await web3.eth.net.getId();
    
    const chainId = await web3.eth.chainId();
    this.toggleModal();
    await this.setState({
      web3,
      provider,
      connected: true,
      address,
      chainId,
      networkId
    });
    if(networkId !== 4){
      this.showAlert();
      this.toggleModal();
      return;
    }
    await this.getInitData();
    this.toggleModal();
  };

  public subscribeProvider = async (provider: any) => {
    if (!provider.on) {
      return;
    }
    provider.on("close", () => this.resetApp());
    provider.on("accountsChanged", async (accounts: string[]) => {
      await this.setState({ address: accounts[0] });
    });
    provider.on("chainChanged", async (chainId: number) => {
      const { web3 } = this.state;
      if(web3 === null) return;
      const networkId = await web3.eth.net.getId();
      if(networkId === 4){
        await this.setState({ chainId, networkId });
      }
      await this.setState({ chainId, networkId });
    });
  };

  public getNetwork = () => getChainData(this.state.chainId).network;

  public getProviderOptions = () => {
    const providerOptions = {
      // walletconnect: {
      //   package: WalletConnectProvider,
      //   options: {
      //     infuraId: process.env.REACT_APP_INFURA_ID
      //   }
      // },
      // portis: {
      //   package: Portis,
      //   options: {
      //     id: process.env.REACT_APP_PORTIS_ID
      //   }
      // },
      // fortmatic: {
      //   package: Fortmatic,
      //   options: {
      //     key: process.env.REACT_APP_FORTMATIC_KEY
      //   }
      // },
      // mewconnect: {
      //   package: MewConnect, // required
      //   options: {
      //     infuraId: process.env.REACT_APP_INFURA_ID // required
      //   }
      // },
      // torus: {
      //   package: Torus
      // }
    };
    return providerOptions;
  };

  public toggleModal = () =>
    this.setState({ showModal: !this.state.showModal });

  public getInitData = async() => {
    const { web3, address } = this.state;
    try {
      const result = await callInit(address,  web3);
      console.log(result)
      this.setState(result);
    } catch (error) {
      
    }
  }

  public onStaking = async (amount: string, blocks: string) => {
    const {networkId} = this.state;
    if(networkId !== 4){
      this.showAlert();
      return;
    }
    const { web3, address } = this.state;
    try {
      this.toggleModal();
      await callStaking(address,  web3, amount, blocks);
      await this.getInitData();
      this.toggleModal();
    } catch (error) {
    }
  }

  public onWithdraw = async (amount: string) => {
    const {networkId} = this.state;
    if(networkId !== 4){
      this.showAlert();
      return;
    }
    const { web3, address } = this.state;
    try {
      this.toggleModal();
      await callWithdraw(address,  web3, amount);
      await this.getInitData();
      this.toggleModal();
    } catch (error) {
    }
  }


  


  public showAlert() {
    toast.dismiss();
    let toastOptions = {
      autoClose: 5000,
      type: toast.TYPE.INFO,
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_CENTER,
      pauseOnHover: true,
    };
    setTimeout(() => {
      toast.success("Network Error!", toastOptions);
    }, 400)
  }

  public resetApp = async () => {
    const { web3 } = this.state;
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    await this.web3Modal.clearCachedProvider();
    this.setState({ ...INITIAL_STATE });
  };

  public _setIsLoaded = () => {
    this.setState({ isLoaded: true })
  }

  public _onHideMenu = (bool: boolean) => {
    this.setState({ isHide: bool })
  }

  public _setModalStatus = (status: number) => {
    this.setState({modalStatus: status});
  }

  public _setSelIndex = (index: number) => {
    this.setState({selAuctionIndex: index});
  }

  public render = () => {
    const {
      address,
      connected,
      chainId,
      modalStatus,
      showModal,
      networkId,
      stakingAmount,
      rewardsAmount
    } = this.state;
    return (
      <ScreenWrapper>
        <Header 
          onConnect={this.onConnect}
          connected={connected}
          address={address}
          chainId={chainId}
          killSession={this.resetApp} 
        />
        <ToastContainer/>
        <Container maxWidth="xl">
          <Content
            modalStatus={modalStatus}
            setModalStatus={this._setModalStatus}
            showModal={showModal}
            toggleModal={this.toggleModal}
            connected={connected}
            networkId={networkId}
            showAlert={this.showAlert}
            onStaking={this.onStaking}
            onWithdraw={this.onWithdraw}
            stakingAmount={stakingAmount}
            rewardsAmount={rewardsAmount}
          />
        </Container>
      </ScreenWrapper>
    );
  };
}

export default App;