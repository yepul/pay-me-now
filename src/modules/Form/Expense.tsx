import { ChangeEvent, FunctionComponent, useMemo } from "react";
import { useFormik } from "formik";
import { useStoreActions } from "../../store/hooks";
import { useRouter } from "next/router";
import { schema } from "./expense-schema";
import { ISetExpenses } from "../../store/model/expense";
import { TextField } from "../../components/TextField";
import { AutoComplete } from "../../components/AutoComplete";
import { IUser } from "../../store/model/user";
import { Button } from "../../components/Button";

export const ExpenseForm: FunctionComponent = () => {
  const router = useRouter();

  const getGroup = useStoreActions((actions) => actions.group.getGroup);
  const users = useMemo(
    () => getGroup(router.query.id as string).users,
    [getGroup, router.query.id]
  );
  const setExpenses = useStoreActions((actions) => actions.expense.setExpenses);
  const formik = useFormik<ISetExpenses>({
    initialValues: {
      name: "",
      users: [],
      groupId: router.query.id as string,

      //@ts-ignore
      total: "",
    },
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: async (values) => {
      setExpenses(values);
      //@ts-ignore
      await router?.replace(
        `/group/${router.query.id}?created=today`,
        `/group/${router.query.id}`,
        {
          shallow: true,
        }
      );
    },
  });

  const handleUser = (event: ChangeEvent<HTMLInputElement>) => {
    formik.setFieldValue(
      "users",
      event.target.checked
        ? [...formik.values.users, event.target.value]
        : formik.values.users.filter((userId) => userId !== event.target.value)
    );
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label="Name"
        errors={formik.errors.name}
        id="name"
        type="text"
        placeholder="Name"
        value={formik.values.name}
        onChange={formik.handleChange}
      />
      <TextField
        label="Total"
        errors={formik.errors.total}
        id="total"
        type="number"
        placeholder="total"
        value={formik.values.total}
        onChange={formik.handleChange}
      />
      <section aria-details="user selection section" className="mb-4">
        <AutoComplete
          onChange={handleUser}
          label="Participant"
          id="users"
          placeholder="participants"
          options={users as IUser[]}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
        />
      </section>
      <Button type="submit">Create Expense</Button>
    </form>
  );
};
