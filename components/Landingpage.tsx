import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Modal, Portal, RadioButton, Button } from "react-native-paper";
import { Calendar } from "react-native-calendars";
import dayjs from "dayjs";

interface ChildComponentProps {
  sendDataToParent: (data: string) => void;
  bookingType: (data: string) => void;
}
interface LandingPageProps {
  sendDataToDetails: (data: string) => void; // Function to navigate to DetailsView
}

export const Landingpage: React.FC<LandingPageProps> = ({
  // sendDataToParent,
  // bookingType,
  sendDataToDetails
}) => {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [selectedRadioButtonValue, setSelectedRadioButtonValue] =
    useState<string>("");
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  // const { setSelectedBookingType } = useContext(ServiceProviderContext);

  // const dispatch = useDispatch();

  const handleClick = (type: string) => {
    setOpen(true);
    setSelectedType(type);
    // setSelectedBookingType(type);
  };
  const handleSelection = (type: string) => {
    sendDataToDetails(type); // Pass selected type to parent
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleSave = () => {
  //   const booking = {
  //     startDate,
  //     endDate,
  //     bookingPreference: selectedRadioButtonValue,
  //   };

  //   if (selectedRadioButtonValue === "Date") {
  //     bookingType(selectedType);
  //     sendDataToParent("CONFIRMATION");
  //   } else {
  //     sendDataToParent("DETAILS");
  //   }

  //   // dispatch(add(booking));
  //   // setOpen(false);
  // };

  const getMaxEndDate = () => {
    if (!startDate) return null;
  };
  

  return (
    <>
{/*     
      <View style={styles.container}>
        <View style={styles.selectorContainer}>
          <TouchableOpacity
            style={styles.selectors}
            onPress={() => sendDataToParent("COOK")}
          >
            <Image
              source={require("../assets/images/cookin_food.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.labelText}>Cook</Text>

          <TouchableOpacity
            style={styles.selectors}
            onPress={() => sendDataToParent("MAID")}
          >
            <Image
              source={require("../assets/images/broom.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.labelText}>Maid</Text>

          <TouchableOpacity
            style={styles.selectors}
            onPress={() => sendDataToParent("NANNY")}
          >
            <Image
              source={require("../assets/images/maid_old.png")}
              style={styles.image}
            />
          </TouchableOpacity>
          <Text style={styles.labelText}>Nanny</Text>
        </View>
      </View> */}
       <View style={styles.container}>
      <View style={styles.selectorContainer}>
        <TouchableOpacity
          style={styles.selectors}
          onPress={() => handleSelection("Cook")}
        >
          <Image
            source={require("../assets/images/cookin_food.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.labelText}>Cook</Text>
      </View>

      <View style={styles.selectorContainer}>
        <TouchableOpacity
          style={styles.selectors}
          onPress={() => handleSelection("Maid")}
        >
          <Image
            source={require("../assets/images/broom.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.labelText}>Maid</Text>
      </View>

      <View style={styles.selectorContainer}>
        <TouchableOpacity
          style={styles.selectors}
          onPress={() => handleSelection("Nanny")}
        >
          <Image
            source={require("../assets/images/maid_old.png")}
            style={styles.image}
          />
        </TouchableOpacity>
        <Text style={styles.labelText}>Nanny</Text>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: "center",
  },
  selectorContainer: {
    alignItems: "center",
    fontFamily: "icons",
    margin: 20,
  },

  selectors: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#0a5398",
    width: 80,
    // Using percentage width might be tricky in React Native, so adjust as needed
    height: 80,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "icons",
    // Apply custom font here if imported
    position: "relative",
    overflow: "hidden",
    // backgroundColor: '#f0f0f0',
    // transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  },
  image: {
    width: "100%", // Adjust size as needed
    height: "100%",
    resizeMode: "contain",
  },
  labelText: {
    marginTop: 3,
    fontSize: 20,
    color: "#0a5398",
  },
});
export default Landingpage;
