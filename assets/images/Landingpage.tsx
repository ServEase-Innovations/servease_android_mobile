// import React from "react";
// import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

// export const LandingPage = () =>{

//   return (
//     <View style={styles.landingContainer}>
//       <View style={styles.selectorContainer}>
//         <TouchableOpacity style={styles.selectors}>
//           <Image source={require("../assets/images/cookin_food.png")} style={styles.image} />
//         </TouchableOpacity>
//         <Text style={styles.labelText}>Cook</Text>
//       </View>
      
//       <View style={styles.selectorContainer}>
//         <TouchableOpacity style={styles.selectors}>
//           <Image source={require("../assets/images/broom.png")} style={styles.image} />
//         </TouchableOpacity>
//         <Text style={styles.labelText}>Maid</Text>
//       </View>
      
//       <View style={styles.selectorContainer}>
//         <TouchableOpacity  style={styles.selectors}>
//           <Image source={require("../assets/images/maid_old.png")} style={styles.image} />
//         </TouchableOpacity>
//         <Text style={styles.labelText}>Nanny</Text>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   landingContainer: {
//     flexDirection: 'column',
//     justifyContent: 'space-evenly',
//     alignItems: 'center',
//     // flexWrap: 'wrap',
//     // height:'100%',
//     gap: 20, 
//     // Add space between icons
//     paddingBottom: 15,
//     paddingTop: 15,
//     backgroundColor: 'rgba(249, 252, 255, 0.59)',
//   },
//   selectorContainer: {
//     alignItems: 'center',
//     fontFamily: 'icons',
//      // Apply font family here if supported
//   },
//   selectors: {
//     // margin: 10,
//     borderWidth: 1,
//     borderColor: '#0d6efd',
//     width: 80, 
//     // Using percentage width might be tricky in React Native, so adjust as needed
//     height: 80,
//     borderRadius: 50,
//     justifyContent: 'center',
//     alignItems: 'center',
//     fontFamily: 'Nunito', // Apply custom font here if imported
//     position: 'relative',
//     overflow: 'hidden',
//     backgroundColor: '#f0f0f0',
//     // transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//   },
//   image: {
//     width: '100%',  // Adjust size as needed
//     height: '100%',
//     resizeMode: "contain",
//   },
//   labelText: {
//     marginTop: 3,
//     fontSize: 15,
//     color: "#333",  // Replace with your desired text color
//   },
// });
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
// import { Calendar } from "react-native-calendars";
// import dayjs from "dayjs";
// import { useDispatch } from "react-redux";
// import { add } from "../../features/bookingType/bookingTypeSlice";
// import { ServiceProviderContext } from "../../context/ServiceProviderContext";

interface ChildComponentProps {
  sendDataToParent: (data: string) => void;
  bookingType: (data: string) => void;
}

export const Landingpage: React.FC<ChildComponentProps> = ({
  sendDataToParent,
  bookingType,
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const booking = {
      startDate,
      endDate,
      bookingPreference: selectedRadioButtonValue,
    };

    if (selectedRadioButtonValue === "Date") {
      bookingType(selectedType);
      sendDataToParent("CONFIRMATION");
    } else {
      sendDataToParent("DETAILS");
    }

    // dispatch(add(booking));
    // setOpen(false);
  };

  // const getMaxEndDate = () => {
  //   if (!startDate) return null;
    
  //   // const start = dayjs(startDate);
  //   return selectedRadioButtonValue === "Monthly"
  //     ? start.add(31, "day").format("YYYY-MM-DD")
  //     : start.add(15, "day").format("YYYY-MM-DD");
  // };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.selectorContainer}>
        <TouchableOpacity onPress={() => handleClick("COOK")}>
          <Image source={require("../../assets/public/new2.png")} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.labelText}>Cook</Text>
      </View>

      <View style={styles.selectorContainer}>
        <TouchableOpacity onPress={() => handleClick("MAID")}>
          <Image source={require("../../assets/public/new1.png")} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.labelText}>Maid</Text>
      </View>

      <View style={styles.selectorContainer}>
        <TouchableOpacity onPress={() => handleClick("NANNY")}>
          <Image source={require("../../assets/public/new3.png")} style={styles.image} />
        </TouchableOpacity>
        <Text style={styles.labelText}>Nanny</Text>
      </View>

      <Portal>
        <Modal
          visible={open}
          onDismiss={handleClose}
          contentContainerStyle={styles.modal}
        >
          <Text style={styles.modalTitle}>Select your Booking</Text>
          <RadioButton.Group
            onValueChange={(value) => setSelectedRadioButtonValue(value)}
            value={selectedRadioButtonValue}
          >
            <RadioButton.Item label="Date" value="Date" />
            <RadioButton.Item label="Short term" value="Short term" />
            <RadioButton.Item label="Monthly" value="Monthly" />
          </RadioButton.Group>

          {/* {selectedRadioButtonValue === "Date" && (
            <Calendar
              onDayPress={(day) => setStartDate(day.dateString)}
              markedDates={{
                [startDate || ""]: { selected: true, marked: true },
              }}
            />
          )}

          {selectedRadioButtonValue === "Short term" && (
            <>
              <Text style={styles.dateLabel}>Start Date</Text>
              <Calendar
                onDayPress={(day) => setStartDate(day.dateString)}
                markedDates={{
                  [startDate || ""]: { selected: true, marked: true },
                }}
              />
              <Text style={styles.dateLabel}>End Date</Text>
              <Calendar
                onDayPress={(day) => setEndDate(day.dateString)}
                minDate={startDate || undefined}
                maxDate={getMaxEndDate()}
                markedDates={{
                  [endDate || ""]: { selected: true, marked: true },
                }}
              />
            </>
          )}

          {selectedRadioButtonValue === "Monthly" && (
            <Calendar
              onDayPress={(day) => setStartDate(day.dateString)}
              markedDates={{
                [startDate || ""]: { selected: true, marked: true },
              }}
            />
          )} */}

          <Button
            mode="contained"
            onPress={handleSave}
            disabled={!startDate || (selectedRadioButtonValue === "Short term" && !endDate)}
          >
            Confirm
          </Button>
        </Modal>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  selectorContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
  },
  labelText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "600",
  },
  modal: {
    padding: 20,
    backgroundColor: "white",
    margin: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

export default Landingpage;
