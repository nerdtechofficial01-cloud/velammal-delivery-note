export interface DeliveryItem {
  id: string;
  description: string;
  quantitySent: string;
  quantityReceived: string;
}

export interface DeliveryCategory {
  id: string;
  title: string;
  items: DeliveryItem[];
}

export interface DeliveryNoteData {
  headerSchoolName: string;

  dispatchDate: string;
  dispatchedFrom: string;
  requisitionRef: string;

  schoolName: string;
  campus: string;
  contactPerson: string;

  categories: DeliveryCategory[];

  vehicleNo: string;
  driverName: string;
  driverContact: string;

  notes: string;

  dispatchedBy: string;
  receivedBy: string;
}

export const initialDeliveryNoteData: DeliveryNoteData = {
  headerSchoolName: "VELAMMAL GROUP OF SCHOOLS",

  dispatchDate: "11-Aug-2026",
  dispatchedFrom: "Purchase Dept / Main Store",
  requisitionRef: "REQ/VVY/2026-27/042",

  schoolName: "Velammal Vidyalaya",
  campus: "Yelahanka, Bangalore",
  contactPerson: "Admin Officer (8637657141)",

  categories: [
  {
    id: "category-1",
    title: "Furniture & Infrastructure",
    items: [
      {
        id: "item-1",
        description: "Plastic Chair",
        quantitySent: "100 Nos",
        quantityReceived: "",
      },
      {
        id: "item-2",
        description: "Future Skill Lab Table",
        quantitySent: "6 Nos",
        quantityReceived: "",
      },
      {
        id: "item-3",
        description: "Future Skill Lab Cushion Chair",
        quantitySent: "20 Nos",
        quantityReceived: "",
      },
      {
        id: "item-4",
        description: "Barricade",
        quantitySent: "11 Nos",
        quantityReceived: "",
      },
      {
        id: "item-5",
        description: "Ladder",
        quantitySent: "1 No",
        quantityReceived: "",
      },
      {
        id: "item-6",
        description: "Wheelchair",
        quantitySent: "1 No",
        quantityReceived: "",
      },
    ],
  },

  {
    id: "category-2",
    title: "Maintenance, Safety & IT / Tools",
    items: [
      {
        id: "item-7",
        description: "Dustbin (Standard)",
        quantitySent: "10 Nos",
        quantityReceived: "",
      },
      {
        id: "item-8",
        description: "Twin Dustbin",
        quantitySent: "1 No",
        quantityReceived: "",
      },
      {
        id: "item-9",
        description: "Electricity Tool Box",
        quantitySent: "1 Box",
        quantityReceived: "",
      },
      {
        id: "item-10",
        description: "Safety Shoes (Size 8)",
        quantitySent: "1 Set",
        quantityReceived: "",
      },
      {
        id: "item-11",
        description: "24-Port PoE Switch",
        quantitySent: "1 No",
        quantityReceived: "",
      },
      {
        id: "item-12",
        description: "Monitor",
        quantitySent: "1 No",
        quantityReceived: "",
      },
      {
        id: "item-13",
        description: "Clamp",
        quantitySent: "1 Pkt",
        quantityReceived: "",
      },
    ],
  },

  {
    id: "category-3",
    title: "Academic & Stationery",
    items: [
      {
        id: "item-14",
        description: "A4 Paper",
        quantitySent: "20 Reams",
        quantityReceived: "",
      },
      {
        id: "item-15",
        description: "KG Activity Materials",
        quantitySent: "1 Lot",
        quantityReceived: "",
      },
      {
        id: "item-16",
        description: "KGTT Materials",
        quantitySent: "1 Lot",
        quantityReceived: "",
      },
    ],
  },

  {
    id: "category-4",
    title: "Events, Flags & Awards",
    items: [
      {
        id: "item-17",
        description: "Medals",
        quantitySent: "1 Lot",
        quantityReceived: "",
      },
      {
        id: "item-18",
        description: "Trophies",
        quantitySent: "1 Lot",
        quantityReceived: "",
      },
      {
        id: "item-19",
        description: "Sports Day Certificates",
        quantitySent: "1 Lot",
        quantityReceived: "",
      },
      {
        id: "item-20",
        description: "Chalk Piece",
        quantitySent: "1 Big Box (16 Small Boxes)",
        quantityReceived: "",
      },
      {
        id: "item-21",
        description: "Memento",
        quantitySent: "A-10, B-10, C-10",
        quantityReceived: "",
      },
      {
        id: "item-22",
        description: "House Flag (Four Groups)",
        quantitySent: "4 Nos",
        quantityReceived: "",
      },
    ],
  },
],

  vehicleNo: "KA 02 AH 9853",
  driverName: "M Selvam",
  driverContact: "9066745525",

  notes:
  "Please verify all quantities and physical condition of goods upon arrival. Any discrepancy or damage must be noted on this delivery note and reported immediately to the Purchase Department within 24 hours.",
  dispatchedBy: "",
  receivedBy: "",
};