import { z } from "zod";

export const TokenSchema = z.string();

export type TokenSchemaParams = z.infer<typeof TokenSchema>
