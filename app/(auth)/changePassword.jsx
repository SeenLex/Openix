import { Text, Image, Pressable } from "react-native";
import { icons } from "../../constants";
import { auth } from "../../firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import React from "react";
import Toast from "react-native-toast-message";
import { ToastConfig } from "../../toastDesign";

const ChangePassword = () => {
  const email = auth.currentUser?.email;

  const handleResetPassword = () => {
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          Toast.show({
            type: "success",
            text1: "Password reset email sent!",
            text2: "An email has been sent to you!",
            autoHide: true,
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    } else {
      Toast.show({
        type: "error",
        text1: "No email found for the current user.",
        autoHide: true,
      });
    }
  };

  return (
    <>
    <Pressable
      onPress={handleResetPassword}
      className="flex flex-row items-center"
    >
      <Image source={icons.key} className="w-6 h-6 ml-2" resizeMode="contain" />
      <Text className="text-white text-lg px-4">Change Password</Text>
    </Pressable>
    <Toast config={ToastConfig} />
    </>
  );
};

export default ChangePassword;
