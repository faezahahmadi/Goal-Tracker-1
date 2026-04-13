import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useLanguage } from "../context/LanguageContext";

export default function EditButton({ onClick }) {
    const { t } = useLanguage()

    return (
        <Button variant="contained"
            onClick={onClick}
            startIcon={<EditIcon />}>
            {t("edit")}
        </Button>
    )
}