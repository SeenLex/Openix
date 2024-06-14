import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, Platform } from "react-native";
import { images } from "../../constants";
import FormField from "../components/formField";
import CustomButton from "../components/CustomButton";
import CustomButtonGoogle from "../components/CustomButton";
import { Link, router } from "expo-router";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../../firebaseConfig";
import Toast from "react-native-toast-message";
import { ToastConfig } from "../../toastDesign";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    if (form.email === "" || form.password === "") {
      Toast.show({
        type: "error",
        text1: "Please fill in all fields.",
        autoHide: true,
      });
      return;
    }
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then(() => {
        router.push("/home");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const handleLoginWithGoogle = () => {
    console.log("Google");
    const provider = new GoogleAuthProvider();
    if (Platform.OS === "web") {
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          console.log(token, user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log(errorCode, errorMessage, email, credential);
        });
    }
  };

  const [isSubmitting] = useState(false);

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className=" min-h-[85vh] px-4 my-12">
        <Image
          source={images.logo}
          className="w-[115px] h-[90px]"
          resizeMode="contain"
        />
        <Text className="text-3xl text-white font-psemibold text-semibold">
          Log In to {""}
          <Text className="text-3xl text-secondary-200 font-pblack text-center">
            Openix
          </Text>
        </Text>
        <FormField
          title="Email"
          placeholder={"Email"}
          value={form.email || form.username}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          otherStyles="mt-7"
          keyboardType="email-address"
        />

        <FormField
          title="Password"
          placeholder={"Password"}
          value={form.password}
          handleChangeText={(e) => setForm({ ...form, password: e })}
          otherStyles="mt-7"
        />
        <CustomButton
          title="Log In"
          handlePress={handleLogin}
          containerStyles="mt-7"
          isLoading={isSubmitting}
        />
        
        <View className="border-b border-gray-400 my-4" />

        <CustomButtonGoogle
          title="Log In With Google"
          handlePress={handleLoginWithGoogle}
          containerStyles="bg-secondary-300 rounded-3xl py-2 px-14  justify-center items-center mt-20 mt-0 mb-8"
          isLoading={isSubmitting}
        />

        <View className="flex justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">
            Don't have an account?
          </Text>
          <Link
            href="/register"
            className="text-lg font-psemibold text-secondary"
          >
            Register
          </Link>
        </View>
      </View>
      <Toast config={ToastConfig} />
    </SafeAreaView>
  );
};

export default Login;
