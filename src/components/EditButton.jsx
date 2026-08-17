import { Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useLanguage } from "../context/LanguageContext";

export default function EditButton({ onClick }) {
    const { t } = useLanguage()

    return (
        <Button variant="contained"
            size="small"
            onClick={onClick}
            sx={{ flex: { xs: "1 1 auto", sm: "0 0 auto" } }}
            startIcon={<EditIcon />}>
            {t("edit")}
        </Button>
    )
}
