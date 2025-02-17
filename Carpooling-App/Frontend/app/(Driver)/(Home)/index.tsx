import { StyleSheet, Image, Platform, View, Text } from 'react-native';

export default function HistoryScreen() {
  return (
    <View style={{flex : 1 , justifyContent : "center" , alignItems : 'center'}}>
      <Text>
        driver home Screen
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({ 
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
