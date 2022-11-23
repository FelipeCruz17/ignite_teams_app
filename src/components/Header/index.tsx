import { useNavigation } from '@react-navigation/native';
import * as S from './styles';

import logo from '@assets/logo.png';

interface HeaderProps {
  showBackButton?: boolean
}

export function Header({ showBackButton = false }: HeaderProps) {
  const navigation = useNavigation();

  function handleGoBack() {
    navigation.navigate('groups');
  }

  return (
    <S.Container>
      {showBackButton && (
        <S.BackButton onPress={handleGoBack}>
          <S.BackIcon />
        </S.BackButton>
      )}

      <S.Logo source={logo} />
    </S.Container>
  );
}
