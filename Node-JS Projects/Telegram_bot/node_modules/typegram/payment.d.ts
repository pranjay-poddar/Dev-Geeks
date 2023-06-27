import { User } from "./manage";

/** This object represents a portion of the price for goods or services. */
export interface LabeledPrice {
  /** Portion label */
  label: string;
  /** Price of the product in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  amount: number;
}

/** This object contains basic information about an invoice. */
export interface Invoice {
  /** Product name */
  title: string;
  /** Product description */
  description: string;
  /** Unique bot deep-linking parameter that can be used to generate this invoice */
  start_parameter: string;
  /** Three-letter ISO 4217 currency code */
  currency: string;
  /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  total_amount: number;
}

/** This object represents a shipping address. */
export interface ShippingAddress {
  /** Two-letter ISO 3166-1 alpha-2 country code */
  country_code: string;
  /** State, if applicable */
  state: string;
  /** City */
  city: string;
  /** First line for the address */
  street_line1: string;
  /** Second line for the address */
  street_line2: string;
  /** Address post code */
  post_code: string;
}

/** This object represents information about an order. */
export interface OrderInfo {
  /** User name */
  name?: string;
  /** User's phone number */
  phone_number?: string;
  /** User email */
  email?: string;
  /** User shipping address */
  shipping_address?: ShippingAddress;
}

/** This object represents one shipping option. */
export interface ShippingOption {
  /** Shipping option identifier */
  id: string;
  /** Option title */
  title: string;
  /** List of price portions */
  prices: LabeledPrice[];
}

/** This object contains basic information about a successful payment. */
export interface SuccessfulPayment {
  /** Three-letter ISO 4217 currency code */
  currency: string;
  /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  total_amount: number;
  /** Bot specified invoice payload */
  invoice_payload: string;
  /** Identifier of the shipping option chosen by the user */
  shipping_option_id?: string;
  /** Order information provided by the user */
  order_info?: OrderInfo;
  /** Telegram payment identifier */
  telegram_payment_charge_id: string;
  /** Provider payment identifier */
  provider_payment_charge_id: string;
}

/** This object contains information about an incoming shipping query. */
export interface ShippingQuery {
  /** Unique query identifier */
  id: string;
  /** User who sent the query */
  from: User;
  /** Bot specified invoice payload */
  invoice_payload: string;
  /** User specified shipping address */
  shipping_address: ShippingAddress;
}

/** This object contains information about an incoming pre-checkout query. */
export interface PreCheckoutQuery {
  /** Unique query identifier */
  id: string;
  /** User who sent the query */
  from: User;
  /** Three-letter ISO 4217 currency code */
  currency: string;
  /** Total price in the smallest units of the currency (integer, not float/double). For example, for a price of US$ 1.45 pass amount = 145. See the exp parameter in currencies.json, it shows the number of digits past the decimal point for each currency (2 for the majority of currencies). */
  total_amount: number;
  /** Bot specified invoice payload */
  invoice_payload: string;
  /** Identifier of the shipping option chosen by the user */
  shipping_option_id?: string;
  /** Order information provided by the user */
  order_info?: OrderInfo;
}
