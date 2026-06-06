import React, { createContext, useContext, useState, ReactNode } from "react";

interface TableContextType {
  tableNumber: string | null;
  setTableNumber: (n: string) => void;
  clearTable: () => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export function TableProvider({ children }: { children: ReactNode }) {
  const [tableNumber, setTableNumberState] = useState<string | null>(() => {
    try { return sessionStorage.getItem("wonder_table") || null; } catch { return null; }
  });

  const setTableNumber = (n: string) => {
    try { sessionStorage.setItem("wonder_table", n); } catch {}
    setTableNumberState(n);
  };

  const clearTable = () => {
    try { sessionStorage.removeItem("wonder_table"); } catch {}
    setTableNumberState(null);
  };

  return (
    <TableContext.Provider value={{ tableNumber, setTableNumber, clearTable }}>
      {children}
    </TableContext.Provider>
  );
}

export function useTable() {
  const ctx = useContext(TableContext);
  if (!ctx) throw new Error("useTable must be used within TableProvider");
  return ctx;
}
