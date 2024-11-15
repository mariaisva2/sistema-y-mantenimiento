import TableDataHead from "@/ui/atoms/Th";
import TableDataRow from "@/ui/atoms/Tr";
import styles from "./TableHeaderRow.module.scss"
const TableHeaderRow: React.FC = () => {
    return (
      <thead>
        <TableDataRow classname={styles.tr}>
          <TableDataHead classname={styles.th}>Foto</TableDataHead>
          <TableDataHead classname={styles.th}>Marca</TableDataHead>
          <TableDataHead classname={styles.th}>Modelo</TableDataHead>
          <TableDataHead classname={styles.th}>Año</TableDataHead>
          <TableDataHead classname={styles.th}>Placa</TableDataHead>
          <TableDataHead classname={styles.th}>Acciones</TableDataHead>
        </TableDataRow>
      </thead>
    );
  };
  
  export default TableHeaderRow;