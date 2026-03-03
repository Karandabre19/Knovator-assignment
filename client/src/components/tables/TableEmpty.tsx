import React from "react";
import styles from "@/styles/components/table/tableEmpty.module.scss";
const TableEmpty = () => {
  return (
    <tr className={styles.emptyTableContainer}>
      <td colSpan={8}>Sorry no records Found</td>
    </tr>
  );
};

export default TableEmpty;