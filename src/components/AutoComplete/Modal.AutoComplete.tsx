import { ChangeEvent, CSSProperties, Ref, useMemo } from "react";

export interface IModal<T> {
  selections: T[];
  options: T[];
  show: boolean;
  modalStyle: CSSProperties;
  modalRef: Ref<HTMLDivElement>;

  getOptionLabel: (option: T) => string;
  getOptionValue: (option: T) => string;
  handleOptionChange: (
    selection: T
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Modal = <T extends object>({
  options,
  show,
  modalStyle,
  modalRef,
  getOptionLabel,
  getOptionValue,
  handleOptionChange,
  selections,
}: IModal<T>) => {
  if (!show) {
    return null;
  }

  const selectionValue = useMemo(
    () => selections.map((selection) => getOptionValue(selection)),
    [selections, getOptionValue]
  );

  return (
    <div
      id="modal"
      className="py-2 mt-1 border-gray-50 bg-white border-2 rounded-lg shadow-md w-full"
      style={modalStyle}
      ref={modalRef}
    >
      {options.map((option) => (
        <label
          key={getOptionValue(option)}
          className="flex items-center py-2 pl-3"
        >
          <input
            type="checkbox"
            checked={selectionValue.includes(getOptionValue(option))}
            className="w-4 h-4 align-middle mx-1 border-2"
            value={getOptionValue(option)}
            onChange={handleOptionChange(option)}
          />
          {getOptionLabel(option)}
        </label>
      ))}
    </div>
  );
};
