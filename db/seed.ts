import { db } from ".";
import { categories } from "./schema";

const CATEGORIES = [
  { id: 1, name: "Income", isActive: true },
  { id: 2, name: "Food" },
  { id: 3, name: "Transport" },
  { id: 4, name: "Entertainment" },
  { id: 5, name: "Shopping" },
  { id: 6, name: "Health" },
  { id: 7, name: "Education" },
  { id: 8, name: "Other" },
];

export const insertCategories = async () => {
  try {
    const categoryExists = await db
      .select({ id: categories.id })
      .from(categories);

    if (categoryExists.length > 0) {
      console.log("Categories already exist");
      return;
    }

    await db.insert(categories).values(CATEGORIES);
  } catch (error) {
    console.log(error);
  }
};
