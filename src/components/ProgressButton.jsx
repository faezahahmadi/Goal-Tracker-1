import { Button } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

export default function ProgressButton({ onClick, disabled }) {
    const { t } = useLanguage()
    return (
        <Button variant="contained"
            color="primary"
            disabled={disabled}
            onClick={onClick}>
            {t("addProgress")}
        </Button>

    )
}