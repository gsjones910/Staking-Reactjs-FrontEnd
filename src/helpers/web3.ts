import { DAI_CONTRACT } from '../constants'
import { STAKING_CONTRACT } from '../constants'


export function getDaiContract(chainId: number, web3: any) {
  const dai = new web3.eth.Contract(
    DAI_CONTRACT[chainId].abi,
    DAI_CONTRACT[chainId].address
  )
  return dai
}

export function callBalanceOf(address: string, chainId: number, web3: any) {
  return new Promise(async(resolve, reject) => {
    const dai = getDaiContract(chainId, web3)

    await dai.methods
      .balanceOf(address)
      .call(
        { from: '0x0000000000000000000000000000000000000000' },
        (err: any, data: any) => {
          if (err) {
            reject(err)
          }
          resolve(data)
        }
      )
  })
}

export function callTransfer(address: string, chainId: number, web3: any) {
  return new Promise(async(resolve, reject) => {
    const dai = getDaiContract(chainId, web3)
    await dai.methods
      .transfer(address, '1')
      .send({ from: address }, (err: any, data: any) => {
        if (err) {
          reject(err)
        }
        resolve(data)
      })
  })
}

export interface IAuctionData {
  no: number;
  date: string;
  time: number;
  remainTime: number;
  token: string;
  amount: number;
  price: number;
  seller: string;
  buyer: string;
  status: number;
}

// export async function callGetAuctions(address: string, chainId: number, web3: any, auctionList: IAuctionData[]){
//   const contract = new web3.eth.Contract(AUCTION_CONTRACT.abi, AUCTION_CONTRACT.address)
//   let ary = auctionList;
//   let allItems = await contract.methods.allAuctionItem().call();
//   localStorage.setItem('count', allItems.length);
//   let st = ary.length === 0 ? 0 : ary[0].no + 1;
  
//   if(st > 0){
//     for(let i = st; i < allItems.length; i ++){
//       try {
//         let item = await contract.methods.auctionNo(i).call();
//         if(item === undefined) break;
//         let seller = await contract.methods.sellerAddress(i).call();
//         let buyer = await contract.methods.buyerAddress(i).call();
//         let isClaimed = await contract.methods.isClaimed(i).call();
//         let isCompleted = await contract.methods.auctionNoIsCompleted(i).call();
//         var d = new Date(item['startTime'] * 1000)
//         let status = new Date().getTime() / 1000 - parseInt(item['startTime']) > 7200 ? 1 : 0;
//         if(status > 0 && isCompleted) status = 2;
//         if(isClaimed) status = 3;
//         const tp = {
//           no: i,
//           date: d.getFullYear() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + ("0" + d.getDate()).slice(-2) + ' ' + ("0" + d.getHours()).slice(-2) + ':' + ("0" + d.getMinutes()).slice(-2) + ':' + ("0" + d.getSeconds()).slice(-2),
//           time: parseInt(item['startTime']),
//           remainTime: 7200,
//           token: 'Cana',
//           amount: web3.utils.fromWei(item['amountToBuy']),
//           price: parseFloat(item['sellerbidPrice']) / 1000000,
//           seller: seller,
//           buyer: buyer,
//           status: status
//         };
//         ary.splice(0, 0, tp);
//         localStorage.setItem('auction-' + i, JSON.stringify(tp));
//       } catch (error) {
//         break;
//       }
//     }
//   }
//   // next data
//   st = ary.length === 0 ? allItems.length - 1 : ary[ary.length - 1].no - 1;

//   for(let i = st; i > 0 && i > st - 5 ; i --){
//     if(localStorage.getItem('auction-' + i) === null){
//       try {
//         let item = await contract.methods.auctionNo(i).call();
//         if(item === undefined) break;
//         let seller = await contract.methods.sellerAddress(i).call();
//         let buyer = await contract.methods.buyerAddress(i).call();
//         let isClaimed = await contract.methods.isClaimed(i).call();
//         let isCompleted = await contract.methods.auctionNoIsCompleted(i).call();
//         d = new Date(item['startTime'] * 1000)
//         let status = new Date().getTime() / 1000 - parseInt(item['startTime']) > 7200 ? 1 : 0;
//         if(status > 0 && isCompleted) status = 2;
//         if(isClaimed) status = 3;
//         const tp = {
//           no: i,
//           date: d.getFullYear() + '-' + ("0" + (d.getMonth() + 1)).slice(-2) + '-' + ("0" + d.getDate()).slice(-2) + ' ' + ("0" + d.getHours()).slice(-2) + ':' + ("0" + d.getMinutes()).slice(-2) + ':' + ("0" + d.getSeconds()).slice(-2),
//           time: parseInt(item['startTime']),
//           remainTime: 7200,
//           token: 'Cana',
//           amount: web3.utils.fromWei(item['amountToBuy']),
//           price: parseFloat(item['sellerbidPrice']) / 1000000,
//           seller: seller,
//           buyer: buyer,
//           status: status
//         };
//         ary.push(tp);
//         localStorage.setItem('auction-' + i, JSON.stringify(tp));
//       } catch (error) {
//         break;
//       }
//     }else{
//       const tp = JSON.parse(localStorage.getItem('auction-' + i)!) as IAuctionData;
//       ary.push(tp);
//     }
//   }
//   return ary;
// }

// export async function callCreateAuction(address: string, web3: any, amount: number){
//   try {
//     if(localStorage.getItem("approve_payment") === null){
//       const tokencontract = new web3.eth.Contract(PAYMENTTOKEN_CONTRACT.abi, PAYMENTTOKEN_CONTRACT.address)
//       await tokencontract.methods.approve(AUCTION_CONTRACT.address,'10000000000000000000000000000000000000000000000000000').send({ from : address });
//     }

//     localStorage.setItem("approve_payment", '1');
//     const contract = new web3.eth.Contract(AUCTION_CONTRACT.abi, AUCTION_CONTRACT.address)
//     await contract.methods.auction(amount.toString() + '000000000000000000').send({ from: address })
//     return true;
//   } catch (error) {
//     return false;
//   }
// }

export async function callInit(address: string, web3: any){
  try {
    const contract = new web3.eth.Contract(STAKING_CONTRACT.abi, STAKING_CONTRACT.address)
    let stakingAmount = await contract.methods.getBalanceOf(address).call();
    let rewardsAmount = await contract.methods.getRewardsOf(address).call();

    return {
      stakingAmount: web3.utils.fromWei(stakingAmount),
      rewardsAmount: web3.utils.fromWei(rewardsAmount),
    }
  } catch (error) {
    return {};
  }
}

export async function callStaking(address: string, web3: any, amount: string, blocks: string){
  try {
    const contract = new web3.eth.Contract(STAKING_CONTRACT.abi, STAKING_CONTRACT.address)
    console.log(web3.utils.toWei(amount));
    await contract.methods.stake(blocks).send({ from: address, value: web3.utils.toWei(amount) })
  } catch (error) {
    
  }
}

export async function callWithdraw(address: string, web3: any, amount: string){
  try {
    const contract = new web3.eth.Contract(STAKING_CONTRACT.abi, STAKING_CONTRACT.address)
    await contract.methods.withdraw(web3.utils.toWei(amount)).send({ from: address})
  } catch (error) {
    
  }
}



