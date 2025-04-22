// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router'

const TabsLayout = () => {
    return (
        <Tabs screenOptions={{headerShown: false}}>
            <Tabs.Screen
                name="tanks"
                options={{
                    headerShown: false
                }}
            />
            <Tabs.Screen
                name="search"
                options={{
                   headerShown: false
                }} />
        </Tabs>
    )
}

export default TabsLayout