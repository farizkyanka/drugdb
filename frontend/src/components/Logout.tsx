import type { ActionFunction } from "react-router"
import { redirect, json, Form } from "react-router-dom"

export default function Logout () {
    return (
        <Form action="/admin/logout" method='delete'>
            <button>Logout</button>
        </Form>
    )
}

export const actionLogout: ActionFunction = async () => {
    const response = await fetch('http://localhost:5000/admin/logout', {
        method: 'DELETE',
        headers: {'content-type': 'application/json', 'accept': '*/*'},
        credentials: "include"
    })

    console.log(response)

    if (!response.ok) {
        throw json({message: 'error'}, {status: 500})
    }

    return redirect('/')
}