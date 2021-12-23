import { ChangeEvent, FunctionComponent } from "react";
import { UserSelection } from "./UserSelection";
import { useFormik } from "formik";
import { IGroup } from "../../store/model/group";
import { useStoreActions } from "../../store/hooks";
import * as yup from "yup";
import { useRouter } from "next/router";

const schema = yup.object().shape({
  name: yup
    .string()
    .required("group name in required")
    .max(40, "group name exceed 40 characters"),
  users: yup
    .array()
    .min(1, "participant is required")
    .required("participant is required"),
});

export const GroupForm: FunctionComponent = () => {
  const router = useRouter();
  const setGroup = useStoreActions((actions) => actions.group.setGroups);
  const formik = useFormik<Omit<IGroup, "id">>({
    initialValues: {
      name: "",
      users: [],
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const result = setGroup(values);
      //@ts-ignore
      router?.replace(`/group/${result.payload.id}?created=today`);
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
      <section className="mb-4" aria-details="group name section">
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="name"
        >
          Name
        </label>
        <input
          className="w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
          id="name"
          type="text"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.errors.name && (
          <span className="text-sm text-red-400">{formik.errors.name}</span>
        )}
      </section>
      <section aria-details="user selection section">
        <UserSelection users={formik.values.users} handleUser={handleUser} />
        {formik.errors.users && (
          <span className="text-sm text-red-400">{formik.errors.users}</span>
        )}
      </section>
      <button
        type="submit"
        className="bg-indigo-400 text-indigo-900 text-green-900 pt-2 px-4 rounded-md shadow-md"
      >
        Create Group
      </button>
    </form>
  );
};
