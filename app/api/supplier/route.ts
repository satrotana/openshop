import { NextResponse } from 'next/server'
import prisma from '@/lib/db';
import { ZSupplier } from '@/utils/schema';
import { z } from 'zod';

enum gender {
    MAIL = "MAIL",
    FEMALE = "FEMALE"
}

export async function GET(request: Request) {
    const supplier = await prisma.supplier.findMany();
    return NextResponse.json({ supplier }, { status: 200 })
}

export async function POST(request: Request) {
    const { values } = await request.json();
    const rqData: z.infer<typeof ZSupplier> = await values;

    const CheckSupply = await prisma.supplier.findMany({
        where: {
            firstName: {
                equals: rqData.firstname
            },
            lastName: {
                equals: rqData.lastname
            }
        }
    });
    if (CheckSupply.length > 0) {
        return NextResponse.json({ message: "This supplier name ready in use" }, { status: 500 })
    }

    const supplier = await prisma.supplier.create({
        data:
        {
            firstName: rqData.firstname,
            lastName: rqData.lastname,
            gender: rqData.gender as gender,
            active: rqData.active as boolean,
            businessType: rqData.businesstype,
            descriptions: rqData.descriptions
        }
    });
    return NextResponse.json({ message: "Supplier has been created" }, { status: 200 })
}