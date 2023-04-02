import { useRouter } from "next/router"
import { FC, useState } from "react";
import { CoffeeCheckoutProps } from "../interfaces";
import { GetServerSideProps } from "next";


const CoffeeCheckout: FC<CoffeeCheckoutProps> = ({ cartDetails }) => {

    const router = useRouter();
    const [deletedEntries, setDeletedEntries] = useState<number[]>([]);


    const handleDeleteFromCart = async (id: number) => {

        const response = await fetch(`/api/delete-from-cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
        });

        const data = await response.json();

        console.log(data);
        setDeletedEntries([...deletedEntries, id]);
    }

    const handleBuyCoffee = async () => {

        const response = await fetch(`/api/buy-coffee`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await response.json();

        router.replace(`/order-confirmation/${data.id}`)
    }

    const activeCartItems = cartDetails.filter(cartItem => !deletedEntries.includes(cartItem.id))
    return <div>
        <h2>Coffee checkout</h2>
        {activeCartItems.length > 0 ? <ul>
            {activeCartItems.map((coffee: any) => (
                <li key={coffee.name}>
                    {coffee.name} {` `} ${coffee.cost} {`  `}
                    <button onClick={() => handleDeleteFromCart(coffee.id)}>X</button>
                </li>
            ))}
        </ul> : <p>Cart is empty</p>}
        <button onClick={handleBuyCoffee} disabled={activeCartItems.length === 0}>Buy coffee</button>
        <button onClick={() => router.push('/')}>Home</button>
    </div>
}

export const getServerSideProps: GetServerSideProps = async () => {
    const cartResponse = await fetch(`${process.env.COFFEE_SERVER_URL}/coffeeCart`);
    const cartDetails = await cartResponse.json();

    console.log(cartDetails);

    return {
        props: {
            cartDetails
        }
    }
}

export default CoffeeCheckout