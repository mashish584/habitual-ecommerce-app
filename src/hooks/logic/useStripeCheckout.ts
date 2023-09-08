import { Address, useStripe } from "@stripe/stripe-react-native";
import { useCallback, useState } from "react";

import { showToast } from "@utils/index";
import { useCart } from "@utils/store";
import { useCartCheckout, useUpdateTransaction } from "../api";

interface CheckoutResponse {
	paymentId: string;
	receiptUrl: string;
	publishableKey: string;
	paymentIntent: string;
	customer: string;
	ephemeralKey: string;
	cartTotal: number;
}

const useStripeCheckout = () => {
	const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
	const { initPaymentSheet, presentPaymentSheet } = useStripe();

	const cartCheckout = useCartCheckout<"cart", CheckoutResponse>();
	const updateTransaction = useUpdateTransaction();

	const items = useCart((store) => store.items);
	const resetCart = useCart((store) => store.resetCart);

	const initiatePaymentSheet = useCallback(
		async (address: Address) => {
			try {
				setIsPaymentProcessing(true);
				const response = await cartCheckout.mutateAsync({ cart: items });

				if (response?.data) {
					const { error } = await initPaymentSheet({
						paymentIntentClientSecret: response.data.paymentIntent,
						customerEphemeralKeySecret: response.data.ephemeralKey,
						customerId: response.data.customer,
						merchantDisplayName: "Habitual Ecommerce",
					});

					if (!error) {
						const { error } = await presentPaymentSheet();
						if (!error) {
							const transactionData = {
								transactionId: response.data.paymentId,
								status: "SUCCESS",
								details: items,
								productIds: Object.keys(items),
								address,
								amount: response.data.cartTotal,
							};

							const data = await updateTransaction.mutateAsync(transactionData);
							resetCart();
							setIsPaymentProcessing(false);
							return data;
						}
					}
					setIsPaymentProcessing(false);
					return error;
				}
			} catch (error) {
				showToast("error", { title: "Habitual Ecommerce", message: "Error while initiating payment." });
			}
		},
		[items],
	);

	return { initiatePaymentSheet, isLoading: cartCheckout.isLoading || isPaymentProcessing };
};

export default useStripeCheckout;
