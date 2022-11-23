import * as S from './styles';

interface HighLightProps {
  title: string
  subTitle: string
}

export function HighLight({ subTitle, title }: HighLightProps) {
  return (
    <S.Container>
      <S.Title>{title}</S.Title>

      <S.SubTitle>{subTitle}</S.SubTitle>
    </S.Container>
  );
}
