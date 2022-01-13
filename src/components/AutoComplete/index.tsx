import { ChangeEvent, RefObject, useEffect, useMemo, useState } from "react";
import { ITextField, TextField } from "../TextField";
import { IModal, Modal } from "./Modal.AutoComplete";
import { shift, useFloating } from "@floating-ui/react-dom";
import { useClickAway } from "../../utility/useClickAway";
import { Chip } from "../Chip";
import { useDebounce } from "use-debounce";
import { matchSorter } from "match-sorter";

interface IAutoComplete<T>
  extends ITextField,
    Pick<IModal<T>, "getOptionLabel" | "getOptionValue"> {
  options: T[];
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  filterBy: keyof T & string;
  onCreateNew?: (newOption: string) => void;
}

export const AutoComplete = <T extends object>({
  label,
  errors,
  options,
  onChange,
  filterBy,
  onCreateNew,

  getOptionLabel,
  getOptionValue,
  ...textFieldProps
}: IAutoComplete<T>) => {
  const { x, y, reference, floating, strategy, refs } = useFloating({
    placement: "bottom-start",
    middleware: [shift()],
  });

  const [showModal, setShowModal] = useState(() => false);
  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  useClickAway(() => {
    handleCloseModal();
  }, [refs.reference as RefObject<HTMLElement>]);

  const [userInput, setUserInput] = useState(() => "");
  const [recommendationInput] = useDebounce(userInput, 250);
  const [selections, setSelections] = useState<T[]>(() => []);

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const recommendation = useMemo(() => {
    if (!recommendationInput) {
      return options;
    }

    return matchSorter(options, recommendationInput, { keys: [filterBy] });
  }, [options, filterBy, recommendationInput]);

  const handleOptionChange =
    (selection: T) => (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelections((prevState) => [selection, ...prevState]);
      } else {
        setSelections((prevState) =>
          prevState.filter(
            (prevSelection) =>
              getOptionValue(prevSelection) !== getOptionValue(selection)
          )
        );
      }

      setUserInput("");
      onChange(event);
    };

  const isAllowToCreateNew = useMemo(() => Boolean(onCreateNew), [onCreateNew]);

  const handleAddNew = () => {
    if (onCreateNew && userInput) {
      onCreateNew(userInput);
    }
  };

  return (
    <div ref={reference} className="relative">
      <TextField
        value={userInput}
        onChange={handleChangeInput}
        onFocus={handleShowModal}
        label={label}
        errors={errors}
        inputAdornment={selections.map((selection) => (
          <Chip
            handleDelete={handleOptionChange(selection)}
            key={getOptionValue(selection)}
            value={getOptionValue(selection)}
          >
            {getOptionLabel(selection)}
          </Chip>
        ))}
        {...textFieldProps}
      />

      <Modal
        isAllowToCreateNew={isAllowToCreateNew}
        handleAddNew={handleAddNew}
        options={recommendation}
        selections={selections}
        show={showModal}
        modalStyle={{
          left: x ?? undefined,
          top: y ?? undefined,
          position: strategy,
        }}
        modalRef={floating}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        handleOptionChange={handleOptionChange}
      />
    </div>
  );
};
