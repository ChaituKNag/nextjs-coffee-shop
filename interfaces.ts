export interface Coffee {
    name: string;
    color: string;
    hasMilk?: boolean;
    isCold?: boolean;
    cost: number;
}

export interface HomePageProps {
    coffeeList: Coffee[];
}

export interface CoffeeDetailsProps {
    coffeeDetails: Coffee;
    addedToCart: boolean;
}

export interface CoffeeConfirmationProps {
    coffeeDetails: {
        cart: CartDetails;
        total: number;
        date: Date;
        id: number
    };
}

export interface CartItem {
    name: string;
    id: number;
    cost: number;
}

export type CartDetails = CartItem[];
export interface CoffeeCheckoutProps {
    cartDetails: CartDetails
}