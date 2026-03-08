import { Modal } from "react-native";
import AddEditEmi from "./add-edit-emi";
import { useEmi } from "./emi-context";

export default function EmiModal() {
    const { isEditingEmi, handleEditEmi } = useEmi();

    return (
        <Modal
            visible={isEditingEmi}
            animationType="slide"
            transparent={true}
            onRequestClose={handleEditEmi}
        >
            {isEditingEmi && <AddEditEmi onClose={handleEditEmi} />}
        </Modal>
    );
}
