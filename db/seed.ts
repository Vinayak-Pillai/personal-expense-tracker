import { db } from ".";
import { categories } from "./schema";

const CATEGORIES = [
  { id: 1, name: "Food" },
  { id: 2, name: "Transport" },
  { id: 3, name: "Entertainment" },
  { id: 4, name: "Shopping" },
  { id: 5, name: "Health" },
  { id: 6, name: "Education" },
  { id: 7, name: "Other" },
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
