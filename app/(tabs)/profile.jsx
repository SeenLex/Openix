import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Signout from "../(auth)/signout";
import { auth } from "../../firebaseConfig";
import ChangePassword from "../(auth)/changePassword";

const Profile = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="flex-1">
        <View className="flex-row justify-start ml-6 items-center p-4 mt-10">
          <Text className="text-white text-lg">
            Hello, {"   "}
            <Text className="text-xl text-secondary-200 font-psemibold text-center">
              {auth.currentUser.displayName}
            </Text>
          </Text>
        </View>

        <View className="justify-center items-center h-12 px-2 bg-black-100 rounded-xl border-2 border-black-200 mx-16 mb-6">
          <ChangePassword onPress={ChangePassword}></ChangePassword>
        </View>

        <View className="justify-center items-center  h-14 px-2 bg-black-100 rounded-xl border-2 border-black-200 mx-16">
          <Signout onPress={Signout}></Signout>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
