import {BaseToast, ErrorToast} from 'react-native-toast-message';
import tailwind from 'tailwind-rn';

const ToastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={tailwind('border-green-500 bg-green-200')}
      contentContainerStyle={tailwind('px-4')}
      text1Style={tailwind('text-white text-base')}
      text2Style={tailwind('text-white text-base')}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={tailwind('border-l-4 border-red-500 bg-red-200')}
      contentContainerStyle={tailwind('px-4')}
      text1Style={tailwind('text-white text-base')}
      text2Style={tailwind('text-white text-base')}
    />
  ),
  info: (props) => (
    <BaseToast
      {...props}
      style={tailwind('border-blue-500 bg-blue-200')}
      contentContainerStyle={tailwind('px-4')}
      text1Style={tailwind('text-white text-base')}
      text2Style={tailwind('text-white text-base')}
    />
  )
};

export default ToastConfig;