import create, { GetState, SetState } from "zustand";
import { persist, StoreApiWithPersist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Product, User } from "./schema.types";

export type CartProduct = Pick<Product, "id" | "image" | "title" | "price">;
export type CartItem = { quantity: number; product: Omit<CartProduct, "id"> };
export type CartItems = Record<string, CartItem>;
export type QuantityAction = "+" | "-";
export interface UserState {
	token: string;
	user: User;
	cart: CartItems;
	onLoginSuccess: ({ token: string, user: User }) => void;
	setToken: (token: string) => void;
	setUser: (user: User) => void;
	removeToken: () => void;
}

export interface CartState {
	items: CartItems;
	total: number;
	visible: boolean;
	addItem: (item: CartProduct) => void;
	removeItem: (id: string) => void;
	updateQuantity: (id: string, type: QuantityAction) => void;
	toggleCart: (value: boolean) => void;
	resetCart: () => void;
}

const calculateTotal = (cart: CartItems) => {
	let total = 0;
	for (let id in cart) {
		total += cart[id].quantity * cart[id].product.price;
	}
	return total;
};

export const useUser = create<UserState, SetState<UserState>, GetState<UserState>, StoreApiWithPersist<UserState>>(
	persist(
		(set) => ({
			token: "",
			user: {} as User,
			cart: {} as CartItems,
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

export const useCart = create<CartState, SetState<CartState>, GetState<CartState>, StoreApiWithPersist<CartState>>(
	persist(
		(set, get) => ({
			visible: false as boolean,
			items: {} as CartItems,
			total: 0,
			addItem: ({ id, ...product }) => {
				const items = { ...get().items };
				if (items[id]) {
					const item = { ...items[id] };
					item.quantity += 1;
				} else {
					items[id] = {
						quantity: 1,
						product: {
							...product,
						},
					};
				}

				set({ items, total: calculateTotal(items) });
			},
			removeItem: (id) => {
				const items = { ...get().items };
				delete items[id];
				set({ items, total: calculateTotal(items) });
			},
			updateQuantity: (id, type) => {
				const items = { ...get().items };
				const item = { ...items[id] };

				if (type === "+") {
					item.quantity++;
					items[id] = item;
				} else {
					if (item.quantity === 1) {
						delete items[id];
					} else {
						item.quantity--;
						items[id] = item;
					}
				}

				set({ items, total: calculateTotal(items) });
			},
			toggleCart: (value: boolean) => {
				set({ visible: value });
			},
			resetCart: () => set({ items: {} }),
		}),
		{
			name: "cart",
			getStorage: () => AsyncStorage,
		},
	),
);
