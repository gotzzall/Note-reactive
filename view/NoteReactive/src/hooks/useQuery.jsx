import { useLocalStorage } from "@uidotdev/usehooks";
import { useMemo } from "react";

export const useQuery = ({ collection, where }) => {
  const [table] = useLocalStorage(collection);

  const result = useMemo(() => {
    switch (where?.op) {
      case "==":
        return table?.filter((item) => item[where.field] === where.value);
      case "contains":
        return table?.filter((item) =>
          item[where.field].toLowerCase().includes(where.value.toLowerCase()),
        );
      default:
        return table || [];
    }
  }, [table, where]);

  return result;
};
