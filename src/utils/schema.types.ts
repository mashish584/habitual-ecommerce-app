import { Address } from "./types";

export type Category = {
	id: string;
	name: string;
	parentId: string;
	parentCategory: {
		id: string;
		name: string;
		image: string;
	};
	interestedUserIds: string[];
	productIds: string[];
	image: string | null;
	createdAt: Date;
	updatedAt: Date;
};

export type User = {
	id: string;
	email: string;
	fullname: string | null;
	profile: string | null;
	joining_reasons: string[];
	stripe_customer_id: string;
	bio: string;
	addresses: Addresses;
	defaultAddress?: Address;
	interests: Category[];
	interestIds: string[];
	createdAt: Date;
	updatedAt: Date;
};

export type SlideColors = {
	color: string;
	backgroundColor: string;
};

export type Addresses = Address[];

export type Product = {
	id: string;
	title: string;
	description: string | null;
	images: any;
	image: string;
	variants: any;
	slideColors: SlideColors[];
	price: number;
	discount: number | null;
	quantity: number;
	categoryIds: string[];
	category: Category[];
	isStaffPick: boolean | null;
	isFeatured: boolean | null;
	createdAt: Date;
	updatedAt: Date;
};

export type Card = {
	brand: string;
	expiry: string;
	last4: string;
};
