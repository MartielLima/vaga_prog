import React from "react";
import type { AppError } from "../../context/type";
import { PopupContainer } from "./styled";

type Props = {
    error: AppError | null;
    onOpenDetail: (error: AppError) => void;
    setViewError: (val: AppError | null) => void;
    setShowPopup: (val: boolean) => void;
    timeout: React.RefObject<number | null>
};

export const ErrorPopup: React.FC<Props> = ({ error, onOpenDetail, setViewError, setShowPopup, timeout }) => {
    if (!error) return null;

    const errorTitle = error.infos.split(":")[0];

    const handleOpenDetails = () => {
        setShowPopup(false)
        onOpenDetail(error)
        setViewError(null)
        if (timeout.current) clearTimeout(timeout.current);
    }

    const handleClose = () => {
        setViewError(null)
        if (timeout.current) clearTimeout(timeout.current);
    }

    return (
        <PopupContainer>
            <div>
                {errorTitle ? errorTitle : <strong>Erro</strong>}
            </div>
            <div className="actions">
                <span onClick={handleOpenDetails}>Ver detalhes</span>|
                <span onClick={handleClose}>Fechar</span>
            </div>
        </PopupContainer>
    );
};
