// for use side rendering
"use client";

import * as z from 'zod'
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "../ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

import { usePathname, useRouter } from 'next/navigation'
import { ThreadValidation } from '@/lib/validations/threads';
import { createThread } from '@/lib/actions/thread.actions';

// import { updateUser } from "@/lib/actions/user.actions";

// defining Props as interface (whichh is giving its structure)
interface Props {
    user: {
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}


function PostThread({ userId }: { userId: string }) {
    const router = useRouter()
    const pathname = usePathname()

    // we have to declare the form data that we have to push into it

    // 1. defining the form
    const form = useForm({
        // reolver will be used for schema validation from user.ts
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: '',
            accountId: userId,

        },
    });

    const onSubmit = async (values: z.infer<typeof ThreadValidation>) => {
        await createThread({
            text: values.thread, author: userId, communityId: null, path: pathname
        })

        router.push('/')
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-10 flex flex-col justify-start gap-10"
            >
                {/* name input section  */}
                <FormField
                    control={form.control}
                    name="thread"

                    //   we will render a field having an formItem
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full gap-3">
                            <FormLabel className="text-base-semibold text-light-2">
                                Content
                            </FormLabel>
                            <FormControl className='no-focus border border-dark-4 bg-dark-3 text-light-1'>
                                <Textarea rows={15}
                                    // spreading the default field properties 
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit' className='bg-primary-500'>Post Thread</Button>
            </form>
        </Form>
    )
}

export default PostThread