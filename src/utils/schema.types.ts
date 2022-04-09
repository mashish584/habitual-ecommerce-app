export type User = {
	id: string;
	email: string;
	fullname: string | null;
	profile: string | null;
	joining_reasons: string[];
	stripe_customer_id: string;
	interestIds: string[];
	createdAt: Date;
	updatedAt: Date;
};

export type Category = {
	id: string;
	name: string;
	parentId: string;
	parentCategory: {
		id: string;
		name: string;
	};
	interestedUserIds: string[];
	productIds: string[];
	image: string | null;
	createdAt: Date;
	updatedAt: Date;
};
