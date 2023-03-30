import { GetServerSideProps } from 'next'
import { FC, useState } from 'react';
import { CoffeeDetailsProps } from '../../interfaces';
import { useRouter } from 'next/router';



const CoffeeDetails: FC<CoffeeDetailsProps> = ({ coffeeDetails, addedToCart }) => {
    
    const router = useRouter();

    const [addedToCartState, setAddedToCartState] = useState(addedToCart);

    const handleAddToCart = async () => {
        const response = await fetch(`/api/add-to-cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: coffeeDetails.name})
        });

        const data = await response.json();

        console.log(data);

        setAddedToCartState(true);
    }

    return <div>
        <h2>{coffeeDetails.name}</h2>
        <p>Color: {coffeeDetails.color}</p>  
        {coffeeDetails.hasMilk && <p>It has milk.</p>}
        <p>Temporature: {coffeeDetails.isCold ? 'Cold' : 'Hot'}</p>
        <p>Price: ${coffeeDetails.cost}</p>

        <div>
            <button onClick={() => router.push('/')}>Home</button>
            <button onClick={handleAddToCart} disabled={addedToCartState}>{addedToCartState ? 'Added to cart': 'Add to cart'}</button>
            <button onClick={() => router.push('/checkout')}>Checkout</button>
        </div>
    </div>
}

export default CoffeeDetails

export const getServerSideProps: GetServerSideProps = async (context) =>  {
    const name = context.params?.name;

    const response = await fetch(`${process.env.COFFEE_SERVER_URL}/coffeeList?name=${name}`);
    const coffeeDetails = await response.json();

    const cartResponse = await fetch(`${process.env.COFFEE_SERVER_URL}/coffeeCart`);
    const cartDetails = await cartResponse.json();

    return {
        props: {
            coffeeDetails: coffeeDetails[0],
            addedToCart: !!cartDetails.find((coffee: any) => coffee.name === name)
        }
    }
}