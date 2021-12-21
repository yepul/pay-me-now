import { FunctionComponent } from "react";
import { UserSelection } from "./UserSelection";

const people = [
  { id: 1, name: "Wan" },
  { id: 2, name: "Abg Fazli" },
  { id: 3, name: "Kakngah" },
  { id: 4, name: "Mior" },
  // { id: 5, name: "Katelyn Rohan" },
];

export const GroupForm: FunctionComponent = () => {
  return (
    <>
      <form>
        <div className="mb-4">
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
            // onChange={}
          />
        </div>
        <UserSelection />
      </form>
    </>
  );
};
