import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { icons } from "../../constants";

const FormField = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-200 font-psemibold">{title}</Text>

      <View className="w-full h-16 px-2 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary flex flex-row items-center">
        {title === "Email" && (
          <Image
            source={icons.mail}
            className="w-6 h-6 ml-2"
            resizeMode="contain"
          />
        )}
        {title === "Password" && (
          <Image
            source={icons.key}
            className="w-6 h-6 ml-2"
            resizeMode="contain"
          />
        )}
        {title === "Username" && (
          <Image
            source={icons.profile}
            className="w-6 h-6 ml-2"
            resizeMode="contain"
          />
        )}

        <TextInput
          className="flex-1 text-white font-pregular text-base ml-2"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          {...props}
          
        />
        
        {title === "Password" && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image
              source={!showPassword ? icons.eye : icons.eyeHide}
              className="w-6 h-6"
              resizeMode="contain"
            />
            
          </TouchableOpacity>
        )}
        </View>
    </View>
  );
};

export default FormField;