import {Platform} from 'react-native';

export const androidOuterGap = Platform.OS === 'android' ? 30 : 0;
export const floatingPanelGap = Platform.OS === 'android' ? 30 : 20;
