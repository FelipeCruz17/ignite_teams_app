import { Button } from '@components/Button';
import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { Input } from '@components/Input';
import * as S from './styles';

export function NewGroup() {
  return (
    <S.Container>
      <Header showBackButton />

      <S.Content>
        <S.Icon />
        <HighLight
          title="Nova turma"
          subTitle="Crie uma turma para adicionar as pessoas"
        />

        <Input
          placeholder='Nome da turma'
        />

        <Button title="Criar" style={{ marginTop: 20 }}/>
      </S.Content>
    </S.Container>
  );
}
