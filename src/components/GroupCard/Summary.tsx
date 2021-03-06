import { IGroup } from "../../store/model/group";
import { useRouter } from "next/router";
import { useStoreState } from "../../store/hooks";
import { useMemo } from "react";
import { TotalSummary } from "./TotalSummary";
import dynamic from "next/dynamic";
import { IUserAvatarGroup } from "../UserAvatarGroup";
import { motion } from "framer-motion";

const UserAvatarGroup = dynamic<IUserAvatarGroup>(() =>
  import("../UserAvatarGroup").then((mod) => mod.UserAvatarGroup)
);

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

  const totalPaid = useMemo(
    () =>
      expensesById.reduce(
        (total, expense) =>
          expense.payment.reduce(
            (totalPayment, pay) => totalPayment + pay.total,
            0
          ) + total,
        0
      ),
    [expensesById]
  );

  return (
    <motion.div
      onClick={handleRouteToGroup}
      className="shadow-sm border-2 border-gray-100 rounded-lg rounded-tr-2xl rounded-bl-2xl pt-3 pb-5 px-1 cursor-pointer"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
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
        <TotalSummary
          style={{ color: "rgba(52, 211, 153, var(--tw-text-opacity))" }}
          header={"Paid"}
          total={totalPaid}
        />
        <TotalSummary
          style={{ color: "darkBlue" }}
          header={"Total"}
          total={totalExpenses}
        />
      </div>
    </motion.div>
  );
};
