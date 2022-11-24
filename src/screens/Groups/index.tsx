import { useState, useCallback } from 'react';
import { FlatList, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { Header } from '@components/Header';
import { HighLight } from '@components/HighLight';
import { GroupCard } from '@components/GroupCard';
import { ListEmpty } from '@components/ListEmpty';
import { Button } from '@components/Button';

import { groupsGetAll } from '@storage/group/groupsGetAll';
import * as S from './styles';
import { Loading } from '@components/Loading';

export function Groups() {
  const [isLoading, setIsLoading] = useState(true);
  const [groups, setGroups] = useState<string[]>([]);

  const navigation = useNavigation();

  function handleNewGroup() {
    navigation.navigate('new');
  }

  async function fetchGroups() {
    try {
      setIsLoading(true);

      const data = await groupsGetAll();
      setGroups(data);

    } catch (error) {
      console.log(error);
      Alert.alert('Turmas', 'Não foi possível carregar as turmas');
    } finally {
      setIsLoading(false);
    }
  }

  function handleOpenGroup(group: string) {
    navigation.navigate('players', { group });
  }

  useFocusEffect(useCallback(() => {
    fetchGroups();
  }, []));


  return (
    <S.Container>
      <Header showBackButton={false} />
      <HighLight title="Turmas" subTitle="Jogue com a sua turma" />

      {
        isLoading
          ? <Loading />
          : <FlatList
            data={groups}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <GroupCard
                title={item}
                onPress={() => handleOpenGroup(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={groups.length === 0 && { flex: 1 }}
            ListEmptyComponent={() => (
              <ListEmpty message="Que tal cadastrar a primeira turma?" />
            )}
          />
      }


      <Button
        title="Criar nova turma"
        onPress={handleNewGroup}
      />
    </S.Container>
  );
}
