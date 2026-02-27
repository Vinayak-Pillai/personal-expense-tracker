import { useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { CirclePlus } from "../icons/footer-icons";
import AddEditAccounts from "./add-edit-accounts";

export default function AccountsHeader() {
  const [isAddAccountVisible, setIsAddAccountVisible] = useState(false);

  return (
    <View className="p-4 pt-2">
      <View className="flex flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-white">Accounts</Text>
        <Pressable
          className="bg-indigo-600 p-2 rounded-full text-white"
          onPress={() => setIsAddAccountVisible(true)}
        >
          <CirclePlus color="#fff" />
        </Pressable>
      </View>
      <Modal
        visible={isAddAccountVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddAccountVisible(false)}
      >
        <AddEditAccounts onClose={() => setIsAddAccountVisible(false)} />
      </Modal>
    </View>
  );
}
