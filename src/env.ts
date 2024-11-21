import 'dotenv/config'
import { z } from 'zod'

const envShema = z.object({
    PORT: z.coerce.number()
})

const _env = envShema.safeParse(process.env)

if(!_env.success) throw new Error("Environment Variable error ")

export const env = _env.data