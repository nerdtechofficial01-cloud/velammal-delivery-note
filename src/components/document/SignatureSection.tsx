import type { DeliveryNoteData } from "../../data/deliveryNoteData";

interface SignatureSectionProps {
  data: DeliveryNoteData;
}

function SignatureSection({ data }: SignatureSectionProps) {
  return (
    <section className="signature-section">

      <div className="signature-box">
        <div className="signature-title">
          DISPATCHED BY
        </div>

        <div className="signature-role">
          Purchase Dept. In-Charge
        </div>

        <div className="signature-line" />

        <div className="signature-label">
          {data.dispatchedBy || "Name & Signature"}
        </div>
      </div>

      <div className="signature-box">
        <div className="signature-title">
          TRANSPORTER / DRIVER
        </div>

        <div className="signature-role">
          Acknowledgment of Receipt
        </div>

        <div className="signature-line" />

        <div className="signature-label">
          {data.driverName || "Signature & Date"}
        </div>
      </div>

      <div className="signature-box">
        <div className="signature-title">
          RECEIVED BY
        </div>

        <div className="signature-role">
          {data.receivedByRole || "Admin Officer / VVY School"}
        </div>

        <div className="signature-line" />

        <div className="signature-label">
          {data.receivedBy || "Signature, Date & Seal"}
        </div>
      </div>

    </section>
  );
}

export default SignatureSection;