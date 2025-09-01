import { Error } from "./styled"

function ErrorComponent({ error }: { error: string[] }) {

    return (
    <Error className="error-messages">
            {error.map((err, index) => (
              <p key={index}>{err}</p>
            ))}
    </Error>
  );
}

export default ErrorComponent;
