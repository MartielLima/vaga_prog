import React from "react";
import type { AppError } from "../../context/type";
import { Overlay } from "./styled";

type Props = {
  error: AppError | null;
  onClose: () => void;
};

export const ErrorDetail: React.FC<Props> = ({ error, onClose }) => {
  if (!error) return null;

  return (
    <Overlay>
      <div className="container">
        <h2>Detalhes do Erro</h2>
        <p><strong>Mensagem:</strong> {error.message}</p>
        <p><strong>Informações:</strong></p>
        <pre>{error.infos}</pre>
        <button onClick={onClose}>Fechar</button>
      </div>
    </Overlay>
  );
};
