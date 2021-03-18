/// <reference types="react" />
interface RenderProp<TChildrenProps, TElement = any> {
    (props: TChildrenProps): React.ReactElement<TElement>;
}
export interface OverflowedProps {
    children: ((...args: any[]) => React.ReactElement | null) | React.ReactNode | React.ReactElement | Element | null;
    /** Style the immediate parent of **children** aka. 'overflowedContainer' */
    className?: string;
    /** Style the outer wrapper that hides any overflow*/
    maskClassName?: string;
    /** Control/monitor X progress from the outside */
    controls?: RenderProp<{
        setProgres: (x: number) => void;
        getProgress?: () => void;
    }>;
    /** TODO: v1 */
    progressBar?: boolean;
    /** Estimated width of 'overflowedContainer'*/
    overflowedWidth: number;
}
export {};
