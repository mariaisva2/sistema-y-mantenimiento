import TableDataCell from "@/ui/atoms/Td";
import TableDataRow from "@/ui/atoms/Tr";
import styles from "./TableDataRow.module.scss";
import ActionButtons from "../../ButtonsCard/ButtonsCard";

interface TableRowProps {
    photo: string | null;
    make: string;
    model: string;
    year: number;
    licensePlate: string;
    onEdit: () => void;
    onDelete: () => void;
}

const TableRow: React.FC<TableRowProps> = ({ photo, make, model, year, licensePlate, onEdit, onDelete})  => {
    return (
        <TableDataRow classname={styles.tr}>
            <TableDataCell classname={styles.td}>
    {photo ? (
        <img src={photo} alt="Vehicle photo" width="100" height="100" className={styles.photo} />
    ) : (
        "No Image"
    )}
</TableDataCell>
            <TableDataCell classname={styles.td}>{make}</TableDataCell>
            <TableDataCell classname={styles.td}>{model}</TableDataCell>
            <TableDataCell classname={styles.td}>{year}</TableDataCell>
            <TableDataCell classname={styles.td}>{licensePlate}</TableDataCell>
            <TableDataCell classname={styles.td}><ActionButtons onEdit={onEdit} onDelete={onDelete}/></TableDataCell> 
        </TableDataRow>
    );
}

export default TableRow;