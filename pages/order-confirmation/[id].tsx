import { GetServerSideProps } from "next";
import { useRouter } from "next/router"
import { FC } from "react";
import { CoffeeConfirmationProps } from "../../interfaces";


const CoffeeConfirmation: FC<CoffeeConfirmationProps> = ({ coffeeDetails }) => {

    const router = useRouter();

    return <div>
        <h2>Coffee details</h2>

        <h4>Yay, you did it. Thanks for the order</h4>
        <ul>
            {coffeeDetails.cart.map((coffee: any) => (
                <li key={coffee.name}>
                    {coffee.name} {` `} ${coffee.cost}
                </li>
            ))}
        </ul>
        <button onClick={() => router.replace('/order-history')}>Previous orders</button>
        <button onClick={() => router.push('/')}>Home</button>
    </div>
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const id = context.params?.id;
    
    const response = await fetch(`${process.env.COFFEE_SERVER_URL}/coffeeHistory/${id}`);

    const coffeeDetails = await response.json();

    return {
        props: {
            coffeeDetails
        }
    }
}


export default CoffeeConfirmation