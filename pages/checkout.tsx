import { useRouter } from "next/router"


const CoffeeCheckout = () => {

    const router = useRouter();

    return <div>
        <h2>Coffee checkout</h2>
        <button onClick={() => router.replace('/order-confirmation')}>Purchase</button>
    </div>
}

export default CoffeeCheckout