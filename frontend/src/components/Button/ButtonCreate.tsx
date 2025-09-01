
import { Button } from './styled';
import { RiUserAddFill } from "react-icons/ri";

export default function ButtonCreate({setCreateId }: { setCreateId: React.Dispatch<React.SetStateAction<boolean>> }) {

  return (
    <Button onClick={() => setCreateId(true)}>
      <RiUserAddFill />
    </Button>
  );
}


