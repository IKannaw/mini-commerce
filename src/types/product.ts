import {Product} from '@prisma/client'

export interface ProductSlice{
    items:Product[],
    isLoaing:boolean
    error:Error | null
}

