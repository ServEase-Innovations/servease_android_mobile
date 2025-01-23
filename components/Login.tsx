import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Button,
} from "react-native";
// import { useDispatch } from "react-redux";
// import axiosInstance from "../../services/axiosInstance";
// import { add } from "../../features/user/userSlice";
import ForgotPassword from "./ForgotPassword";
import axios from "axios";

const Login = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // const dispatch = useDispatch();
  const handleForgotPasswordClick = () => {
    setIsForgotPassword(true);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://43.205.212.94:8080/api/user/login", {
        username: email,
        password: password,
      });

      if (response.status === 200 && response.data) {
        const { message, role } = response.data;
        // dispatch(add(response.data));
        Alert.alert("Success", message || "Login successful!");
        // Navigate or handle role-specific actions here
      } else {
        throw new Error(
          response.data?.message || "Login failed. Please try again."
        );
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data?.message || "An error occurred during login."
      );
    }
  };

  // if (showForgotPassword) {
  //   return <ForgotPassword onBackToLogin={() => setShowForgotPassword(false)} />;
  // }

  return (
   
    <KeyboardAvoidingView style={styles.container} behavior="padding">
   <View style={styles.close}>
   <Button title="Close" onPress={onClose} />
   </View>
      <Text style={styles.title}>Log in</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#aaa"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />
      <TouchableOpacity onPress={ handleForgotPasswordClick }>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.signUpLink}>Sign Up As User</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.signUpLink}>Sign Up As Service Provider</Text>
        </TouchableOpacity>
      </View>
     
    </KeyboardAvoidingView>
    
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  close:{
    display:"flex",
    
    },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  forgotPassword: {
    color: "#4f8ad5",
    textDecorationLine: "underline",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4f8ad5",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  signUpContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  signUpText: {
    fontSize: 16,
    color: "#333",
  },
  signUpLink: {
    color: "#4f8ad5",
    textDecorationLine: "underline",
    marginTop: 5,
  },
});

export default Login;