import { useState } from "react";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import "./styles/app.css";

import DeliveryNote from "./components/document/DeliveryNote";
import StockEditor from "./components/form/StockEditor";
import {
  initialDeliveryNoteData,
  type DeliveryNoteData,
} from "./data/deliveryNoteData";

function App() {
  const [deliveryNoteData, setDeliveryNoteData] =
    useState<DeliveryNoteData>(initialDeliveryNoteData);

  const handleDownloadPDF = async () => {
  const element = document.querySelector(
    ".delivery-note"
  ) as HTMLElement | null;

  if (!element) {
    console.error("Delivery note element not found.");
    return;
  }

  const originalHeight = element.style.height;
  const originalMinHeight = element.style.minHeight;
  const originalOverflow = element.style.overflow;

  try {
    element.style.height = "auto";
    element.style.minHeight = "297mm";
    element.style.overflow = "visible";

    // Make sure the browser has finished rendering the latest changes.
    await new Promise((resolve) =>
      requestAnimationFrame(() => resolve(null))
    );

    /*
     * Capture the complete delivery note.
     *
     * We use the same scale that was already giving you
     * good PDF quality.
     */
    const fullCanvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      scrollX: 0,
      scrollY: 0,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
    });

    /*
     * Capture only the existing header.
     *
     * This is the exact header already visible in the preview,
     * including the editable school/institution name.
     */
    const header = element.querySelector(
      ".document-header"
    ) as HTMLElement | null;

    const headerRule = element.querySelector(
      ".document-header-rule"
    ) as HTMLElement | null;

    if (!header || !headerRule) {
      console.error("Delivery note header not found.");
      return;
    }

    /*
     * Calculate the header height in CSS pixels.
     */
    const headerRect = header.getBoundingClientRect();
    const ruleRect = headerRule.getBoundingClientRect();
    const elementRect = element.getBoundingClientRect();

    const headerBottomCssPx =
      Math.max(
        headerRect.bottom,
        ruleRect.bottom
      ) - elementRect.top;

    const canvasScale =
      fullCanvas.width / element.scrollWidth;

    const headerHeightPx = Math.ceil(
      headerBottomCssPx * canvasScale
    );

    /*
     * Convert A4 dimensions into pixels using the same
     * canvas scale.
     */
    const pdfWidthMm = 210;
    const pdfHeightMm = 297;
    const topMarginMm = 10;
    const bottomMarginMm = 10;

    const pdf = new jsPDF({
      unit: "mm",
      format: "a4",
      orientation: "portrait",
      compress: true,
    });

    /*
     * Canvas width corresponds to the complete 210mm page.
     */
    const pageWidthPx = fullCanvas.width;

    /*
     * Convert the A4 height to pixels using the actual
     * canvas-to-page ratio.
     */
    const pageHeightPx =
      fullCanvas.width * (pdfHeightMm / pdfWidthMm);

    const headerHeightMm =
  headerHeightPx /
  (fullCanvas.width / pdfWidthMm);

const bodyPageHeightMm =
  pdfHeightMm -
  topMarginMm -
  headerHeightMm -
  bottomMarginMm;

const bodyPageHeightPx =
  pageHeightPx -
  (
    (topMarginMm +
      headerHeightMm +
      bottomMarginMm) *
    (fullCanvas.width / pdfWidthMm)
  );
    const notesElement = element.querySelector(
  ".document-notes"
) as HTMLElement | null;

const contentEndPx = notesElement
  ? Math.ceil(
      (notesElement.getBoundingClientRect().bottom -
        elementRect.top) *
        canvasScale
    )
  : fullCanvas.height;

    let bodyStartPx = headerHeightPx;

    let pageNumber = 0;

    const tableRows = Array.from(
  element.querySelectorAll(".stock-table tbody tr")
) as HTMLTableRowElement[];
  
    while (bodyStartPx < contentEndPx) {
      /*
       * Determine how much body content fits on this page.
       */
      const remainingHeight =
         contentEndPx - bodyStartPx;

        

      let currentBodyHeightPx = Math.min(
  bodyPageHeightPx,
  remainingHeight
);

/*
 * Do not cut through a product row.
 * If the calculated page boundary falls inside
 * a row, move the boundary upward to the previous
 * completed row.
 */
const proposedEndPx =
  bodyStartPx + currentBodyHeightPx;

/*
 * Only adjust the page boundary when it actually
 * falls INSIDE a product row.
 *
 * If the boundary falls between rows, leave it alone.
 * This prevents short delivery notes from unnecessarily
 * moving signatures/notes to a second page.
 */
const rowContainingBoundary = tableRows.find((row) => {
  const rect = row.getBoundingClientRect();

  const rowTopPx =
    (rect.top - elementRect.top) * canvasScale;

  const rowBottomPx =
    (rect.bottom - elementRect.top) * canvasScale;

  return (
    proposedEndPx > rowTopPx &&
    proposedEndPx < rowBottomPx
  );
});

if (rowContainingBoundary) {
  const rect =
    rowContainingBoundary.getBoundingClientRect();

  const rowTopPx =
    (rect.top - elementRect.top) * canvasScale;

  currentBodyHeightPx =
    rowTopPx - bodyStartPx;
}

      /*
       * Create a canvas containing only this page's body.
       */
      const bodyCanvas =
        document.createElement("canvas");

      bodyCanvas.width = pageWidthPx;
      bodyCanvas.height = currentBodyHeightPx;

      const bodyContext =
        bodyCanvas.getContext("2d");

      if (!bodyContext) {
        throw new Error(
          "Unable to create PDF canvas."
        );
      }

      bodyContext.fillStyle = "#ffffff";
      bodyContext.fillRect(
        0,
        0,
        bodyCanvas.width,
        bodyCanvas.height
      );

      bodyContext.drawImage(
        fullCanvas,
        0,
        bodyStartPx,
        pageWidthPx,
        currentBodyHeightPx,
        0,
        0,
        pageWidthPx,
        currentBodyHeightPx
      );

      /*
       * Header canvas.
       *
       * The first part of the original canvas contains
       * the exact header already rendered by the browser.
       */
      const headerCanvas =
        document.createElement("canvas");

      headerCanvas.width = pageWidthPx;
      headerCanvas.height = headerHeightPx;

      const headerContext =
        headerCanvas.getContext("2d");

      if (!headerContext) {
        throw new Error(
          "Unable to create header canvas."
        );
      }

      headerContext.fillStyle = "#ffffff";
      headerContext.fillRect(
        0,
        0,
        headerCanvas.width,
        headerCanvas.height
      );

      headerContext.drawImage(
        fullCanvas,
        0,
        0,
        pageWidthPx,
        headerHeightPx,
        0,
        0,
        pageWidthPx,
        headerHeightPx
      );

      /*
       * Add a new PDF page after the first page.
       */
      if (pageNumber > 0) {
        pdf.addPage("a4", "portrait");
      }

      /*
       * Add repeated header.
       */
      pdf.addImage(
        headerCanvas.toDataURL("image/png"),
        "PNG",
        0,
        topMarginMm,
        pdfWidthMm,
        headerHeightMm
      );

      /*
       * Add this page's body underneath the header.
       */
      pdf.addImage(
        bodyCanvas.toDataURL("image/jpeg", 1),
        "JPEG",
        0,
        topMarginMm + headerHeightMm,
        pdfWidthMm,
        bodyPageHeightMm *
          (currentBodyHeightPx /
            bodyPageHeightPx)
      );

      bodyStartPx += currentBodyHeightPx;
      pageNumber += 1;
    }

    pdf.save("delivery-note.pdf");
  } catch (error) {
    console.error(
      "Failed to generate delivery note PDF:",
      error
    );
  } finally {
    element.style.height = originalHeight;
    element.style.minHeight = originalMinHeight;
    element.style.overflow = originalOverflow;
  }
};

const handleReset = () => {
  setDeliveryNoteData(initialDeliveryNoteData);
};

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-brand">
          <div className="app-brand-title">Velammal</div>
          <div className="app-brand-subtitle">
            Delivery Note Generator
          </div>
        </div>

        <div>Delivery Note Generator</div>
      </header>

      <main className="app-content">
        <section className="generator-panel">
          <h2>Document Details</h2>

          <div className="form-group">
            <label>Header / Institution Name</label>
            <input
              type="text"
              value={deliveryNoteData.headerSchoolName}
              onChange={(event) =>
                setDeliveryNoteData({
                  ...deliveryNoteData,
                  headerSchoolName: event.target.value,
                })
              }
              placeholder="Enter school / institution name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="dispatchDate">Dispatch Date</label>

            <input
              id="dispatchDate"
              type="text"
              value={deliveryNoteData.dispatchDate}
              onChange={(event) =>
                setDeliveryNoteData({
                  ...deliveryNoteData,
                  dispatchDate: event.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="dispatchedFrom">Dispatched From</label>

            <input
              id="dispatchedFrom"
              type="text"
              value={deliveryNoteData.dispatchedFrom}
              onChange={(event) =>
                setDeliveryNoteData({
                  ...deliveryNoteData,
                  dispatchedFrom: event.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="requisitionRef">Requisition Ref</label>

            <input
              id="requisitionRef"
              type="text"
              value={deliveryNoteData.requisitionRef}
              onChange={(event) =>
                setDeliveryNoteData({
                  ...deliveryNoteData,
                  requisitionRef: event.target.value,
                })
              }
            />
          </div>

          <hr />

          <h3>Consignee / Destination</h3>

          <div className="form-group">
            <label htmlFor="schoolName">School Name</label>

            <input
              id="schoolName"
              type="text"
              value={deliveryNoteData.schoolName}
              onChange={(event) =>
                setDeliveryNoteData({
                  ...deliveryNoteData,
                  schoolName: event.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="campus">Campus</label>

            <input
              id="campus"
              type="text"
              value={deliveryNoteData.campus}
              onChange={(event) =>
                setDeliveryNoteData({
                  ...deliveryNoteData,
                  campus: event.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="contactPerson">Contact Person</label>

            <input
              id="contactPerson"
              type="text"
              value={deliveryNoteData.contactPerson}
              onChange={(event) =>
                setDeliveryNoteData({
                  ...deliveryNoteData,
                  contactPerson: event.target.value,
                })
              }
            />
          </div>

          {deliveryNoteData.categories.map((category, categoryIndex) => {
  const startSerialNo = deliveryNoteData.categories
    .slice(0, categoryIndex)
    .reduce(
      (total, currentCategory) =>
        total + currentCategory.items.length,
      1
    );

  return (
    <StockEditor
      key={category.id}
      title={category.title}
      items={category.items}
      startSerialNo={startSerialNo}

      onChange={(items) => {
        setDeliveryNoteData({
          ...deliveryNoteData,
          categories: deliveryNoteData.categories.map(
            (currentCategory) =>
              currentCategory.id === category.id
                ? {
                    ...currentCategory,
                    items,
                  }
                : currentCategory
          ),
        });
      }}

      onTitleChange={(title) => {
        setDeliveryNoteData({
          ...deliveryNoteData,
          categories: deliveryNoteData.categories.map(
            (currentCategory) =>
              currentCategory.id === category.id
                ? {
                    ...currentCategory,
                    title,
                  }
                : currentCategory
          ),
        });
      }}

      onDeleteCategory={() => {
        setDeliveryNoteData({
          ...deliveryNoteData,
          categories: deliveryNoteData.categories.filter(
            (currentCategory) =>
              currentCategory.id !== category.id
          ),
        });
      }}
    />
  );
})}

<button
  type="button"
  className="add-category-button"
  onClick={() => {
    const newCategory = {
      id: `category-${Date.now()}`,
      title: "New Category",
      items: [],
    };

    setDeliveryNoteData({
      ...deliveryNoteData,
      categories: [
        ...deliveryNoteData.categories,
        newCategory,
      ],
    });
  }}
>
  + Add Category
</button>


          <div className="form-divider" />

          <h3 className="form-section-title">
            Vehicle Details
          </h3>

          <div className="form-group">
            <label htmlFor="vehicleNo">Vehicle No</label>

            <input
              id="vehicleNo"
              type="text"
              value={deliveryNoteData.vehicleNo}
              onChange={(event) =>
                setDeliveryNoteData({
                  ...deliveryNoteData,
                  vehicleNo: event.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="driverName">Driver Name</label>

            <input
              id="driverName"
              type="text"
              value={deliveryNoteData.driverName}
              onChange={(event) =>
                setDeliveryNoteData({
                  ...deliveryNoteData,
                  driverName: event.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label htmlFor="driverContact">Driver Contact</label>

            <input
              id="driverContact"
              type="text"
              value={deliveryNoteData.driverContact}
              onChange={(event) =>
                setDeliveryNoteData({
                  ...deliveryNoteData,
                  driverContact: event.target.value,
                })
              }
            />
          </div>

          <div className="form-divider" />

          <h3 className="form-section-title">
            Notes
          </h3>

          <div className="form-group">
            <label htmlFor="notes">Document Notes</label>

            <textarea
              id="notes"
              value={deliveryNoteData.notes}
              onChange={(event) =>
                setDeliveryNoteData({
                  ...deliveryNoteData,
                  notes: event.target.value,
                })
              }
            />
          </div>

          <hr className="form-divider" />

          <h3 className="form-section-title">
            Signature Details
          </h3>

          <div className="form-group">
            <label>Dispatched By</label>

            <input
              type="text"
              value={deliveryNoteData.dispatchedBy}
              onChange={(event) =>
                setDeliveryNoteData({
                  ...deliveryNoteData,
                  dispatchedBy: event.target.value,
                })
              }
              placeholder="Enter dispatcher name"
            />
          </div>

          <div className="form-group">
            <label>Received By Role</label>
            <input
              type="text"
              value={deliveryNoteData.receivedByRole}
              onChange={(event) =>
                setDeliveryNoteData({
                  ...deliveryNoteData,
                  receivedByRole: event.target.value,
                })
              }
              placeholder="e.g. Admin Officer / VVY School"
            />
          </div>
          
          <div className="form-group">
            <label>Received By</label>

            <input
              type="text"
              value={deliveryNoteData.receivedBy}
              onChange={(event) =>
                setDeliveryNoteData({
                  ...deliveryNoteData,
                  receivedBy: event.target.value,
                })
              }
              placeholder="Enter receiver name"
            />
          </div>

          <button
            type="button"
            className="download-pdf-button"
            onClick={handleDownloadPDF}
          >
            Download PDF
          </button>

        <button
          type="button"
          className="reset-form-button"
          onClick={handleReset}
        >
          Reset Form
        </button>

        </section>

        <section className="preview-panel">
          <DeliveryNote data={deliveryNoteData} />
        </section>
      </main>
    </div>
  );
}

export default App;