"use client";
import { CreateSupplier } from "@/actions/supplier/action";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { TSupplierDT } from "@/typings";
import { ZSupplier } from "@/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, List } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface dataHandler {
  code: number;
  message: string;
  data: TSupplierDT[];
}
const dataHandler: dataHandler = {
  code: 500,
  message: "Something went wrong",
  data: [],
};

export default function CreateSupplierForm() {
  const formSchema = ZSupplier;
  const [isPending, startTransition] = useTransition();
  const [msgHandler, setMsgHandler] = useState<dataHandler>({
    code: 0,
    message: "",
    data: [],
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      gender: "FEMALE",
      businesstype: "Clothes",
      descriptions: "",
      active: true,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      msgHandler.code = 0;
      startTransition(() => {
        const CSupplier = CreateSupplier(values);
        CSupplier.then((response) => {
          setMsgHandler(response);
          if (response.code == 200) {
            console.log("success");
            form.setValue("firstname", "");
            form.setValue("lastname", "");
            form.setValue("gender", "FEMALE");
            form.setValue("businesstype", "Clothes");
            form.setValue("descriptions", "");
            form.setValue("active", true);
          }
        });
      });
    } catch (error) {}
  };

  return (
    <div className="p-4 sm:p-10">
      <Card className="p-4 sm:p-10">
        <CardHeader>
          <div className="flex flex-col-reverse gap-4 md:flex-row">
            <div className="w-full">
              <CardTitle>Add New Supplier</CardTitle>
              <CardDescription>
                Create new supplier, to manage your trading.
              </CardDescription>
            </div>
            <div className="w-full md:flex md:justify-end">
              <Link href="/supplier">
                <Button size="sm" variant="default" className="h-8 gap-1">
                  <List className="h-3.5 w-3.5" />
                  <span className="sm:whitespace-nowrap">Back To List</span>
                </Button>
              </Link>
            </div>
          </div>

          {msgHandler.code > 0 ? (
            <Alert
              variant={msgHandler.code == 200 ? "success" : "destructive"}
              className="my-5"
            >
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>
                {msgHandler.code == 200 ? "Success" : "Error"}
              </AlertTitle>
              <AlertDescription>{msgHandler.message}</AlertDescription>
            </Alert>
          ) : (
            <div></div>
          )}
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <div className="grid grid-cols-1 gap-4 w-full sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl className="col-span-full">
                        <Input
                          placeholder="Fist Name"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl className="col-span-full">
                        <Input
                          placeholder="Last Name"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem className="flex-row items-start space-x-0 space-y-3 rounded-md border p-4">
                    <FormLabel>Gender</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex gap-4"
                        disabled={isPending}
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="MALE" />
                          </FormControl>
                          <FormLabel className="font-normal">Male</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="FEMALE" />
                          </FormControl>
                          <FormLabel className="font-normal">Female</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businesstype"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Type</FormLabel>
                    <FormControl className="col-span-full">
                      <Input disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="descriptions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descriptions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type something about your supplier..."
                        className="resize-none"
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isPending}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Default active supplier</FormLabel>
                      <FormDescription>
                        In status active, your supplier is ready for trading.
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isPending}
                className="w-full md:w-40"
              >
                {isPending == true ? "Adding..." : "Add Supplier"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
