import { Container } from "../../src/components/Container";
import { useRouter } from "next/router";

const groupId = () => {
  const router = useRouter();
  console.log(router.query.id);
  return (
    <Container>
      <h1 className="mt-20 mb-8 text-2xl font-extrabold text-gray-800 md:max-w-4xl sm:text-3xl">
        Hello group
      </h1>
    </Container>
  );
};

export default groupId;
