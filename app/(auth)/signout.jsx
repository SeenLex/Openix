import { Text, Pressable } from "react-native";
import React from "react";
import { signOut } from "firebase/auth";
import { icons } from "../../constants";
import { Image } from "react-native";
import { auth } from "../../firebaseConfig";
import { router } from "expo-router";

const Signout = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("signed out");
        router.push("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Pressable onPress={handleSignOut} className="flex flex-row items-center">
      <Image
        source={icons.logout}
        className="w-6 h-6 ml-2"
        resizeMode="contain"
      />
      <Text className="text-white text-lg ml-2">Sign Out</Text>
    </Pressable>
  );
};

export default Signout;
