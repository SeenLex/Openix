import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../constants";
import CustomButton from "./components/CustomButton";
import "./styles.css";

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="w-full justify-items-end items-center min-h-[100vh]">
        <View className="relative justify-center items-center mt-32">
          <Text className="text-3xl text-white font-bold text-center">
            Welcome to {""}
            <Image
              source={images.openix}
              className="w-[130px] h-[150px] justify-center "
              resizeMode="contain"
              width={130}
              height={150}
              style={{ width: 130, height: 150 }}
            />
          </Text>
          <View></View>
          <CustomButton
            title="Go to Login!"
            handlePress={() => router.push("/home")}
          />
        </View>
      </View>
      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
}