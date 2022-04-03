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
