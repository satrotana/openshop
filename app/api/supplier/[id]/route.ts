import { NextResponse } from 'next/server'
import prisma from '@/lib/db';
import { z } from 'zod';
import { ZSupplier } from '@/utils/schema';

enum gender {
    MAIL = "MAIL",
    FEMALE = "FEMALE"
}

export async function GET(request: Request, id: number) {
    const { params }: any = await id;
    const myID: string = params.id;
    const supplier = await prisma.supplier.findMany({ where: { id: parseInt(myID) } });
    return NextResponse.json({ supplier }, { status: 200 })
}

export async function PUT(request: Request, id: number) {
    const qr = await request.json();
    console.log(qr)
    const rqData: z.infer<typeof ZSupplier> = await qr;
    const { params }: any = await id;
    const myID: string = params.id;
    const supplier = await prisma.supplier.update({
        data:{
            firstName: rqData.firstname,
            lastName: rqData.lastname,
            gender: rqData.gender as gender,
            active: rqData.active as boolean,
            businessType: rqData.businesstype,
            descriptions: rqData.descriptions
        },
        where:{
            id: parseInt(myID)
        }
    });
    return NextResponse.json({ supplier }, { status: 200 })
}