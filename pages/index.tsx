import Link from "next/link";
import { FC } from "react";
import { HomePageProps } from '../interfaces'


const HomePage: FC<HomePageProps> = ({ coffeeList }) => {
    
    if(!coffeeList.length) {
        return null;
    }

    return <div>
        <h2>All coffee options</h2>
        <ul>
            {coffeeList.map(coffee => (
                <li key={coffee.name}><Link href={`/coffee/${coffee.name}`}>{coffee.name}</Link></li>
            ))}
        </ul>
    </div>
}

export async function getServerSideProps() {
    const response = await fetch(`${process.env.COFFEE_SERVER_URL}/coffeeList`);

    const coffeeList = await response.json();

    return {
        props: {
            coffeeList
        }
    }
}

export default HomePage