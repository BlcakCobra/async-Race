import { useAppDispatch, useAppSelector } from "./../../../store/store";
import styles from "./CarModel.module.scss";
import { CarModelType } from './../../../types/EngineType';
import React, { useEffect, useState, useRef } from 'react';
import { setEnd, setStart } from "./../../../store/Slices/EngineControlSlice";

const CarModel: React.FC<CarModelType> = ({ car, velocity = 0 }) => {
    const trackRef = useRef<HTMLDivElement>(null);
    const carRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(0);
    const [trackWidth, setTrackWidth] = useState(0);

    const dispatch = useAppDispatch();
    const carWidth = 120;

    const engineData = useAppSelector(state => state.EngineSlice.engineData);

    const start = engineData[car.id]?.start ?? null;

    useEffect(() => {
        if (trackRef.current) {
            setTrackWidth(trackRef.current.offsetWidth);
        }
    }, []);

    useEffect(() => {
        if (velocity > 0 && trackWidth > 0) {
            const travelDistance = trackWidth - carWidth;
            dispatch(setStart({ id: car.id, time: performance.now() }));
            setPosition(travelDistance);
        }
    }, [velocity, trackWidth, car.id]);

    useEffect(() => {
        const el = carRef.current;
        if (!el || start === null) return;

        const handleTransitionEnd = () => {
            const endTime = performance.now();
            dispatch(setEnd({ id: car.id, time: endTime }));
        };

        el.addEventListener('transitionend', handleTransitionEnd);
        return () => el.removeEventListener('transitionend', handleTransitionEnd);
    }, [start, car.id]);

    console.log(engineData);

    return (
        <div ref={trackRef} className={styles.track}>
            <div
                ref={carRef}
                className={styles.car}
                style={{
                    transform: `translateX(${position}px) rotate(90deg)`,
                    transition: velocity > 0 ? `transform ${position / velocity}s linear` : 'none',
                    color: car.color,
                }}
            >
                <svg
                    width="120"
                    height="120"
                    viewBox="0 0 300 600"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect x="60" y="100" width="180" height="400" rx="40" ry="40" fill="currentColor" stroke="#333" strokeWidth="4" />
                    <rect x="90" y="200" width="120" height="80" rx="250" ry="10" fill="#ccc" stroke="#666" strokeWidth="2" />
                    <rect x="90" y="330" width="120" height="80" rx="250" ry="10" fill="#ccc" stroke="#666" strokeWidth="2" />
                    <circle cx="80" cy="110" r="10" fill="#ff0" stroke="#aaa" strokeWidth="1" />
                    <circle cx="220" cy="110" r="10" fill="#ff0" stroke="#aaa" strokeWidth="1" />
                    <circle cx="80" cy="490" r="10" fill="#f00" stroke="#aaa" strokeWidth="1" />
                    <circle cx="220" cy="490" r="10" fill="#f00" stroke="#aaa" strokeWidth="1" />
                    <circle cx="60" cy="160" r="15" fill="#222" />
                    <circle cx="240" cy="160" r="15" fill="#222" />
                    <circle cx="60" cy="440" r="15" fill="#222" />
                    <circle cx="240" cy="440" r="15" fill="#222" />
                    <line x1="150" y1="100" x2="150" y2="500" stroke="#444" strokeWidth="2" strokeDasharray="6 4" />
                </svg>
            </div>
        </div>
    );
};

export default CarModel;
