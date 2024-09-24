"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast, Toaster } from "sonner";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  encryptLevel: z.enum(["PUBLIC", "SEMIPUBLIC", "PRIVATE"]).default("PUBLIC"),
  apiKey: z.string().min(1, "API Key is required"),
});

export default function NewStreamPost() {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const storedApiKey = localStorage.getItem("apiKey");
    console.log(storedApiKey);
    if (storedApiKey) {
      setApiKey(storedApiKey);
      form.setValue("apiKey", storedApiKey); // Sync the apiKey state to the form
    }
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      encryptLevel: "PUBLIC",
      apiKey: apiKey,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("/api/stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": values.apiKey,
        },
        body: JSON.stringify({
          title: values.title,
          content: values.content,
          encryptLevel: values.encryptLevel,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create stream post");
      }

      localStorage.setItem("apiKey", values.apiKey);
      toast.success("Your stream post has been created.");
      form.reset();
      form.setValue("apiKey", localStorage.getItem("apiKey") || "");
    } catch (error) {
      toast.error("Failed to create stream post. Please try again.");
    }
  }

  return (
    <>
      <Toaster />
      <div className="flex items-center justify-center mt-6">
        <div className="p-8 rounded shadow-md w-full max-w-md border">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter post title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter post content"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="encryptLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Encryption Level</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select encryption level" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="PUBLIC">Public</SelectItem>
                        <SelectItem value="SEMIPUBLIC">Semi-Public</SelectItem>
                        <SelectItem value="PRIVATE">Private</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Key</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your API key. It will be saved in local storage.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Create Post</Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
