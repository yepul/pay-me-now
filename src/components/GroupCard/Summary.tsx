import { IGroup } from "../../store/model/group";
import { UserAvatarGroup } from "../UserAvatarGroup";
import { useRouter } from "next/router";
import { useStoreState } from "../../store/hooks";
import { useMemo } from "react";
import { TotalSummary } from "./TotalSummary";

export const Summary = (group: IGroup) => {
  const router = useRouter();
  const handleRouteToGroup = async () => {
    await router.push("/group/" + group.id);
  };

  const expensesById = useStoreState((state) =>
    state.expense.expenseByGroupId(group.id as string)
  );

  const totalExpenses = useMemo(
    () => expensesById?.reduce((total, expense) => total + expense.total, 0),
    [expensesById]
  );

  return (
    <div
      onClick={handleRouteToGroup}
      className="shadow-sm border-2 border-gray-100 rounded-lg rounded-tr-2xl rounded-bl-2xl pt-3 pb-5 px-1 cursor-pointer"
    >
      <section
        className="text-center flex flex-col justify-center"
        aria-describedby="group-header"
      >
        <div className="flex justify-center">
          <UserAvatarGroup users={group.users} />
        </div>
        <h3 className="font-medium text-gray-800 text-lg mt-0.5">
          {group.name}
        </h3>
      </section>
      <div className="grid grid-cols-2 mt-2">
        <TotalSummary header={"Paid"} total={totalExpenses} />
        <TotalSummary header={"Total"} total={totalExpenses} />
      </div>
    </div>
  );
};
