import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import Login from "./Login"; // Import the Login component

export const Header = () => {
  const [location, setLocation] = useState("");
  const [anchorEl, setAnchorEl] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false); // State for Login Modal
  const [inputValue, setInputValue] = useState("");

  const handleMenuToggle = () => {
    setAnchorEl(!anchorEl);
  };

  const handleLocationSave = () => {
    setLocation(inputValue);
    setModalVisible(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => setAnchorEl(false)}>
      <View style={styles.headerContainer}>
        {/* Logo Section */}
        <View style={styles.logoContainer}>
          <TouchableOpacity onPress={() => console.log("Home pressed")}>
            <Image
              source={require("../assets/images/pic2.png")}
              style={styles.logoStyle}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.serveaseText}>ServEaso</Text>
          </View>
        </View>

        {/* Location Section */}
        <View style={styles.inputContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <View style={styles.locationInput}>
              <MaterialIcons name="location-on" size={24} color="blue" />
              <Text>{location || "Set Location"}</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Menu Section */}
        <TouchableOpacity style={styles.menuIcon} onPress={handleMenuToggle}>
          <AntDesign name="profile" size={24} color="black" />
        </TouchableOpacity>

        {anchorEl && (
          <View style={styles.menuDropdown}>
            <TouchableOpacity onPress={() => setLoginModalVisible(true)}>
              <Text style={styles.menuItem}>Login / Register</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Contact Us pressed")}>
              <Text style={styles.menuItem}>Contact Us</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.log("Privacy Policy pressed")}
            >
              <Text style={styles.menuItem}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Location Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Set Location</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter your location"
                value={inputValue}
                onChangeText={(text) => setInputValue(text)}
              />
              <View style={styles.modalButtons}>
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                <Button title="Save" onPress={handleLocationSave} />
              </View>
            </View>
          </View>
        </Modal>

        {/* Login Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={loginModalVisible}
          onRequestClose={() => setLoginModalVisible(false)}
        >
          <Login onClose={() => setLoginModalVisible(false)} />
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "rgb(200, 228, 255)",
  },
  logoContainer: {
    flex: 1,
  },
  logoStyle: {
    width: 50,
    height: 50,
  },
  inputContainer: {
    flex: 2,
  },
  locationInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
  },
  menuIcon: {
    flex: 1,
    alignItems: "flex-end",
  },
  menuDropdown: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  serveaseText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#075aa8",
  },
  textInput: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
});
