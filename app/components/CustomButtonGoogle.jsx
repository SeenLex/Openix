import { TouchableOpacity, Text, Image } from "react-native";
import React from "react";
import { icons } from "../../constants";

const CustomButtonGoogle = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary-300 rounded-3xl py-2 px-14  justify-center items-center mt-20 ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
      disabled={isLoading}
    >
      <Image
            source={icons.google}
            className="w-24 h-24 mr-10"
            resizeMode="contain"
          />
      <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButtonGoogle;