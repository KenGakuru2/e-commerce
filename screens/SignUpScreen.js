import { useState } from 'react';
import { View, Text, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { supabase } from '../supabase';
import { createUserProfile } from '../createUserProfile';

 const SignUpScreen = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [confirmPassword, setConfirmPassword] = useState('');
        const [fullName, setFullName] = useState('');
        const [phone, setPhone] = useState('');

        const navigation = useNavigation();

        const handleSignUp = async () => {
            if (password !== confirmPassword) {
              Alert.alert('Error', 'Passwords do not match');
              return;
            }
          
            const { data, error } = await supabase.auth.signUp({
              email,
              password,
            });
          
            if (error) {
              Alert.alert('Sign Up Failed', error.message);
              return;
            }
          
            const user = data?.user;
          
            if (!user) {
              Alert.alert('Sign Up Failed', 'No user returned from Supabase');
              return;
            }
          
            try {
              await createUserProfile(user.id, fullName, phone);
              navigation.navigate('VerifyEmail');
            } catch (err) {
              console.log('Error creating profile:', err);
              Alert.alert('Profile Error', 'Something went wrong creating your profile.');
            }
          };
          

        return (
            <View className="flex-1 justify-center p-5 bg-white">
                <Text className="text-2xl font-bold mb-5 text-center text-[#75F94C]">Sign Up</Text>
                <TextInput
                    className="h-10 border border-gray-300 mb-4 px-3 rounded-[20px]"
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    className="h-10 border border-gray-300 mb-4 px-3 rounded-[20px]"
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                <TextInput
                    className="h-10 border border-gray-300 mb-4 px-3 rounded-[20px]"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                <TextInput
                    className="h-10 border border-gray-300 mb-4 px-3 rounded-[20px]"
                    placeholder="Full Name"
                    value={fullName}
                    onChangeText={setFullName}

                />
                <TextInput
                    className="h-10 border border-gray-300 mb-4 px-3 rounded-[20px]"
                    placeholder="phone"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType='phone-pad'
                />
                <TouchableOpacity className="bg-[#75F94C] h-[50px] width-[50px] rounded-[20px] items-center justify-center " onPress={handleSignUp}>
                    <Text className="text-white items-center text-[20px]">SignUp</Text>
                </TouchableOpacity>
            </View>
        );
    };

   


export default SignUpScreen;