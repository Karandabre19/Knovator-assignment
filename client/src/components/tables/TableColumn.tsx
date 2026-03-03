import React from 'react'
import styles from "@/styles/components/table/tableColumn.module.scss"


const TableColumn = () => {
  return (
    <thead className={styles.headContainer}>
      <tr>
        <th>Sr no.</th>
        <th>Title</th>
        <th>Author</th>
        <th>Publisher</th>
        <th>Date</th>
        <th>Email</th>
        <th>Age</th>
        <th
          style={{
            textAlign: "center",
          }}
        >
          Actions
        </th>
      </tr>
    </thead>
  );
};

export default TableColumn