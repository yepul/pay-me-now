import { useStoreActions, useStoreState } from "../../store/hooks";
import { ChangeEvent, useState } from "react";
import { useFormik } from "formik";
import { schema } from "./schema";

export const UserSelection = () => {
  const users = useStoreState((state) => state.user.users);
  const setUsers = useStoreActions((actions) => actions.user.setUsers);

  const formik = useFormik<{ name: string }>({
    initialValues: { name: "" },
    onSubmit: (values) => {
      setUsers(values.name);
    },
    validationSchema: schema,
  });

  const handleAddUser = () => {
    formik.handleSubmit();
  };

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
      />
      {formik.errors.name && (
        <span className="text-sm text-red-400">{formik.errors.name}</span>
      )}
      <div className="border-gray-800 border-2">
        {users.map((user) => (
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
