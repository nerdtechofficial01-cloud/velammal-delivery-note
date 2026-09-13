import type { DeliveryItem } from "../../data/deliveryNoteData";

interface StockSectionProps {
  title: string;
  items: DeliveryItem[];
  startSerialNo: number;
}

function StockSection({
  title,
  items,
  startSerialNo,
}: StockSectionProps) {
  return (
    <section className="stock-section">
      <div className="stock-section-title">
        {title}
      </div>

      <table className="stock-table">
        <thead>
          <tr>
            <th className="col-serial">S.No.</th>
            <th className="col-description">
              Description
            </th>
            <th className="col-quantity">
              Qty Sent
            </th>
            <th className="col-quantity">
              Qty Received
            </th>
          </tr>
        </thead>

        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td className="col-serial">
                {startSerialNo + index}
              </td>

              <td className="col-description">
                {item.description}
              </td>

              <td className="col-quantity">
                {item.quantitySent}
              </td>

              <td className="col-quantity">
                {item.quantityReceived}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default StockSection;