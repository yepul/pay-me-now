import { FunctionComponent } from "react";
import { Container } from "../../../src/components/Container";
import { ExpenseForm } from "../../../src/modules/Form/Expense";

const AddExpense: FunctionComponent = () => {
  return (
    <Container>
      <h1 className="mt-20 mb-8 text-2xl font-extrabold text-gray-800 md:max-w-4xl sm:text-3xl">
        Add Expense
      </h1>
      <ExpenseForm />
    </Container>
  );
};

export default AddExpense;
