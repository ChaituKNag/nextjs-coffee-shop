import { useRouter } from "next/router";
import { FC } from "react";
import { CoffeeHistoryItem, CoffeeOrderHistoryProps } from "../interfaces";

const CoffeeOrderHistory: FC<CoffeeOrderHistoryProps> = ({ coffeeHistory }) => {

    const router = useRouter();

    return <div>
        <h2>Coffee history</h2>

        <ul>
            {coffeeHistory?.map((order: CoffeeHistoryItem) => {
                const orderDate = new Date(order.date);
                return (
                    <li key={order.id}>
                        <h4>Order on {orderDate.toLocaleDateString()} at {orderDate.toLocaleTimeString()}</h4>
                        <ul>
                            {order.cart.map((coffee: any) => (
                                <li key={coffee.name}>
                                    {coffee.name} {` `} ${coffee.cost}
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => router.push(`/order-confirmation/${order.id}`)}>View details</button>
                    </li>
                )
            })}
        </ul>

        <button onClick={() => router.push('/')}>Home</button>
    </div>
}

export const getServerSideProps = async () => {
    const response = await fetch(`${process.env.COFFEE_SERVER_URL}/coffeeHistory`);
    const coffeeHistory = await response.json();
    console.log('coffeeHistory', coffeeHistory);

    return {
        props: {
            coffeeHistory
        }
    }
}


export default CoffeeOrderHistory