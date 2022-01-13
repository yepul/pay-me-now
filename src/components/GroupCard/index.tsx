import { useStoreState } from "../../store/hooks";
import dynamic from "next/dynamic";
import { IGroup } from "../../store/model/group";
import { motion } from "framer-motion";
import { CARD, CONTAINER } from "../../animation";

const Summary = dynamic<IGroup>(() =>
  import("./Summary").then((mod) => mod.Summary)
);

export const GroupCard = () => {
  const groups = useStoreState((state) => state.group.groups);

  return (
    <motion.div
      variants={CONTAINER}
      initial="hidden"
      animate="visible"
      className="mt-12 grid lg:grid-cols-3 md:grid-cols-2 xs:grid-cols-1 gap-4"
    >
      {groups.map((group, index) => (
        <motion.div key={group.id} variants={CARD}>
          <Summary {...group} />
        </motion.div>
      ))}
    </motion.div>
  );
};
