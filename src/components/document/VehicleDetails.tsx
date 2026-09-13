import type { DeliveryNoteData } from "../../data/deliveryNoteData";

interface VehicleDetailsProps {
  data: DeliveryNoteData;
}

function VehicleDetails({ data }: VehicleDetailsProps) {
  return (
    <div className="vehicle-details">
      <span>
        <strong>Vehicle No:</strong> {data.vehicleNo}
      </span>

      <span className="vehicle-divider">|</span>

      <span>
        <strong>Driver Name:</strong> {data.driverName}
      </span>

      <span className="vehicle-divider">|</span>

      <span>
        <strong>Driver Contact:</strong> {data.driverContact}
      </span>
    </div>
  );
}

export default VehicleDetails;