import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  apiKey: string;
  semipublicKey: string;
  privateKey: string;
  setApiKey: (apiKey: string) => void;
  setSemipublicKey: (semipublicKey: string) => void;
  setPrivateKey: (privateKey: string) => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      apiKey: "",
      semipublicKey: "",
      privateKey: "",
      setApiKey: (apiKey: string) => set({ apiKey }),
      setSemipublicKey: (semipublicKey: string) => set({ semipublicKey }),
      setPrivateKey: (privateKey: string) => set({ privateKey }),
    }),
    {
      name: "auth-storage",
    }
  )
);
