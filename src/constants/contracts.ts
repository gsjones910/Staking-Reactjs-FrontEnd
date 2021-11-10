export const DAI_CONTRACT:any = {
  1: {
    address: '0x6b175474e89094c44da98b954eedeac495271d0f',
    abi: [
      {
        constant: true,
        inputs: [{ name: 'src', type: 'address' }],
        name: 'balanceOf',
        outputs: [{ name: '', type: 'uint256' }],
        payable: false,
        stateMutability: 'view',
        type: 'function'
      },
      {
        constant: false,
        inputs: [
          { name: 'dst', type: 'address' },
          { name: 'wad', type: 'uint256' }
        ],
        name: 'transfer',
        outputs: [{ name: '', type: 'bool' }],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function'
      }
    ]
  }
}

export const STAKING_CONTRACT : any = {
  address: '0x91D5990c1130899f7CfA34364F7d5D2D161a942B',
  abi: [{"inputs":[{"internalType":"address","name":"_rewardsToken","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"}],"name":"ClaimReward","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"rewards","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"rewardPerTokenStored","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"lastUpdateTime","type":"uint256"}],"name":"RewardUpdated","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountSoFar","type":"uint256"}],"name":"Stake","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"},{"indexed":false,"internalType":"uint256","name":"amount","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"amountRemaining","type":"uint256"}],"name":"Withdraw","type":"event"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"_balances","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"claimReward","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"earned","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getBalanceOf","outputs":[{"internalType":"uint256","name":"_balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRewardRate","outputs":[{"internalType":"uint256","name":"_rewardRate","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getRewardToken","outputs":[{"internalType":"address","name":"_address","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getRewardsOf","outputs":[{"internalType":"uint256","name":"_balance","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWithdrawFee","outputs":[{"internalType":"uint256","name":"_withdrawFee","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getWithdrawFeeStatus","outputs":[{"internalType":"bool","name":"_withdrawFeeStatus","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"lastUpdateTime","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"rewardPerToken","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardPerTokenStored","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"rewards","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"rewardsToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_rewardRate","type":"uint256"}],"name":"setRewardRate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"_withdrawFee","type":"uint256"}],"name":"setWithdrawFee","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"bool","name":"_withdrawFeeStatus","type":"bool"}],"name":"setWithdrawFeeStatus","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"blocks","type":"uint256"}],"name":"stake","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"userRewardPerTokenPaid","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"withdraw","outputs":[],"stateMutability":"nonpayable","type":"function"}]
}