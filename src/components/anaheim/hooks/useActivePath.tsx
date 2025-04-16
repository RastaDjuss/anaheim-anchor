// src/hooks/useActivePath.ts
import { usePathname } from 'next/navigation';

export function useActivePath(targetPath: string): boolean {
	const pathname = usePathname();
	return pathname.startsWith(targetPath);
}