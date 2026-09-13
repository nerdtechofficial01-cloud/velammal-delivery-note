import type { DeliveryNoteData } from "../../data/deliveryNoteData";

interface DispatchDetailsProps {
  data: DeliveryNoteData;
}

function DispatchDetails({ data }: DispatchDetailsProps) {
  return (
    <section className="info-box">
      <div className="info-box-title">DISPATCH DETAILS</div>

      <div className="info-row">
        <span className="info-label">Dispatch Date:</span>
        <span className="info-value">{data.dispatchDate}</span>
      </div>

      <div className="info-row">
        <span className="info-label">Dispatched From:</span>
        <span className="info-value">{data.dispatchedFrom}</span>
      </div>

      <div className="info-row">
        <span className="info-label">Requisition Ref:</span>
        <span className="info-value">{data.requisitionRef}</span>
      </div>
    </section>
  );
}

export default DispatchDetails;