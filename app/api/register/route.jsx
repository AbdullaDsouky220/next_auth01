import prisma from '../../../lib/prismadb'

import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'


export   async function   POST (request){
    const body=await  request.json()
    const {
        name,email,password
    }=body
    const isExist = await prisma.user.findUnique({
        where: { email },
        select: { email: true }
    })
      console.log('this user is abdullah',isExist);


    if(isExist) {
        throw new Error('Email already exists')
    }

    const hashedPassword = await  bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            hashedPassword
        }
    });
    return  NextResponse.json(newUser)

}