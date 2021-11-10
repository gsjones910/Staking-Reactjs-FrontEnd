import React from 'react'
import styled from 'styled-components'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { colors } from '../../styles'
import logo from '../../assets/images/logo.png'
import Blockie from '../Blockie'
import { transitions } from '../../styles'
import { ellipseAddress } from '../../helpers/utilities'

interface Props {
    onConnect: () => void
    killSession: () => void
    connected: boolean
    address: string
    chainId: number
}

const useStyles = makeStyles((theme) => ({
    main: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 100,
        [theme.breakpoints.down('xs')]: {
            height: 200,
        },
    },
    logoArea: {
        display: 'flex',
        justifyContent: 'flex-end',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            margin: '5px 0'
        },
    },
    btnArea: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 10em !important',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            padding: '0 3em !important',
            margin: '5px 0'
        },
    },
    dropdownArea: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 7em !important',
        [theme.breakpoints.down('sm')]: {
            justifyContent: 'center',
            padding: '0 3em !important',
            margin: '5px 0'
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    dropdown: {
        width: 180,
    }
}));
const HeaderContainer = styled.div`
    width: 100%;
    background: white;
    box-shadow: 0px 4px 12px rgba(164, 193, 211, 0.251);
`;
const LogoImage = styled.img`
    width: 108px;
    height: 68px;
    background-size: cover;
    &:hover {
        cursor: pointer;
    }
`
const MainButton = styled.button`
    width: 180px;
    height: 50px;
    background-color: rgb(${colors.main});
    border-radius: 4px;
    font-size: 16px;
    color: white;
    font-family: "Poppins-SemiBold";
    &:hover {
        opacity: 0.8;
        cursor: pointer;
    }
`


const SActiveAccount = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  font-weight: 500;
`

const SBlockie = styled(Blockie)`
  margin-right: 10px;
`

interface IHeaderStyle {
  connected: boolean
}

const SAddress = styled.p<IHeaderStyle>`
  transition: ${transitions.base};
  font-weight: bold;
  margin: ${({ connected }) => (connected ? '-2px auto 0.7em' : '0')};
`

const SDisconnect = styled.div<IHeaderStyle>`
  transition: ${transitions.button};
  font-size: 12px;
  font-family: monospace;
  position: absolute;
  right: 0;
  top: 20px;
  opacity: 0.7;
  cursor: pointer;

  opacity: ${({ connected }) => (connected ? 1 : 0)};
  visibility: ${({ connected }) => (connected ? 'visible' : 'hidden')};
  pointer-events: ${({ connected }) => (connected ? 'auto' : 'none')};

  &:hover {
    transform: translateY(-1px);
    opacity: 0.5;
  }
`

const options = [
    'Canna'
];
const Header : React.FC<Props> = ({
    onConnect,
    killSession,
    connected,
    address,
    chainId
}) => {
    const classes = useStyles();
    const [selected, setSelected] = React.useState('');
    const defaultOption = selected
    const handleChange = (event: any) => {
        setSelected(event);
    };
    return (
        <HeaderContainer>
            <Container maxWidth="xl" className={classes.main}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={2} className={classes.logoArea}>
                        <LogoImage src={logo} alt="logo"/>
                    </Grid>
                    <Grid item xs={12} sm={5}></Grid>
                    <Grid item xs={12} sm={5} className={classes.btnArea}>
                        {address ?  (
                            <SActiveAccount>
                            <SBlockie address={address} />
                            <SAddress connected={connected}>{ellipseAddress(address)}</SAddress>
                            <SDisconnect connected={connected} onClick={killSession}>
                                {'Disconnect'}
                            </SDisconnect>
                            </SActiveAccount>
                        )
                        :<MainButton onClick={onConnect}>Connect Wallet</MainButton>}
                    </Grid>
                </Grid>
            </Container>
        </HeaderContainer>
    )
}

export default Header
