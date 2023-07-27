import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from '@/lib/prismadb'
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from 'next-auth/providers/github'


export const authOptions={
    adapter:PrismaAdapter(prisma),
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecrent:process.env.GOOGLE_ID,
        }),
        GithubProvider({
            clientId:process.env.Github_ID,
            clientSecrent:process.env.Github_ID,
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