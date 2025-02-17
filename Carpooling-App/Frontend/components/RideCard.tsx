import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Linking,
  Platform,
} from "react-native";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";

interface RideCardProps {
  driverName: string;
  driverImage: string;
  vehicleNumber: string;
  categoryType: string;
  gender: string;
  startLocation: string;
  endLocation: string;
  seatsAvailable: number;
  fare: number;
  price: number;
  time: string;
  onRideSelect: () => void;
}

const RideCard: React.FC<RideCardProps> = ({
  driverName,
  driverImage,
  vehicleNumber,
  categoryType,
  gender,
  startLocation,
  endLocation,
  fare,
  time,
  seatsAvailable,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleWhatsappMsg = () => {
    const driverNumber = "+92 332 0145410"; 
    const message = `Assalam o Alikum ${driverName}, 
I want to book your ride. 
🚗 Vehicle: ${categoryType} (${vehicleNumber})
📍 Route: ${startLocation} → ${endLocation}
⏰ Time: ${time}
💰 Charges: Rs ${fare}
Is the seat available?`;

    const urlEncodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://wa.me/${driverNumber}?text=${urlEncodedMessage}`;

    Linking.openURL(whatsappLink).catch((err) =>
      console.error("Failed to open WhatsApp", err)
    );
  };

  const handleCall = (phoneNumber: string) => {
    const telLink = `tel:${phoneNumber}`;
  
    if (Platform.OS === "web") {
      window.location.href = telLink; 
    } else {
      Linking.openURL(telLink).catch((err) => console.error("Failed to open dialer", err));
    }
  }

  const handleSMS = (phoneNumber: string, message: string) => {
    const smsLink = `sms:${phoneNumber}?body=${encodeURIComponent(message)}`;
  
    if (Platform.OS === "web") {
      window.location.href = smsLink; 
    } else {
      Linking.openURL(smsLink).catch((err) => console.error("Failed to open SMS", err));
    }
  };
  

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.row}>
          <Image source={{ uri: driverImage }} style={styles.profileImage} />
          <View style={styles.info}>
            <Text style={styles.name}>{driverName}</Text>
            <Text style={styles.details}>
              {categoryType} - {vehicleNumber}
            </Text>
            <Text style={styles.details}>
              Rs {fare} - {seatsAvailable} Seats
            </Text>
          </View>
          <Text style={styles.tapForDetails}>Contact me ▼</Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
            <Image source={{ uri: driverImage }} style={styles.modalImage} />
            <Text style={styles.modalName}>{driverName}</Text>
            <Text style={styles.modalText}>Vehicle No: {vehicleNumber}</Text>
            <Text style={styles.modalText}>Category: {categoryType}</Text>
            <Text style={styles.modalText}>Gender: {gender}</Text>
            <Text style={styles.modalText}>Time: {time}</Text>
            <Text style={styles.modalText}>Seats Available: {seatsAvailable}</Text>
            <Text style={styles.modalText}>Route: {startLocation} → {endLocation}</Text>
            <Text style={styles.modalText}>Charges: Rs {fare}</Text>

            <View style={styles.chipContainer}>
              <TouchableOpacity style={styles.chip} onPress={() => handleSMS("03320145410", "Hello, I want to book your ride.")}>
                <FontAwesome5 name="sms" size={16} color="black" />
                <Text style={styles.chipText}> Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chip} onPress={() => handleCall("03320145410")}>
                <FontAwesome name="phone" size={16} color="black" />
                <Text style={styles.chipText}> Call</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.chip} onPress={handleWhatsappMsg}>
                <FontAwesome name="whatsapp" size={16} color="black" />
                <Text style={styles.chipText}> WhatsApp</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    fontSize: 12,
    color: "#555",
  },
  tapForDetails: {
    fontSize: 12,
    color: "#00796b",
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 320,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    position: "relative",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  modalImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  modalName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  modalText: {
    fontSize: 14,
    color: "#333",
    marginVertical: 2,
  },
  chipContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingVertical: 7,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  chipText: {
    color: "black",
    fontSize: 14,
    marginLeft: 5,
  },
});

export default RideCard;