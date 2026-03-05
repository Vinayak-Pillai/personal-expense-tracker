import { Modal, Pressable, Text, View } from "react-native";
import { CirclePlus } from "../icons/footer-icons";
import { useState } from "react";
import AddEditEmi from "./add-edit-emi";
import { useEmi } from "./emi-context";

export default function EmiHeader() {
  // const [isAddEmiVisible, setIsAddEmiVisible] = useState(false);
  const { handleEditEmi } = useEmi();
  return (
    <View className="p-4 pt-2">
      <View className="flex flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-white">EMI Tracker</Text>
        <Pressable
          className="bg-indigo-600 p-2 rounded-full text-white"
          onPress={handleEditEmi}
        >
          <CirclePlus color="#fff" />
        </Pressable>
      </View>
      {/*<Modal
        visible={isAddEmiVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddEmiVisible(false)}
      >
        <AddEditEmi onClose={() => setIsAddEmiVisible(false)} />
      </Modal>*/}
    </View>
  );
}
