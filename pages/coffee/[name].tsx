import { GetServerSideProps } from 'next'
import { FC } from 'react';
import { CoffeeDetailsProps } from '../../interfaces';



const CoffeeDetails: FC<CoffeeDetailsProps> = ({ coffeeDetails }) => {
    console.log(coffeeDetails);
    return <div>
        Coffee details: {coffeeDetails.name}
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