import axios from "axios";
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export function Dashboard(){
    return <div>
        <Appbar/>
        <div className="m-8">
            <Balance value={async()=>{
               const response = await axios.get("http://localhost:3000/api/v1/account/balance")
               return response.accounts.balance
            }}/>
            <Users/>
        </div>
    </div>
}