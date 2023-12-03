// for use side rendering
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import { Button } from "@/components/ui/button";
import * as z from 'zod'

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    // shows error of form
    FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from '@/lib/uploadThing'
import { useForm } from "react-hook-form";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from 'next/navigation'

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

// accepting the props from the onboarding component
const AccountProfile = ({ user, btnTitle }: Props) => {
    // the type of useState is array of File
    const [files, setFiles] = useState<File[]>([])
    const { startUpload } = useUploadThing("media")
    const router = useRouter()
    const pathname = usePathname()

    // we have to declare the form data that we have to push into it

    // 1. defining the form
    const form = useForm({
        // reolver will be used for schema validation from user.ts
        resolver: zodResolver(UserValidation),
        defaultValues: {
            profile_photo: user?.image || "",
            name: user?.name || "",
            username: user?.username || "",
            bio: user?.bio || ""
        },
    });

    // handle the uploadation of the image 
    const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value: string) => void) => {
        // to prevent the browser from reload 
        e.preventDefault()

        // read the file from file reader 
        const fileReader = new FileReader()

        if (e.target.files && e.target.files.length > 0) {
            // if there is something 
            const file = e.target.files[0]
            setFiles(Array.from(e.target.files))

            // if the type of file is not an image, exit
            if (!file.type.includes('image')) return

            fileReader.onload = async (event) => {
                const imageDataUrl = event.target?.result?.toString() || ''

                // it allows us to update the field using react Hook
                fieldChange(imageDataUrl)
            }

            fileReader.readAsDataURL(file)
        }
    }

    // 2. Defining a submit handler
    // to reupload the new image and update the user in DB 
    const onSubmit = async (values: z.infer<typeof UserValidation>) => // uservalidation's specified object will be submit
    {
        // to get the value from the profile_photo as we are using react hook
        const blob = values.profile_photo

        // to know whether the user has changed the image 
        // isBase64Image() is a function coming from utils taking image as string and test it for base64 
        const hasImageChanged = isBase64Image(blob)

        if (hasImageChanged) {
            // for image Response 
            const imgRes = await startUpload(files)

            // this is to be check later
            if (imgRes && imgRes[0].url) {
                // update the values 
                values.profile_photo = imgRes[0].url
            }
        }

        // update user profile
        await updateUser(
            // passing params as object so that order does not require
            {
                userId: user.id,
                username: values.username,
                name: values.name,
                bio: values.bio,
                image: values.profile_photo,
                path: pathname
            }
        )

        if (pathname === "/profile/edit") {
            router.back();
        } else {
            router.push("/");
        }
    }


    //   onboarding page form 
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10" >

                {/* image upload section */}
                <FormField
                    control={form.control}
                    name="profile_photo"

                    //   we will render a field having an formItem
                    render={({ field }) => (
                        <FormItem className="flex items-center gap-4">
                            <FormLabel className="account-form_image-label">
                                {
                                    // if we have the image to show 
                                    field.value ? (
                                        <Image
                                            src={field.value}
                                            alt="profile picture"
                                            width={96}
                                            height={96}
                                            priority
                                            className="rounded-full object-contain"
                                        />
                                    ) : (
                                        // if there is no picture to be shown 
                                        <Image
                                            src="/assets/profile.svg"
                                            alt="profile picture"
                                            width={24}
                                            height={24}
                                            className=" object-contain"
                                        />
                                    )
                                }
                            </FormLabel>
                            <FormControl className="flex-1 text-base-semibold text-gray-200">
                                <Input type="file"
                                    accept="image/*"
                                    placeholder="Upload a photo"
                                    className="account-form_image-input"
                                    onChange={(e) => handleImage(e, field.onChange)}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* name input section  */}
                <FormField
                    control={form.control}
                    name="name"

                    //   we will render a field having an formItem
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full gap-3">
                            <FormLabel className="text-base-semibold text-light-2">
                                Name
                            </FormLabel>
                            <FormControl>
                                <Input type="text"
                                    className="account-form_input no-focus"
                                    // spreading the default field properties 
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* username input section  */}
                <FormField
                    control={form.control}
                    name="username"

                    //   we will render a field having an formItem
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full gap-3">
                            <FormLabel className="text-base-semibold text-light-2">
                                Userame
                            </FormLabel>
                            <FormControl>
                                <Input type="text"
                                    className="account-form_input no-focus"
                                    // spreading the default field properties 
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* Bio input section  */}
                <FormField
                    control={form.control}
                    name="bio"

                    //   we will render a field having an formItem
                    render={({ field }) => (
                        <FormItem className="flex flex-col w-full gap-3">
                            <FormLabel className="text-base-semibold text-light-2">
                                Bio
                            </FormLabel>
                            <FormControl>
                                <Textarea rows={10}

                                    className="account-form_input no-focus"
                                    // spreading the default field properties 
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="bg-primary-500">Submit</Button>
            </form>
        </Form>
    );
};

export default AccountProfile;
