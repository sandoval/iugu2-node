/**
 * @file declaration of the Subscription interfaces
 * @author Bruno Ferreira <shirayuki@kitsune.com.br>
 * @license MIT
 * @since 0.4.0
 */
import { Identifier, Object } from './object';
import { CustomVariable } from './custom-variable';
import { LogEntry } from './log-entry';
export interface SubscriptionSubItem extends Identifier {
    description?: string;
    quantity?: number;
    price_cents?: number;
    price?: string;
    total?: string;
}
export interface Subscription extends Object {
    suspended?: boolean;
    active?: boolean;
    in_trial?: Date;
    plan_identifier?: string;
    plan_name?: string;
    plan_ref?: string;
    price_cents?: number;
    currency?: string;
    features?: any;
    expires_at?: Date;
    cycled_at?: Date;
    credits?: number;
    credits_base?: boolean;
    credits_min?: number;
    credits_cycle?: Date;
    customer_id?: string;
    customer_name?: string;
    customer_email?: string;
    recent_invoices?: any;
    subitems?: SubscriptionSubItem[];
    logs?: LogEntry[];
    custom_variables?: CustomVariable[];
}
export interface NewSubscriptionSubItem {
    description?: string;
    price_cents?: number;
    quantity?: number;
    recurrent?: boolean;
}
export interface NewSubscription {
    plan_identifier?: string;
    customer_id?: string;
    expires_at?: Date;
    only_on_charge_success?: boolean;
    payable_with?: 'all' | 'credit_card' | 'bank_slip';
    credits_based?: boolean;
    price_cents?: number;
    credits_cycle?: number;
    credits_min?: number;
    subitems?: NewSubscriptionSubItem[];
    custom_variables?: CustomVariable[];
}
export interface UpdateSubscription extends NewSubscription {
    suspended?: boolean;
    skip_charge?: boolean;
}
