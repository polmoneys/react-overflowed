import * as React from 'react';
import { useDrag } from 'react-use-gesture';
import { animated, useSpring } from 'react-spring';
import { OverflowedProps } from './Overflowed.types';
import { useRect } from '@reach/rect';

import './Overflowed.scss';

const Overflowed = (props: OverflowedProps) => {
    const { className = undefined, maskClassName = undefined, children, controls = false, progressBar = false, overflowedWidth } = props;
    const maskRef = React.useRef<HTMLDivElement | null>(null);
    const [observe, _setObserve] = React.useState(true); // TODO: v1
    const rect = useRect(maskRef, { observe });
    const progressRef = React.useRef<HTMLDivElement | null>(null);

    const [{ x }, set] = useSpring(() => ({
        x: 0,
    }));
    const bind = useDrag(({ movement: [mx], delta: [dx], tap }) => moveViewportContainer({ tap, mx }), {
        initial: () => [x?.getValue() ?? 0, 0], // use current progress as next drag initial value
        bounds: { left: -overflowedWidth + (rect ? rect?.width : 0), right: 0 }, // it should drag until it reaches it's width
        rubberband: 0.2,
    });
    const moveViewportContainer = (props: { down?: boolean; tap: boolean; mx: number }) => {
        const { tap, mx } = props;
        if (tap) return;
        if (rect && rect?.width >= overflowedWidth) {
            // if parent has enough room we should cancel drags, just in case reset progress to initial
            return set({ x: 0 });
        } else {
            set({ x: mx });
            if (progressBar) {
                window.requestAnimationFrame(() => {
                    progressRef.current!.style.width = `${getProgress()!.toFixed(0)}%`;
                });
            }
        }
    };

    const getProgress = () => (Math.abs(x.getValue() as number) / (overflowedWidth - (rect ? rect?.width : 0))) * 100;
    const setProgres = (amount: number) => {
        set({ x: amount });
        if (progressBar) {
            window.requestAnimationFrame(() => {
                progressRef.current!.style.width = `${(Math.abs(amount / (overflowedWidth - (rect ? rect?.width : 0))) * 100).toFixed(0)}%`;
            });
        }
    };
    const maskClassNames = ['overflowed-container', maskClassName].filter(Boolean).join(' ');
    const viewportmaskClassNames = ['overflowed-viewport', className, rect && rect?.width >= overflowedWidth && 'overflowed-idle'].filter(Boolean).join(' ');
    return (
        <div className={maskClassNames} ref={maskRef}>
            <animated.div
                className={viewportmaskClassNames}
                {...bind()}
                style={{
                    transform: x && x.interpolate((x) => `translate3d(${x}px,0,0)`),
                    touchAction: 'pan-y',
                    width: `${overflowedWidth}px`,
                }}
            >
                {children}
            </animated.div>

            {controls &&
                controls({
                    setProgres,
                    getProgress,
                })}
            {progressBar && rect && rect?.width < overflowedWidth && (
                <div className="overflowed-progress" aria-hidden="true">
                    {/*  TODO: v1  */}
                    <div className="overflowed-bar" ref={progressRef}></div>
                </div>
            )}
        </div>
    );
};
export default Overflowed;
