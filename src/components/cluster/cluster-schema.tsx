import {
	objectInputType,
	objectOutputType,
	z,
	ZodBoolean,
	ZodNativeEnum,
	ZodObject,
	ZodOptional,
	ZodString,
	ZodTypeAny
} from 'zod';
import { ClusterNetwork } from '../../components/cluster/is-authenticated';

const ClusterNetworkEnum = ClusterNetwork as unknown as Record<string, string>;

export const clusterSchema: ZodObject<{
	name: ZodString;
	endpoint: ZodString;
	network: ZodOptional<ZodNativeEnum<typeof ClusterNetworkEnum>>;
	active: ZodOptional<ZodBoolean>;
	key: ZodString;
	value: ZodString
}, 'strip', ZodTypeAny, objectOutputType<{
	name: ZodString;
	endpoint: ZodString;
	network: ZodOptional<ZodNativeEnum<typeof ClusterNetwork>>;
	active: ZodOptional<ZodBoolean>;
	key: ZodString;
	value: ZodString
}, ZodTypeAny, 'strip'>, objectInputType<{
	name: ZodString;
	endpoint: ZodString;
	network: ZodOptional<ZodNativeEnum<ClusterNetwork>>;
	active: ZodOptional<ZodBoolean>;
	key: ZodString;
	value: ZodString
}, ZodTypeAny, 'strip'>> = z.object({
	name: z.string(),
	endpoint: z.string(),
	network: z.nativeEnum<typeof ClusterNetworkEnum>(ClusterNetworkEnum).optional(),
	active: z.boolean().optional(),
	key: z.string(),
	value: z.string()
});