import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RootStackParamList = {
  [key: string]: any;
};

export interface NavProps extends NativeStackNavigationProp<RootStackParamList> {}