import { Button } from "@mui/material";
import { useLanguage } from "../context/LanguageContext";

export default function ProgressButton({ onClick, disabled }) {
    const { t } = useLanguage()
    return (
        <Button variant="contained"
            color="primary"
            size="small"
            disabled={disabled}
            onClick={onClick}
            sx={{ flex: "1 1 auto", minWidth: 110 }}>
            {t("addProgress")}
        </Button>

    )
}
