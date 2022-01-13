import { useStoreState } from "../../store/hooks";
import dynamic from "next/dynamic";
import { IGroup } from "../../store/model/group";
import { motion } from "framer-motion";

const Summary = dynamic<IGroup>(() =>
  import("./Summary").then((mod) => mod.Summary)
);

const container = {
  visible: {
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
    hidden: {
      transition: {
        when: "afterChildren",
      },
    },
  },
};

const card = {
  visible: {
    x: 0,
    opacity: 1,
  },
  hidden: {
    x: -32,
    opacity: 0.4,
  },
};

export const GroupCard = () => {
  const groups = useStoreState((state) => state.group.groups);

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="mt-12 grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-4"
    >
      {groups.map((group, index) => (
        <motion.div key={group.id} variants={card}>
          <Summary {...group} />
        </motion.div>
      ))}
    </motion.div>
  );
};
