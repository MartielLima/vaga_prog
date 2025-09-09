import React from "react";
import type { AppError } from "../../context/type";
import { PopupContainer } from "./styled";

type Props = {
    error: AppError | null;
    onOpenDetail: (error: AppError) => void;
    setViewError: (val: AppError | null) => void;
    setShowPopup: (val: boolean) => void;
};

export const ErrorPopup: React.FC<Props> = ({ error, onOpenDetail, setViewError, setShowPopup }) => {
    if (!error) return null;

    const errorTitle = error.infos.split(":")[0];

    const handleOnClick = () => {
        setShowPopup(false)
        onOpenDetail(error)
        setViewError(null)
    }

    return (
        <PopupContainer>
            <div>
                {errorTitle ? errorTitle : <strong>Erro</strong>}
            </div>
            <div className="actions">
                <span onClick={handleOnClick}>Ver detalhes</span>|
                <span onClick={() => setViewError(null)}>Fechar</span>
            </div>
        </PopupContainer>
    );
};
