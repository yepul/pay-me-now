import { Container } from "../../src/components/Container";
import { GroupForm } from "../../src/modules/Form/Group";
import { Title } from "../../src/components/Title";

const CreateGroup = () => {
  return (
    <Container>
      <div className="mt-20 mb-8">
        <Title>Create group</Title>
      </div>
      <GroupForm />
    </Container>
  );
};

export default CreateGroup;
