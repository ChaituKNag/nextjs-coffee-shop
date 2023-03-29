import { useRouter } from "next/router";

const CoffeeOrderHistory = () => {

    const router = useRouter();

    return <div>
        <h2>Coffee history</h2>
        <button onClick={() => router.push('/')}>Home</button>
    </div>
}

export default CoffeeOrderHistory