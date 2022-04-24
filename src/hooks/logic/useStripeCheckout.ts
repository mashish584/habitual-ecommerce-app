import { useStripe } from "@stripe/stripe-react-native";
import { useCallback } from "react";
import { useCart } from "../../utils/store";
import { useCartCheckout, useUpdateTransaction } from "../api";

interface CheckoutResponse {
	paymentId: string;
	receiptUrl: string;
	publishableKey: string;
	paymentIntent: string;
	customer: string;
	ephemeralKey: string;
}

export const useStripeCheckout = () => {
	const { initPaymentSheet, presentPaymentSheet } = useStripe();
	const items = useCart((store) => store.items);
	const cartCheckout = useCartCheckout<"cart", CheckoutResponse>();
	const updateTransaction = useUpdateTransaction();

	const initiatePaymentSheet = useCallback(async () => {
		try {
			const response = await cartCheckout.mutateAsync({ cart: items });

			if (response.data) {
				const { error } = await initPaymentSheet({
					paymentIntentClientSecret: response.data.paymentIntent,
					customerEphemeralKeySecret: response.data.ephemeralKey,
					customerId: response.data.customer,
				});

				if (!error) {
					const { error } = await presentPaymentSheet();

					if (!error) {
						const transactionData = {
							transactionId: response.data.paymentId,
							receiptUrl: response.data.receiptUrl,
							status: "SUCCESS",
							details: items,
							productIds: Object.keys(items),
						};
						const data = await updateTransaction.mutateAsync(transactionData);
						return data;
					}
				}

				return error;
			}
		} catch (error) {
			console.log({ error });
		}
	}, [items]);

	return { initiatePaymentSheet };
};
