import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
  return {
    removeItem: (_key: string) => Promise.resolve(),
    getItem: (_key: string) => Promise.resolve(null),
    setItem: (_key: string, value: string) => Promise.resolve(value),
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;
