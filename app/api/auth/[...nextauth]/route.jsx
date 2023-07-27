import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '@/lib/prismadb'
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from 'next-auth/providers/github'
import bcrypt from 'bcrypt'


export const authOptions={
    adapter:PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_SECRET,
        }),
        GithubProvider({
            clientId:process.env.GITHUB_ID,
            clientSecret:process.env.GITHUB_SECRET,
        }),
        CredentialsProvider({
            name:"credentials",
            credentials:{
                
                email:{
                    label:"Email",
                    type:"text",
                    placeholder:"Abdullah"
                },
                password:{
                    label:"Password",
                    type:"password",
                },
                username:{
                    label:"Username",
                    type:"text",
                    placeholder:"Abdullah Dsouky"
                },
            },
            async authorize(credentials){
                 // check to see if email and password is there
                 if(!credentials.email || !credentials.password) {
                    throw new Error('Please enter an email and password')
                }

                // check to see if user exists
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                });

                // if no user was found 
                if (!user || !user?.hashedPassword) {
                    throw new Error('No user found')
                }

                // check to see if password matches
                const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword)

                // if password does not match
                if (!passwordMatch) {
                    throw new Error('Incorrect password')
                }

                return user;
            }
        })
    ],
    secret:process.env.NEXTAUTH_SECRET    ,
    debug: process.env.NODE_ENV === "development",
    session:{
        strategy:"jwt"
    }

}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }


//adapter
//providers 
   //googleprodider
        //clientid and client secret
   //githubprovder
        //clientid and client secret
   //credientials
        //name and credientals you neeed like user name and password 
                //authorize(credienals)
//secet from env file must be unique
// debug: process.env.NODE_ENV === "development",
//session:{
//     strategy:"jwt"
// }