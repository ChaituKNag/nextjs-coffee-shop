import { useRouter } from "next/router"


const CoffeeConfirmation = () => {

    const router = useRouter();

    return <div>
        <h2>Coffee confirmation</h2>
        <button onClick={() => router.replace('/order-history')}>Previous Orders</button>
        <button onClick={() => router.push('/')}>Home</button>
    </div>
}

export default CoffeeConfirmation