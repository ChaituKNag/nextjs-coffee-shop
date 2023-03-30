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

export interface CoffeeCheckoutProps {
    cartDetails: {
        name: string;
        id: number
    }[]
}