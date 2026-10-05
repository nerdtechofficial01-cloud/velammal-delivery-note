import "../../styles/document.css";
import DispatchDetails from "./DispatchDetails";
import ConsigneeDetails from "./ConsigneeDetails";
import StockSection from "./StockSection";
import VehicleDetails from "./VehicleDetails";
import SignatureSection from "./SignatureSection";
import DocumentNotes from "./DocumentNotes";
import type { DeliveryNoteData } from "../../data/deliveryNoteData";
import logo from "../../assets/logo.png";

function DeliveryNote({ data }: { data: DeliveryNoteData }) {
  return (
    <article className="delivery-note">

      {/* ================= HEADER ================= */}

      <header className="document-header">
        <div className="document-header-left">
          <img
            src={logo}
            alt="Velammal Nexus"
            className="document-logo"
          />

          <div className="document-header-text">
            <div className="school-title">
              {data.headerSchoolName || "VELAMMAL GROUP OF SCHOOLS"}
            </div>

            <div className="department-title">
              PURCHASE DEPARTMENT
            </div>

            <div className="office-title">
              Head Office / Main Store Dispatch Unit
            </div>
          </div>
        </div>

        <div className="document-header-right">
          <div className="document-label">
            DELIVERY NOTE
          </div>

          <div className="document-subtitle">
            MATERIALS DISPATCH CHALLAN
          </div>
        </div>
      </header>

      <div className="document-header-rule" />

      {/* ================= DETAILS ================= */}

      <div className="document-info-grid">
        <DispatchDetails data={data} />
        <ConsigneeDetails data={data} />
      </div>

      {data.categories.map((category, categoryIndex) => {
  const startSerialNo = data.categories
    .slice(0, categoryIndex)
    .reduce(
      (total, currentCategory) =>
        total + currentCategory.items.length,
      1
    );

  return (
    <StockSection
      key={category.id}
      title={`${categoryIndex + 1}. ${category.title.toUpperCase()}`}
      items={category.items}
      startSerialNo={startSerialNo}
    />
  );
})}

        <VehicleDetails data={data} />
        <SignatureSection data={data} />
        <DocumentNotes notes={data.notes} />
    </article>
  );
}

export default DeliveryNote;