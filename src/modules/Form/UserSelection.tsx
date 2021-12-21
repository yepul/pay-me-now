import { useStoreActions, useStoreState } from "../../store/hooks";
import { ChangeEvent, useMemo, useState } from "react";
import { useFormik } from "formik";
import { schema } from "./schema";
import { matchSorter } from "match-sorter";

export const UserSelection = () => {
  const users = useStoreState((state) => state.user.users);
  const setUsers = useStoreActions((actions) => actions.user.setUsers);

  const formik = useFormik<{ name: string }>({
    initialValues: { name: "" },
    onSubmit: (values, { resetForm }) => {
      setUsers(values.name);
      resetForm();
    },
    validationSchema: schema,
  });

  const handleAddUser = async () => {
    await formik.handleSubmit();
  };

  const recommendation = useMemo(() => {
    if (!formik.values.name) {
      return users;
    }

    return matchSorter(users, formik.values.name, { keys: ["name"] });
  }, [users, formik.values.name]);

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-1"
        htmlFor="name"
      >
        Participant
      </label>
      <input
        className="w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
        id="name"
        type="text"
        placeholder="Participant"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
      {formik.errors.name && (
        <span className="text-sm text-red-400">{formik.errors.name}</span>
      )}
      <div className="border-gray-800 border-2">
        {recommendation.map((user) => (
          <div key={user.id} className="mt-2 align-center flex">
            <input
              type="checkbox"
              id={user.id}
              value={user.id}
              className="w-4 h-4"
            />
            <label
              htmlFor="vehicle1"
              className="text-gray-700 text-sm font-bold mb-1"
            >
              {user.name}
            </label>
          </div>
        ))}
        <button className="text-blue-400" type="button" onClick={handleAddUser}>
          add user
        </button>
      </div>
    </div>
  );
};
