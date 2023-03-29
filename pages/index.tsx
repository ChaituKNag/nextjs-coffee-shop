import Link from "next/link";
import { FC } from "react";
import { HomePageProps } from '../interfaces'


const HomePage: FC<HomePageProps> = ({ coffeeList }) => {
    
    if(!coffeeList.length) {
        return null;
    }

    return <ul>
        {coffeeList.map(coffee => (
            <li key={coffee.name}><Link href={`/coffee/${coffee.name}`}>{coffee.name}</Link></li>
        ))}
    </ul>
}

export async function getServerSideProps() {

    return {
        props: {
            coffeeList: [
                {
                    name: "Espresso",
                    color: 'black',
                    cost: 3
                },
                {
                    name: "Latte",
                    color: 'brown',
                    hasMilk: true,
                    cost: 3
                }
            ]
        }
    }
}

export default HomePage