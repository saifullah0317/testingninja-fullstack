import Navbar from "../components/Navbar"
import Price from "../components/Price"
export default function pricing() {
  return (
    <div>
      <Navbar selectedRoute='pricing'/>
      <div className="flex flex-row justify-evenly mt-24">
      <Price plan="Basic" price={29}/>
      <Price plan="Standard" price={59}/>
      <Price plan="Premium" price={99}/>
      </div>
    </div>
  )
}
