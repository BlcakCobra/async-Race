import { CarModelType } from "./../../types/EngineType";

const CarModel: React.FC<CarModelType> = ({ car, velocity = 0, distance = 0 }) => {
  const transformDistance = distance / 1000;

  return (
    <div
      style={{
        transform: `translateX(${transformDistance}px)`,
        transition: velocity ? `transform ${distance / velocity}s linear` : 'none'
      }}
    >
      <svg width="50" height="25">
        <rect width="50" height="25" fill={car.color} />
      </svg>
    </div>
  );
};

export default CarModel;
