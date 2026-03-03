import { importLog } from "./importLog";

export interface tableProps {
  log?: importLog[];
}

export interface tableRow {
  book: importLog;
  seriesNumber: number;
  onDelete: (id: string) => void;
  onView: (id: string) => void;
  onEdit: (book: importLog, id: string) => void;
}
