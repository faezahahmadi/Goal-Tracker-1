import { Button } from "@mui/material";
import DeleteIcone from "@mui/icons-material/Delete";
import { useLanguage } from "../context/LanguageContext";

export default function DeleteButton({ onClick }) {
    const { t } = useLanguage()

    return (
        <Button
            variant="contained"
            color="error"
            size="small"
            onClick={onClick}
            sx={{ flex: "1 1 auto", minWidth: 110 }}
            startIcon={<DeleteIcone />}>
            {t("delete")}
        </Button>
    )

}
