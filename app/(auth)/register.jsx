import { Text, View, Dimensions, Image } from "react-native";
import React from "react";
import { useState } from "react";
import { Link, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../components/formField";
import CustomButton from "../components/CustomButton";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Toast from "react-native-toast-message";
import { ToastConfig } from "../../toastDesign";

console.disableYellowBox = true;

const Register = () => {
  const [isSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Toast.show({
        type: "error",
        text1: "Please fill in all fields.",
        autoHide: true,
      });
      return;
    }

    if (form.username.length < 3) {
      Toast.show({
        type: "error",
        text1: "Username must be at least 3 characters long.",
        autoHide: true,
      });
      return;
    }

    if (form.username.search(/[^a-zA-Z0-9]/) !== -1) {
      Toast.show({
        type: "error",
        text1: "Username must contain only letters and numbers.",
        autoHide: true,
      });
      return;
    }

    if (!form.email.includes("@") || !form.email.includes(".")) {
      Toast.show({
        type: "error",
        text1: "Invalid email address.",
        text2: "The email address must contain '@' and '.'",
        autoHide: true,
      });
      return;
    }

    if (
      form.password.length < 6 ||
      !/[A-Z]/.test(form.password) ||
      !/\d/.test(form.password) ||
      !/\W/.test(form.password)
    ) {
      Toast.show({
        type: "error",
        text1: "Password must contain:\n",
        text2: "\tAt least 6 characters, 1 uppercase leeter, 1 digit, 1 symbol.",
        autoHide: true,
      });
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: form.username,
      });
      router.push("/home");
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View
        className="w-full flex justify-center h-full px-4 my-2"
        style={{
          minHeight: Dimensions.get("window").height - 100,
        }}
      >
        <Image
          source={images.logo}
          className="w-[115px] h-[90px]"
          resizeMode="contain"
        />

        <Text className="text-3xl text-white font-psemibold text-semibold">
          Register to {""}
          <Text className="text-3xl text-secondary-200 font-pblack text-center ">
            Openix
          </Text>
        </Text>

        <FormField
          title="Username"
          placeholder={"Username"}
          value={form.username}
          handleChangeText={(e) => setForm({ ...form, username: e })}
          otherStyles="mt-10"
        />

        <FormField
          title="Email"
          placeholder={"Email"}
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles="mt-4"
          keyboardType="email-address"
        />

        <FormField
          title="Password"
          placeholder={"Password"}
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          otherStyles="mt-4"
        />

        <CustomButton
          title="Register"
          handlePress={handleRegister}
          containerStyles="mt-7"
          isLoading={isSubmitting}
        />

        <View className="flex justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">
            Have an account already?
          </Text>
          <Link href="/login" className="text-lg font-psemibold text-secondary">
            Log In
          </Link>
        </View>
      </View>
      <Toast config={ToastConfig} />
    </SafeAreaView>
  );
};

export default Register;
