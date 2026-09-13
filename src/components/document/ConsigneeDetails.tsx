import type { DeliveryNoteData } from "../../data/deliveryNoteData";

interface ConsigneeDetailsProps {
  data: DeliveryNoteData;
}

function ConsigneeDetails({ data }: ConsigneeDetailsProps) {
  return (
    <section className="info-box">
      <div className="info-box-title">CONSIGNEE / DESTINATION</div>

      <div className="info-row">
        <span className="info-label">School Name:</span>
        <span className="info-value">{data.schoolName}</span>
      </div>

      <div className="info-row">
        <span className="info-label">Campus:</span>
        <span className="info-value">{data.campus}</span>
      </div>

      <div className="info-row">
        <span className="info-label">Contact Person:</span>
        <span className="info-value">{data.contactPerson}</span>
      </div>
    </section>
  );
}

export default ConsigneeDetails;