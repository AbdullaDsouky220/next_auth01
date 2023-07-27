import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import User from "@/app/components/user";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <div>
      <h1>Hello world</h1>
      <pre>
        {JSON.stringify(session)}
        <User />
      </pre>
    </div>
  );
}
