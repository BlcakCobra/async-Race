import React, { useEffect, useState, useRef, JSX } from 'react';

import { setEnd, setStart } from './../../../store/Slices/EngineControlSlice';
import { useAppDispatch, useAppSelector } from './../../../store/store';
import { CarModelType } from './../../../types/EngineType';
import styles from './CarModel.module.scss';
import SvgCar from './SvgCar/SvgCar';

const CarModel: React.FC<CarModelType> = ({
  car,
  velocity = 0,
}): JSX.Element => {
  const trackRef = useRef<HTMLDivElement>(null);
  const carRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<number>(0);
  const [trackWidth, setTrackWidth] = useState<number>(0);
  const dispatch = useAppDispatch();
  const carWidth = 170;

  const engineData = useAppSelector((state) => state.EngineSlice.engineData);
  const start = engineData[car.id]?.start ?? null;

  // Инициализация ширины трека
  useEffect((): void => {
    if (trackRef.current) {
      setTrackWidth(trackRef.current.offsetWidth);
    }
  }, []);

  useEffect((): void => {
    if (velocity > 0 && trackWidth > 0) {
      const travelDistance = trackWidth - carWidth;
      dispatch(setStart({ id: car.id, time: performance.now() }));
      setPosition(travelDistance);
    }
  }, [velocity, trackWidth, car.id, dispatch]);

  useEffect((): (() => void) => {
    const el = carRef.current;
    if (!el || start === null) return () => {};

    const handleTransitionEnd = (): void => {
      const endTime = performance.now();
      dispatch(setEnd({ id: car.id, time: endTime }));
    };

    el.addEventListener('transitionend', handleTransitionEnd);
    return () => el.removeEventListener('transitionend', handleTransitionEnd);
  }, [start, car.id, dispatch]);

  return (
    <div ref={trackRef} className={styles.track}>
      <div
        ref={carRef}
        className={styles.car}
        style={{
          transform: `translateX(${position}px) rotate(90deg)`,
          transition:
            velocity > 0 ? `transform ${position / velocity}s linear` : 'none',
        }}
      >
        <SvgCar color={car.color} />
      </div>
    </div>
  );
};

export default CarModel;
