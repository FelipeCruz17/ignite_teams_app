import { useState, useEffect, useRef } from 'react';
import { Alert, TextInput } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { PlayerStorageDTO } from '@storage/player/PlayerStorageDTO';


import { playerAddByGroup } from '@storage/player/playerAddByGroup';
import { playersGetByGroupAndTeam } from '@storage/player/playersGetByGroupAndTeam';
import { playerRemoveByGroup } from '@storage/player/playerRemoveByGroup';
import { groupRemoveByName } from '@storage/group/groupRemoveByName';

import { AppError } from '@utils/AppError';

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
  const [newPlayerName, setNewPlayerName] = useState('');
  const [team, setTeam] = useState('TIME A');
  const [players, setPlayers] = useState<PlayerStorageDTO[]>([]);

  const navigation = useNavigation();
  const route = useRoute();
  const { group } = route.params as RouteParams;

  const newPlayerNameInputRef = useRef<TextInput>(null);

  async function handleAddPlayer() {
    if (newPlayerName.trim().length === 0) {
      return Alert.alert('Nova pessoa', 'Informe o nome da pessoa para adicionar');
    }

    const newPlayer = {
      name: newPlayerName,
      team
    };

    try {
      await playerAddByGroup(newPlayer, group);

      newPlayerNameInputRef.current?.blur();
      setNewPlayerName('');
      fetchPlayersByTeam();

    } catch (error) {
      if (error instanceof AppError) {
        Alert.alert('Nova pessoa', error.message);
      } else {
        console.log(error);
        Alert.alert('Nova pessoa', 'Não foi possível adicionar');
      }
    }
  }

  async function fetchPlayersByTeam() {
    try {
      const playersByTeam = await playersGetByGroupAndTeam(group, team);
      setPlayers(playersByTeam);

    } catch (error) {
      console.log(error);
      Alert.alert('Pessoas', 'Não foi possível carregar as pessoas');
    }
  }

  async function handleRemovePlayer(playerName: string) {
    try {
      await playerRemoveByGroup(playerName, group);
      fetchPlayersByTeam();

    } catch (error) {
      console.log(error);
      Alert.alert('Remover', 'Não foi possível remover esta pessoa');
    }
  }

  async function groupRemove() {
    try {
      await groupRemoveByName(group);
      navigation.navigate('groups');

    } catch (error) {
      console.log(error);
      Alert.alert('Remover', 'Não foi possível remover o grupo');

    }
  }

  async function handleGroupRemove() {
    Alert.alert(
      'Remove',
      'Deseja remover o grupo?',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => groupRemove() }
      ]
    );
  }

  useEffect(() => {
    fetchPlayersByTeam();
  }, [team]);


  return (
    <S.Container>
      <Header showBackButton />

      <HighLight
        title={group}
        subTitle='Adicione a galera e separa os times'
      />

      <S.Form>
        <Input
          inputRef={newPlayerNameInputRef}
          onChangeText={(text) => setNewPlayerName(text)}
          value={newPlayerName}
          placeholder='Nome da pessoa'
          autoCorrect={false}
          onSubmitEditing={handleAddPlayer}
          returnKeyType='done'
        />

        <ButtonIcon
          icon='add'
          type='PRIMARY'
          onPress={handleAddPlayer}
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
        keyExtractor={item => item.name}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 100 },
          players.length === 0 && { flex: 1 }
        ]}
        renderItem={({ item }) => (
          <PlayerCard
            name={item.name}
            onRemove={() => handleRemovePlayer(item.name)}
          />
        )}
        ListEmptyComponent={() => (
          <ListEmpty message="Não há pessoas neste time" />
        )}
      />

      <Button
        title="Remover turma"
        type="SECONDARY"
        onPress={handleGroupRemove}
      />
    </S.Container>
  );
}
