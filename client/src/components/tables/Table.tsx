import React from 'react'
import styles from "@/styles/components/table/table.module.scss";
import TableColumn from './TableColumn';
import { tableProps } from "@/types/table";
import TableRow from './TableRow';
import TableEmpty from './TableEmpty';

const Table: React.FC<tableProps> = ({ log }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <TableColumn />
        <tbody>
          {/* {books.length <= 0 ? (
            <TableEmpty />
          ) : (
            books.map((book, index) => (
              <TableRow
                key={book?._id}
                seriesNumber={index + 1}
                book={book}
                onDelete={onDelete}
                onView={onView}
                onEdit={onEdit}
              />
            ))
          )} */}
        </tbody>
      </table>
    </div>
  );
};

export default Table