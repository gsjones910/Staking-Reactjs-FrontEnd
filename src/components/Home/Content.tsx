import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import 'react-dropdown/style.css';
import { colors } from '../../styles'
import Loader from "../../components/Loader";


interface Props {
    toggleModal: () => void,
    onStaking: (amount: string, blocks: string) => void,
    onWithdraw: (amount: string) => void,
    setModalStatus: (status: number) => void,
    showAlert:() => void,
    networkId: number,
    modalStatus: number,
    showModal: boolean,
    connected: boolean,
    stakingAmount: string,
    rewardsAmount: string
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            // backgroundColor: '#faf4',
            padding: '2em 10em',
            [theme.breakpoints.down('sm')]: {
                padding: '2em 2em',
            },
        },
    })
);


const BodyContainer = styled.div`
    background: transparent;
`
const SwitchButton = styled.button`
    width: 180px;
    height: 40px;
    border-radius: 4px;
    font-size: 16px;
    color: white;
    font-family: "Poppins-SemiBold";
    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }
`
const OutlineButton = styled(SwitchButton)`
    color: rgb(${colors.darkGrey});
    background-color: white;
    border: 2px solid rgb(${colors.darkGrey});
`
const AmountInput = styled.input`
    width: 320px;
    height: 40px;
    color: rgb(${colors.black});
    background-color: white;
    margin: 0 10px;
    border: 2px solid rgb(${colors.gradDark});
`
const Label = styled.p`
    font-size: 16px;
    color: #9e9e9e;
    font-family: "Poppins-SemiBold";
`

const DarkBackground = styled.div<ModalProps>`
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 999; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    background-color: rgba(0, 0, 0, 0.5); /* Black w/ opacity */
    align-items: center;
    justify-content: center;
    ${props => props.show && css`
        display: flex; /* show */
    `}
`

const SModalContainer = styled.div`
  width: 100%;
  position: relative;
  word-wrap: break-word;
`;

const SContainer = styled.div`
  height: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  word-break: break-word;
`;

const SModalParagraph = styled.p`
  color: white;
  margin-top: 30px;
`;

const LText = styled.p`
  margin-bottom: 30px;
`;

interface ModalProps {
    show: boolean;
}

const Content : React.FC<Props> = ({
    toggleModal,
    showAlert,
    networkId,
    modalStatus,
    setModalStatus,
    onStaking,
    onWithdraw,
    showModal,
    connected,
    stakingAmount,
    rewardsAmount
}) => {
    const classes = useStyles();
    const [selIndex, setSelIndex] = React.useState(0);
    const [stakeAmount, setStakeAmount] = React.useState('0');
    const [stakeBlock, setStakeBlock] = React.useState('0');
    const [withdrawAmount, setWithdrawAmount] = React.useState('0');



    const onClickStaking = async () => {
        if(networkId !== 4){
            showAlert();
            return;
        }
        await onStaking(stakeAmount, stakeBlock);
    }

    const onClickWithdraw = async () => {
        if(networkId !== 4){
            showAlert();
            return;
        }
        await onWithdraw(withdrawAmount);
    }

    return (
        <BodyContainer>
            <DarkBackground show={showModal}>
                <SModalContainer>
                    <SContainer>
                        <Loader />
                        <SModalParagraph>
                        {"Waiting..."}
                        </SModalParagraph>
                    </SContainer>
                </SModalContainer>
            </DarkBackground>
            <Container maxWidth="xl" className={classes.main}>
                <Grid container spacing={2}>
                    <AmountInput value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} type='number'/>
                    <AmountInput value={stakeBlock} onChange={(e) => setStakeBlock(e.target.value)} type='number'/>
                    <OutlineButton onClick={(e) => onClickStaking()}>Staking</OutlineButton>
                </Grid>
            </Container>
            <Container maxWidth="xl" className={classes.main}>
                <LText >Total : {stakingAmount} ETH</LText>
                <Grid container spacing={2}>
                    <AmountInput value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)} type='number'/>
                    <OutlineButton onClick={(e) => onClickWithdraw()}>Withdraw</OutlineButton>
                </Grid>
            </Container>
            <Container maxWidth="xl" className={classes.main}>
                <LText >Rewards : {rewardsAmount} RWD</LText>
            </Container>
        </BodyContainer>
    )
}

export default Content
