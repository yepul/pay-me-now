import { Container } from "../../src/components/Container";
import { useRouter } from "next/router";
import { useEffect } from "react";
import confetti from "canvas-confetti";

const groupId = () => {
  const router = useRouter();

  useEffect(() => {
    if (router.query.created === "today") {
      confetti({
        spread: 450,
      });
    }
  }, [router.query.created]);

  return (
    <Container>
      <h1 className="mt-20 mb-8 text-2xl font-extrabold text-gray-800 md:max-w-4xl sm:text-3xl">
        Hello group {router.query.id}
      </h1>
    </Container>
  );
};

export default groupId;
