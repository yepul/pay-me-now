import { FunctionComponent } from "react";
import { Container } from "../../../src/components/Container";
import { ExpenseForm } from "../../../src/modules/Form/Expense";
import { Title } from "../../../src/components/Title";

const AddExpense: FunctionComponent = () => {
  return (
    <Container>
      <div className="mt-20 mb-8">
        <Title> Add Expense</Title>
      </div>
      <ExpenseForm />
    </Container>
  );
};

export default AddExpense;
