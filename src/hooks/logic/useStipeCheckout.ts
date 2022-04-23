import { useStripe } from "@stripe/stripe-react-native";
import { useCallback } from "react";
import { useUser } from "../../utils/store";
import { useCartCheckout } from "../api";

interface CheckoutResponse {
	publishableKey: string;
	paymentIntent: string;
	customer: string;
	ephemeralKey: string;
}

export const usePayment = () => {
	const { initPaymentSheet, presentPaymentSheet } = useStripe();
	const items = useUser((store) => store.cart);
	const cartCheckout = useCartCheckout<"cart", CheckoutResponse>();

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
					const response = await presentPaymentSheet();

					if (!response.error) {
						alert("Payment Done");
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
