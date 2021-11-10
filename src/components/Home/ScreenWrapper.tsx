import React from 'react'
import styled from 'styled-components'

interface Props {
}

const AppContainer = styled.div`
    background-color: white;
    width: 100%;
    height: 100vh;
`

const ScreenWrapper: React.FC<Props> = ({ children }) => {
    return <AppContainer>{children}</AppContainer>
}

export default ScreenWrapper
