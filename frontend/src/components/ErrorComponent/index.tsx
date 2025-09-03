import { ContainerError } from "./styled"

function ErrorComponent({ error }: { error: string[] }) {

  return (
    <ContainerError>
      {error.map((err, index) => (
        <p key={index}>{err}</p>
      ))}
    </ContainerError>
  );
}

export default ErrorComponent;
