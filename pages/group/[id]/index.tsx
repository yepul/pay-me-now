import { Container } from "../../../src/components/Container";
import { useRouter } from "next/router";
import { useEffect } from "react";
import confetti from "canvas-confetti";
import { useStoreState } from "../../../src/store/hooks";
import { ExpenseCard } from "../../../src/components/ExpenseCard";

const groupId = () => {
  const router = useRouter();

  const groupById = useStoreState((state) =>
    state.group.groupById(router.query.id as string)
  );
  const expenseByGroupId = useStoreState((state) =>
    state.expense.expenseByGroupId(router.query.id as string)
  );

  useEffect(() => {
    if (router.query.created === "today") {
      confetti({
        spread: 450,
      });
    }
  }, [router.query.created]);

  const handleAddExpense = async () => {
    await router.push(`/group/${router.query.id}/add-expense`);
  };

  return (
    <Container>
      <section className="mt-20 mb-8 items-center justify-between flex">
        <h1 className="text-2xl font-extrabold text-gray-800 md:max-w-4xl sm:text-3xl">
          {groupById.name}
        </h1>
        <div>
          <button
            onClick={handleAddExpense}
            className="text-gray-400 bg-opacity-50 shadow-md rounded-full p-2 backdrop-filter backdrop-blur firefox:bg-opacity-90"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </div>
      </section>
      <section className="grid gap-4">
        {expenseByGroupId.map((expense) => (
          <ExpenseCard
            {...expense}
            groupId={router.query.id as string}
            key={expense.id}
          />
        ))}
      </section>
    </Container>
  );
};

export default groupId;
