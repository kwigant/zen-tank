import * as React from 'react';
import { ActivityIndicator, useTheme } from 'react-native-paper';

export default function Loading() {
    const theme = useTheme()
    return (
        <ActivityIndicator animating={true} color={theme.colors.primary} />
    )
}