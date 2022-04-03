import create, { GetState, SetState } from "zustand";
import { persist, StoreApiWithPersist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "./schema.types";

export interface UserState {
	token: string;
	user: User;
	onLoginSuccess: ({ token: string, user: User }) => void;
	setToken: (token: string) => void;
	setUser: (user: User) => void;
	removeToken: () => void;
}

export const useUser = create<UserState, SetState<UserState>, GetState<UserState>, StoreApiWithPersist<UserState>>(
	persist(
		(set) => ({
			token: "",
			user: {} as User,
			onLoginSuccess: (data) => set(data),
			setToken: (token: string) => set({ token }),
			setUser: (user: User) => set({ user }),
			removeToken: () => set({ token: "", user: {} as User }),
		}),
		{
			name: "user",
			getStorage: () => AsyncStorage,
		},
	),
);
