import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
	className?: string;
}

export const CardItemSkeleton: React.FC<Props> = ({ className }) => {
	return (
		<div className={cn('w-[280px] flex flex-col items-center gap-5', className)}>
			<div className="flex flex-col items-center gap-4 w-full">
				<div className="h-[20px] w-1/2 bg-gray-200 animate-pulse" />
				<div className="h-[20px] w-1/2 bg-gray-200 animate-pulse" />
				<div className="h-[20px] w-1/2 bg-gray-200 animate-pulse" />
			</div>
			<div className="h-[325px] w-full bg-gray-200 rounded-2xl animate-pulse" />
		</div>
	);
};
