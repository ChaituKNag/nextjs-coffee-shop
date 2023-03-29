import { GetServerSideProps } from 'next'
import { FC } from 'react';
import { CoffeeDetailsProps } from '../../interfaces';
import { useRouter } from 'next/router';



const CoffeeDetails: FC<CoffeeDetailsProps> = ({ coffeeDetails }) => {
    
    const router = useRouter();

    return <div>
        <h2>Coffee details: {coffeeDetails.name}</h2>

        <button onClick={() => router.push('/checkout')}>Checkout</button>
    </div>
}

export default CoffeeDetails

export const getServerSideProps: GetServerSideProps = async (context) =>  {
    const name = context.params?.name;

    return {
        props: {
            coffeeDetails: {name}
        }
    }
}