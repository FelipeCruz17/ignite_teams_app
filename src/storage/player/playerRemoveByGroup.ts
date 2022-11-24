import AsyncStorage from '@react-native-async-storage/async-storage';
import { PLAYER_COLLECTION } from '@storage/storageConfig';
import { playerGetByGroup } from './playersGetByGroup';

export async function playerRemoveByGroup(playerName: string, group: string) {
  try {
    const storage = await playerGetByGroup(group);
    const filteredPlayer = storage.filter(player => player.name !== playerName);

    const players = JSON.stringify(filteredPlayer);

    await AsyncStorage.setItem(`${PLAYER_COLLECTION}-${group}`, players);

  } catch (error) {
    throw error;
  }
}
