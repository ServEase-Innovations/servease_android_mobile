import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from "react-native";
import ProviderDetails from "./ProviderDetails";

interface DetailsViewProps {
  sendDataToParent: (data: string) => void; // Function to inform parent about navigation
  selected?: string;
  checkoutItem?: (data: any) => void;
  selectedProvider?: (data: any) => void;
  data?: string;
}

const DetailsView: React.FC<DetailsViewProps> = ({
  sendDataToParent,
  selected,
  checkoutItem,
  selectedProvider,
  data,
}) => {
  const [serviceProvidersData, setServiceProvidersData] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = selected
          ? await axios.get(`http://43.205.212.94:8080/api/serviceproviders/role?role=${selected.toUpperCase()}`)
          : await axios.get("http://43.205.212.94:8080/api/serviceproviders/serviceproviders/all");
        setServiceProvidersData(response?.data);
      } catch (err) {
        console.error("There was a problem with the fetch operation:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selected]);

  const handleBackClick = () => {
    sendDataToParent("LANDING_PAGE"); // Notify parent to navigate to LandingPage
  };

  const handleSearchClick = () => {
    setSidebarOpen(true);
  };

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  const renderProvider = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.providerCard}
      onPress={() => selectedProvider?.(item)}
    >
      <ProviderDetails {...item} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : (
        <>
          {/* Selected Service Display */}
          {data && (
            <View style={styles.selectedServiceContainer}>
              <Text style={styles.selectedServiceText}>Selected Service: {data}</Text>
            </View>
          )}

          {/* Sidebar */}
          {sidebarOpen && (
            <View style={styles.sidebar}>
              <TouchableOpacity style={styles.closeButton} onPress={handleCloseSidebar}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Main Content */}
          <View style={styles.mainContent}>
            <View style={styles.header}>
              <TouchableOpacity onPress={handleBackClick} style={styles.button}>
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleSearchClick} style={styles.button}>
                <Text style={styles.buttonText}>Search</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={searchResults.length > 0 ? searchResults : serviceProvidersData}
              renderItem={renderProvider}
              keyExtractor={(item) => item.serviceproviderId.toString()}
              contentContainerStyle={styles.providerList}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingIndicator: {
    marginTop: 20,
  },
  selectedServiceContainer: {
    padding: 10,
    backgroundColor: "#f0f8ff",
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  selectedServiceText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  sidebar: {
    position: "absolute",
    zIndex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  closeButton: {
    alignSelf: "flex-end",
    padding: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
  },
  mainContent: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  providerList: {
    marginTop: 10,
  },
  providerCard: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
});

export default DetailsView;
