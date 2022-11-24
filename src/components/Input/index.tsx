import { TextInputProps, TextInput } from 'react-native';
import { useTheme } from 'styled-components/native';
import * as S from './styles';

interface InputProps extends TextInputProps {
  inputRef?: React.RefObject<TextInput>
}

export function Input({ inputRef, ...rest }: InputProps) {
  const { COLORS } = useTheme();

  return (
    <S.Container
      ref={inputRef}
      placeholderTextColor={COLORS.GRAY_300}
      {...rest}
    />
  );
}
