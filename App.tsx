import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from '@expo-google-fonts/roboto';
import theme from './src/theme';
import { Routes } from '@routes/index';
import { Loading } from '@components/Loading';


export default function App() {
  const [isFontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {isFontsLoaded ? <Routes /> : <Loading />}
    </ThemeProvider>
  );
}
