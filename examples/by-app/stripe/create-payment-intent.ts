/**
 * Stripe — Zapier SDK example.
 * Create a payment intent for a specific amount and currency.
 * Discover all actions at runtime — see ./README.md ("Discovery" section).
 * Generated from live discovery. Do not edit by hand.
 * Trademarks belong to their respective owners; not affiliated or endorsed. Licensed under MIT; see LICENSE.
 */
import { createZapierSdk } from "@zapier/zapier-sdk";

const zapier = createZapierSdk();

async function connect() {
  const { data: connection } = await zapier.findFirstConnection({ app: "stripe", owner: "me" });
  return zapier.apps.stripe({ connection: connection.id });
}

/**
 * Create Payment
 * Creates a new payment, also known as a PaymentIntent.
 */
export async function createPaymentIntent() {
  const stripe = await connect();
  await stripe.write.create_payment_intent({
    inputs: {
      amount: 5000, // required — How much to charge in the [smallest currency unit](https://docs.stripe.com/currencies#zero-decima...
      currency: "usd", // required — A three-letter lowercase [ISO currency code](https://www.iso.org/iso-4217-currency-codes.html) Fo...
      confirm: false, // optional — WARNING: This field controls whether this action charges money or not. This field defaults to `fa...
      error_on_requires_action: false, // optional — Set to `true` to fail the payment attempt if the PaymentIntent transitions into `requires_action`...
      off_session: false, // optional — Set to `true` to indicate that the customer isn't in your checkout flow during this payment attem...
      description: "Payment for Order #12345", // optional
      receipt_email: "jane.doe@example.com", // optional
      shipping_name: "Jane Doe", // optional — Recipient name.
      shipping_address_line1: "123 Main St", // optional
      shipping_address_line2: "Apt 4B", // optional
      capture_method: "automatic", // optional — choices: automatic, automatic_async, manual — Defaults to `automatic`. Controls when the funds will be captured from the customer's account. Fo...
    },
  });
}
