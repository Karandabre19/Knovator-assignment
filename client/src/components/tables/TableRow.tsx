import React from "react";
import styles from "@/styles/components/table/tableRow.module.scss";
import { tableRow } from "@/types/table";
import { Eye, Trash ,Pencil } from "lucide-react";

const TableRow: React.FC<tableRow> = ({ book, onDelete, onEdit, onView , seriesNumber}) => {

      const date = book?.publishedDate
        ? new Date(book?.publishedDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })
        : null;

  return (
    <tr className={styles.rowContainer}>
      <td>{seriesNumber}</td>
      <td>{book.title}</td>
      <td>{book?.author}</td>
      <td>{book?.publisher}</td>
      <td>{date}</td>
      <td>{book?.email}</td>
      <td>{book?.age}</td>
      <td className={styles.buttonContainer}>
        <button onClick={() => onEdit(book, book._id)}>
          <Pencil />
        </button>
        <button onClick={() => onDelete(book._id)}>
          <Trash />
        </button>
        <button onClick={() => onView(book._id)}>
          <Eye />
        </button>
      </td>
    </tr>
  );
};

export default TableRow;