import React from "react";
import type { AppError } from "../../context/type";
import { PopupContainer } from "./styled";

type Props = {
    errors: AppError[];
    onClose: (index: number) => void;
    onOpenDetail: (index: number) => void;
    setViewError: (val: AppError) => void
};

export const ErrorPopup: React.FC<Props> = ({ errors, onClose, onOpenDetail, setViewError }) => {
    if (errors.length === 0) return null;

    const lastErrorIndex = errors.length - 1;
    const error = errors[lastErrorIndex];
    let errorTitle = error.infos.split(":")[0];

    const handleOnClick = () => {
        setShowPopup(false)
        onOpenDetail(lastErrorIndex)
    }

    return (
        <PopupContainer>
            <div>
                {errorTitle ? errorTitle : <strong>Erro</strong>}
            </div>
            <div className="actions">
                <span onClick={handleOnClick}>Ver detalhes</span>|
                <span onClick={() => onClose(lastErrorIndex)}>Fechar</span>
            </div>
        </PopupContainer>
    );
};
