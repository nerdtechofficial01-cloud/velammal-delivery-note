interface DocumentNotesProps {
  notes: string;
}

function DocumentNotes({ notes }: DocumentNotesProps) {
  return (
    <div className="document-notes">
      <strong>Notes:</strong>{" "}
      {notes}
    </div>
  );
}

export default DocumentNotes;