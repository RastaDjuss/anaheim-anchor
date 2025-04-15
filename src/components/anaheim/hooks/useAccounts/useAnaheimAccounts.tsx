import { Connection, PublicKey } from '@solana/web3.js';
import { IdlAccount, IdlInstruction, IdlMetadata, IdlMetadata as AnaheimIdlMetadata } from './useAnaheimProgram';
import { AnchorProvider, Idl as AnchorIdl, Program } from '@coral-xyz/anchor';
import idl from 'src/components/idl/idl.json';
import Ajv, { JSONSchemaType } from 'ajv/dist/2019';
import { AnchorWallet } from '@solana/wallet-adapter-react';
import {
    objectInputType,
    objectOutputType,
    SafeParseError,
    SafeParseSuccess,
    z,
    ZodObject,
    ZodOptional,
    ZodString,
    ZodType, ZodTypeAny,
} from 'zod';
import { IdlConst, IdlErrorCode, IdlEvent, IdlTypeDef } from '@coral-xyz/anchor/dist/cjs/idl';
import { Command, program } from 'commander';

export type RawCreateParams = {
    errorMap?: z.ZodErrorMap;
    invalid_type_error?: string;
    required_error?: string;
    message?: string;
    description?: string;
};
const params: RawCreateParams = {
    errorMap: () => ({ message: "Custom error message" }),
};
const IdlMetadataSchema = z.object({
    name: z.string().nonempty(),
    version: z.string().regex(/^\d+\.\d+\.\d+$/), // Format semver
    spec: z.string(),
    address: z.string().optional(),
});

function validateMetadata(
  data: any
): SafeParseSuccess<objectOutputType<{
    name: ZodString,
    version: ZodString,
    spec: ZodString,
    address: ZodOptional<ZodString>
}, ZodType<any, any, any>, 'strip'>> | SafeParseError<objectInputType<{
    name: ZodString,
    version: ZodString,
    spec: ZodString,
    address: ZodOptional<ZodString>
}, ZodType<any, any, any>, 'strip'>> {
    return IdlMetadataSchema.safeParse(data, params);
}


export function useAnaheimProgram(): {
    wallet: AnchorWallet | undefined;
    connection: Connection;
    program: Command;
    Idl: ZodObject<{
        name: ZodString;
        version: ZodString;
        spec: ZodString;
        address: ZodOptional<ZodString>
    }, "strip", ZodTypeAny, objectOutputType<{
        name: ZodString;
        version: ZodString;
        spec: ZodString;
        address: ZodOptional<ZodString>
    }, ZodTypeAny, "strip">, objectInputType<{
        name: ZodString;
        version: ZodString;
        spec: ZodString;
        address: ZodOptional<ZodString>
    }, ZodTypeAny, "strip">>
} {
    const provider = AnchorProvider.local();
    const connection = provider.connection;
    const wallet = provider.wallet as AnchorWallet | undefined;

    const programId = new PublicKey((idl?.metadata as unknown as AnaheimIdlMetadata & { address?: string })?.address || 'coUnmi3oBUtwtd9fjeAvSsJssXh5A5xyPbhpewyzRVF');
    const FullIdlSchema = z.object({
        address: z.string(),
        metadata: IdlMetadataSchema, // Réutilise votre schéma existant
        docs: z.array(z.string()).optional(),
        instructions: z.array(z.object({
            name: z.string(),
            accounts: z.array(z.any()), // Ajoutez des types précis si possibles
            args: z.array(z.any())
        })).nonempty(),
        accounts: z.array(z.object({
            name: z.string(),
            type: z.any()
        })).optional(),
        events: z.array(z.any()).optional(),
        errors: z.array(z.any()).optional(),
        types: z.array(z.any()).optional(),
        constants: z.array(z.any()).optional(),
    });

    const idlValidation = FullIdlSchema.safeParse(idl);
    if (!idlValidation.success) {
        throw new Error('IDL Validation Error: ' + JSON.stringify(idlValidation.error.errors));
    }


    return { wallet, connection, program, Idl: IdlMetadataSchema };
}
const IdlSchema = z.object({
    address: z.string(),
    metadata: z.record(z.string()),
    docs: z.array(z.string()).optional(),
    instructions: z.array(z.object({
        name: z.string(),
        accounts: z.array(z.any()), // Vous pouvez ajouter le typage exact ici
        args: z.array(z.any()) // Même cas ici
    })),
    accounts: z.array(z.object({
        name: z.string(),
        type: z.any() // Typage plus précis si possible
    })).optional(),
    events: z.array(z.any()).optional(),
    errors: z.array(z.any()).optional(),
    types: z.array(z.any()).optional(),
    constants: z.array(z.any()).optional(),
});
export type Idl = {
    address: string
    metadata: IdlMetadata
    docs?: string[]
    instructions: IdlInstruction[]
    accounts?: IdlAccount[]
    events?: IdlEvent[]
    errors?: IdlErrorCode[]
    types?: IdlTypeDef[]
    constants?: IdlConst[]
}
// Ajouter un schéma de validation JSON pour s'assurer que l'objet est valide
const ajv = new Ajv();
const idlSchema: JSONSchemaType<Idl> = { anyOf: [], oneOf: [] /* Propriété Idl complète ici */ };

if (!ajv.validate(idlSchema, idl)) {
    throw new Error('Invalid IDL JSON');
}

if (!idl?.metadata) {
    throw new Error('Missing metadata in the given IDL');
}

const idlAddress = (idl.metadata as unknown as AnaheimIdlMetadata & { address?: string })?.address;
if (!idlAddress) {
    throw new Error('Address is missing in IDL metadata');
}


