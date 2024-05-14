enum gender {
    MAIL = "MAIL",
    FEMALE = "FEMALE"
}

export interface TSupplier {
    firstName: string;
    lastName: string;
    gender: string;
    active: boolean;
    businessType: string;
    descriptions: string;
}

export interface TSupplierDT {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    active: boolean;
    businessType: string;
    descriptions: string | null;
    createAt: DateTime;
    updatedAt: DateTime;
}