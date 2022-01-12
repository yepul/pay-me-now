import { useConvertToCurrency } from "../../utility/useConvertToCurrency";
import React from "react";

interface ITotalSummary {
  header: string;
  total: number;
  style?: React.CSSProperties;
}

export function TotalSummary({ header, total, style }: ITotalSummary) {
  const totalInCurrency = useConvertToCurrency(total);
  return (
    <div className="text-md flex flex-col font-medium">
      <div className="flex justify-center text-gray-700 font-light">
        {header}
      </div>
      <div
        style={style}
        className="flex justify-center text-gray-800 font-medium"
      >
        {totalInCurrency}
      </div>
    </div>
  );
}
