import { Suspense } from "react";
import { File, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoadingSupplierTable from "@/components/app/supplier/LoadingSupplierTable";
import SupplierList from "@/components/app/supplier/suppliersList";
import Link from "next/link";


export default function SupplierPage() {
  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-2 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="inactive">Inactive</TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Link href="/supplier/create">
              <Button size="sm" variant="default" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Supplier
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <TabsContent value="all">
          <Suspense fallback={<LoadingSupplierTable />}>
            <SupplierList />
          </Suspense>
        </TabsContent>
      </Tabs>
    </main>
  );
}
