import * as z from 'zod'

// for thread validation 
export const ThreadValidation = z.object({
    // defining different fields 
    // this ensurs that profile url is always an string 
    thread: z.string().min(3, { message: "MINIMUM 3 CHARACTERS" }).max(30, { message: "MAXIMUM 30 CHARACTERS" }),
    accountId: z.string()
})

// for comment validation
export const CommentValidation = z.object({
    // defining different fields 
    // this ensurs that profile url is always an string 
    thread: z.string().min(3, { message: "MINIMUM 3 CHARACTERS" }).max(30, { message: "MAXIMUM 30 CHARACTERS" }),
})