import { order } from "../types/types";
import path from "./path";

function C() {
    return {
        list: async function (access_token: string) {
            const res = await fetch(`${path}/cart/list`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ access_token })
            })
            const response: {
                success: boolean | null;
                data: order[];
                error: string | Object | null;
                message: string | null;
            } | null = await res.json()
            return response
        }
    }
}
export default C()