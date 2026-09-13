import type { DeliveryItem } from "../../data/deliveryNoteData";

interface StockEditorProps {
  title: string;
  items: DeliveryItem[];
  onChange: (items: DeliveryItem[]) => void;
  onTitleChange: (title: string) => void;
  onDeleteCategory: () => void;
  startSerialNo: number;
}

function StockEditor({
  title,
  items,
  onChange,
  onTitleChange,
  onDeleteCategory,
  startSerialNo,
}: StockEditorProps) {
  const updateItem = (
    id: string,
    field: keyof DeliveryItem,
    value: string
  ) => {
    const updatedItems = items.map((item) =>
      item.id === id
        ? { ...item, [field]: value }
        : item
    );

    onChange(updatedItems);
  };

  const addItem = () => {
    const newItem: DeliveryItem = {
      id: `item-${Date.now()}`,
      description: "",
      quantitySent: "",
      quantityReceived: "",
    };

    onChange([...items, newItem]);
  };

  const removeItem = (id: string) => {
    const updatedItems = items.filter(
      (item) => item.id !== id
    );

    onChange(updatedItems);
  };

  return (
    <div className="stock-editor">

      <div className="stock-editor-category-header">

        <div className="form-group category-name-group">
          <label>Category Name</label>

          <input
            type="text"
            value={title}
            onChange={(event) =>
              onTitleChange(event.target.value)
            }
          />
        </div>

        <button
          type="button"
          className="remove-category-button"
          onClick={() => {
            const confirmed = window.confirm(
              `Delete the category "${title}" and all its items?`
            );

            if (confirmed) {
              onDeleteCategory();
            }
          }}
        >
          Delete Category
        </button>

      </div>


      {items.map((item, index) => (
        <div
          className="stock-editor-item"
          key={item.id}
        >

          <div className="stock-editor-item-header">

            <div className="stock-editor-item-number">
              #{startSerialNo + index}
            </div>

            <button
              type="button"
              className="remove-item-button"
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>

          </div>


          <div className="form-group">

            <label>Item Description</label>

            <input
              type="text"
              value={item.description}
              onChange={(event) =>
                updateItem(
                  item.id,
                  "description",
                  event.target.value
                )
              }
            />

          </div>


          <div className="stock-editor-row">

            <div className="form-group">

              <label>Qty Sent</label>

              <input
                type="text"
                value={item.quantitySent}
                onChange={(event) =>
                  updateItem(
                    item.id,
                    "quantitySent",
                    event.target.value
                  )
                }
              />

            </div>


            <div className="form-group">

              <label>Qty Received</label>

              <input
                type="text"
                value={item.quantityReceived}
                onChange={(event) =>
                  updateItem(
                    item.id,
                    "quantityReceived",
                    event.target.value
                  )
                }
              />

            </div>

          </div>

        </div>
      ))}


      <button
        type="button"
        className="add-item-button"
        onClick={addItem}
      >
        + Add Item
      </button>

    </div>
  );
}

export default StockEditor;