
import {getServerSession} from 'next-auth'
import {authOptions} from '@/app/api/auth/[...nextauth]/route'


export default async function Home() {
  const session=await getServerSession(authOptions)
  console.log(session)
  return (
  <div>
    <h1>
      hrkkk
    </h1>
    <pre>

    {
      JSON.stringify(session)
    }
    </ pre>
  </div>
  )
}
