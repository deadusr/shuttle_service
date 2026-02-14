import type { SVGProps, FC } from 'react';

export type ChevronCircleDirection = 'up' | 'down' | 'left' | 'right';

const rotationMap: Record<ChevronCircleDirection, number> = {
    down: 0,
    left: 90,
    up: 180,
    right: 270,
};

interface ChevronCircleIconProps extends SVGProps<SVGSVGElement> {
    direction?: ChevronCircleDirection;
}

const ChevronCircleIcon: FC<ChevronCircleIconProps> = ({ direction = 'down', className, style, ...props }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        style={{ ...style, transform: `rotate(${rotationMap[direction]}deg)`, ...(style || {}) }}
        {...props}
    >
        <path d="M12,2 C17.5228475,2 22,6.4771525 22,12 C22,17.5228475 17.5228475,22 12,22 C6.4771525,22 2,17.5228475 2,12 C2,6.4771525 6.4771525,2 12,2 Z M7.46966991,9.96966991 C7.1767767,10.2625631 7.1767767,10.7374369 7.46966991,11.0303301 L11.4696699,15.0303301 C11.7625631,15.3232233 12.2374369,15.3232233 12.5303301,15.0303301 L16.5303301,11.0303301 C16.8232233,10.7374369 16.8232233,10.2625631 16.5303301,9.96966991 C16.2374369,9.6767767 15.7625631,9.6767767 15.4696699,9.96966991 L12,13.4393398 L8.53033009,9.96966991 C8.23743687,9.6767767 7.76256313,9.6767767 7.46966991,9.96966991 Z" fill="currentColor" fillRule="nonzero" />
    </svg>
);

export default ChevronCircleIcon;
