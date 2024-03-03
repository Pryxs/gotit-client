import styled from "@emotion/styled";
import { useState } from "react";

const Container = styled.div({
    
})


export const ModulesList = () => {
    const [selectedTab, setSelectedTab] = useState<string>('users')

    return(
            <Container>
                Module lsit
            </Container>
    )
}