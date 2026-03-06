import { db } from "@/db";
import { emi, TAddEmi, TSelectEmi } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createContext, useContext, useState } from "react";
import { Modal } from "react-native";
import AddEditEmi from "./add-edit-emi";

type TEmiContext = {
  isEditingEmi: boolean;
  handleEditEmi: () => void;
  fetchEmiById: (value: number) => void;
  currentEditEmi: TSelectEmi | undefined;
  saveEmi: (values: TAddEmi, type: "add" | "edit") => Promise<void>;
  deleteById: (value: number) => void;
};

const EmiContext = createContext<TEmiContext | undefined>(undefined);

export function EmiProvider({ children }: { children: React.ReactNode }) {
  const [isEditingEmi, setIsEditingEmi] = useState(false);
  const [emiDetails, setEmiDetails] = useState<TSelectEmi | undefined>(
    undefined,
  );

  const handleEditEmi = () => {
    // reset the emi details value on close
    if (isEditingEmi) {
      setEmiDetails(undefined);
    }
    setIsEditingEmi(!isEditingEmi);
  };

  const fetchEmiById = async (value: number) => {
    const [record] = await db
      .select()
      .from(emi)
      .where(eq(emi.id, value));

    if (!record) return;
    setEmiDetails(record);
    handleEditEmi();
  };

  const saveEmi = async (formValue: TAddEmi, type: "add" | "edit") => {
    let record;
    if (type === "add") {
      [record] = await db
        .insert(emi)
        .values(formValue)
        .returning({ id: emi.id });
    } else {
      const { id, ...restValues } = formValue;
      if (!id) return;
      record = await db
        .update(emi)
        .set({ ...restValues })
        .where(eq(emi.id, id));
    }

    if (!record) return;

    handleEditEmi();
  };

  const deleteById = async (value: number) => {
    if (!value) return;

    await db.delete(emi).where(eq(emi.id, value));
  };

  return (
    <EmiContext.Provider
      value={{
        isEditingEmi,
        handleEditEmi,
        fetchEmiById,
        currentEditEmi: emiDetails,
        saveEmi,
        deleteById,
      }}
    >
      {children}
      {isEditingEmi && (
        <Modal
          visible={isEditingEmi}
          animationType="slide"
          transparent={true}
          onRequestClose={handleEditEmi}
        >
          <AddEditEmi onClose={handleEditEmi} />
        </Modal>
      )}
    </EmiContext.Provider>
  );
}

export function useEmi() {
  const context = useContext(EmiContext);

  if (context === undefined) {
    throw Error("useEmi must be used within an EmiProvider");
  }

  return context;
}
