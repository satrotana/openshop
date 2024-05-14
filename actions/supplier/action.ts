'use server';

import prisma from "@/lib/db";
import { TSupplierDT, gender } from "@/typings";
import { ZSupplier } from "@/utils/schema";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const formSchema = ZSupplier;
interface dataHandler {
    code: number,
    message: string,
    data: TSupplierDT[]
}
const dataHandler: dataHandler = {
    code: 500,
    message: 'Something went wrong',
    data: [],
}

export async function GetSupplier() {
    try {
        const supplier = await prisma.supplier.findMany({
            orderBy: {
                id: 'desc'
            }
        });

        dataHandler.code = 200;
        dataHandler.data = supplier;
        return dataHandler;

    } catch (error) {

        dataHandler.code = 500;
        dataHandler.message = "Something went wrong";
        return dataHandler;
    }
}

export async function CreateSupplier(values: z.infer<typeof formSchema>) {
    try {
        const existedSupplier = await prisma.supplier.findMany({
            where: {
                firstName: values.firstname,
                lastName: values.lastname
            }
        });
        if (existedSupplier.length > 0) {
            dataHandler.message = "This supplier is ready existed";
            dataHandler.code = 400;
            throw new Error();
        };

        await prisma.supplier.create({
            data:
            {
                firstName: values.firstname,
                lastName: values.lastname,
                gender: values.gender as gender,
                active: values.active as boolean,
                businessType: values.businesstype,
                descriptions: values.descriptions
            }
        });
        await revalidatePath('/supplier');

        dataHandler.code = 200;
        dataHandler.message = 'Your supplier created success';
        dataHandler.data = [];
        return dataHandler;
    } catch (error) {
        return dataHandler;
    }
}