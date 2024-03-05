import styled from "@emotion/styled";
import { Layout } from "components"
import { useState } from "react";
import { UsersList } from 'features/users';
import { LessonsList } from "features/lessons";
import { ModulesList } from "features/modules";
import { CategoriesList } from "features/categories";

type TabType = 'users' | 'lessons' | 'modules' | 'categories';

const Container = styled.div({
    padding: '24px',
})

const TabControl = styled.div({
    display: 'flex',
    gap: '24px',
    marginBottom: '16px',
})

const TabButton = styled.button(({ isActive }: { isActive: boolean}) => ({
    borderBottom: '1px solid transparent',
    '&:hover': {
        color: 'var(--dynamic-color)',
    },
    ...(isActive && {
        color: 'var(--dynamic-color)',
        borderBottom: '1px solid var(--dynamic-color)',
    })
}))

export const Management = () => {
    const [selectedTab, setSelectedTab] = useState<TabType>('users')

    return(
        <Layout>
            <Container>
                <TabControl>
                    <TabButton onClick={() => setSelectedTab('users')} isActive={selectedTab === 'users'}>
                        Utilisateurs
                    </TabButton>
                    <TabButton onClick={() => setSelectedTab('lessons')} isActive={selectedTab === 'lessons'}>
                        Cours
                    </TabButton>
                    <TabButton onClick={() => setSelectedTab('modules')} isActive={selectedTab === 'modules'}>
                        Modules
                    </TabButton>
                    <TabButton onClick={() => setSelectedTab('categories')} isActive={selectedTab === 'categories'}>
                        Catégories
                    </TabButton>
                </TabControl>
                {selectedTab === 'users' && (
                    <UsersList />
                )}
                {selectedTab === 'lessons' && (
                    <LessonsList />
                )}
                {selectedTab === 'modules' && (
                    <ModulesList />
                )}
                {selectedTab === 'categories' && (
                    <CategoriesList />
                )}
            </Container>
        </Layout>
    )
}