import styled from "@emotion/styled";
import { useState } from "react";

const Container = styled.div({
    
})


export const LessonsList = () => {
    const [selectedTab, setSelectedTab] = useState<string>('users')

    return(
            <Container>
                Lessons lsit
            </Container>
    )
}