import { useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Button } from '@components/Button';
import { ButtonIcon } from '@components/ButtonIcon';
import { Filter } from '@components/Filter';
import { FlatList } from 'react-native';
import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { Input } from '@components/Input';
import { PlayerCard } from '@components/PlayerCard';
import { ListEmpty } from '@components/ListEmpty';
import * as S from './styles';

type RouteParams = {
  group: string
}

export function Players() {
  const [team, setTeam] = useState('TIME A');
  const [players, setPlayers] = useState([]);

  const route = useRoute();
  const { group } = route.params as RouteParams;

  return (
    <S.Container>
      <Header showBackButton />

      <HighLight
        title={group}
        subTitle='Adicione a galera e separa os times'
      />

      <S.Form>
        <Input
          placeholder='Nome da pessoa'
          autoCorrect={false}
        />

        <ButtonIcon
          icon='add'
          type='PRIMARY'
        />
      </S.Form>

      <S.HeaderList>
        <FlatList
          data={['TIME A', 'TIME B']}
          keyExtractor={item => item}
          horizontal
          renderItem={({ item }) => (
            <Filter
              title={item}
              isActive={item === team}
              onPress={() => setTeam(item)}
            />
          )}
        />
        <S.NumberOfPlayers>
          {players.length}
        </S.NumberOfPlayers>
      </S.HeaderList>

      <FlatList
        data={players}
        keyExtractor={item => item}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }
        ]}
        renderItem={({ item }) => (
          <PlayerCard
            name={item}
            onRemove={() => console.log('On remove')}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas neste time" />
        )}
      />

      <Button
        title="Remover turma"
        type="SECONDARY"
      />
    </S.Container>
  );
}
