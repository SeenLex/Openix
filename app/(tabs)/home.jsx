import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import { sendDataToFirebase } from '../../firebaseConfig';

const Home = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="justify-center items-center h-12 mb-32 mt-14 bg-black-100 py-2 mx-8">
        <Text className="text-3xl text-gray-200 font-pmedium">Home</Text>
      </View>
      <View className="relative justify-center items-center">
        <CustomButton
          title="Activate"
          handlePress={sendDataToFirebase}
          containterStyle="mt-7"
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
