import React from "react";
import type { AppError } from "../../context/type";
import { PopupContainer } from "./styled";

type Props = {
    errors: AppError[];
    onClose: (index: number) => void;
    onOpenDetail: (index: number) => void;
};

export const ErrorPopup: React.FC<Props> = ({ errors, onClose, onOpenDetail }) => {
    if (errors.length === 0) return null;

    const lastErrorIndex = errors.length - 1;
    const error = errors[lastErrorIndex];

    return (
        <PopupContainer>
            <div>
                <strong>Erro:</strong> {error.message}
            </div>
            <div className="actions">
                <span onClick={() => onOpenDetail(lastErrorIndex)}>Ver detalhes</span>|
                <span onClick={() => onClose(lastErrorIndex)}>Fechar</span>
            </div>
        </PopupContainer>
    );
};
