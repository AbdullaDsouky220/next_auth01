'use client';

import { useSession } from "next-auth/react"
function User() {

    const { data}=useSession()
  return (
    <div>{
        JSON.stringify(data)
        }</div>
  )
}

export default User