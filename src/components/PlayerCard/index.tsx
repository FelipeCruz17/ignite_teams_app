import * as S from './styles';
import { ButtonIcon } from '../ButtonIcon';

interface PlayerCardProps {
  name: string
  onRemove: () => void
}

export function PlayerCard({ name, onRemove }: PlayerCardProps) {
  return (
    <S.Container>
      <S.Icon name="person" />

      <S.Name>
        {name}
      </S.Name>

      <ButtonIcon
        icon='close'
        type="SECONDARY"
        onPress={onRemove}
      />
    </S.Container>
  );
}
