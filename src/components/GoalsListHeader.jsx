import { MenuItem, Select, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import { useLanguage } from "../context/LanguageContext";

export default function GoalsListHeader({ filter, setFilter, search, setSearch, sortBy, setSortBy }) {
    const { t } = useLanguage();
    const filterOptions = ["All", "Active", "Paused", "Completed"];
    const sortOptions = ["Newest", "Progress", "Category"];

    return (
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }} alignItems={{ sm: "center" }}>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ width: { xs: "100%", sm: "auto" }, flexGrow: { sm: 1 } }}>
                <SearchIcon size="large" />
                <TextField
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={t("searchByTitle")}
                    variant="outlined"
                    size="small"
                    fullWidth />
            </Stack>

            <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                size="small"
                fullWidth={true}
                sx={{ width: { xs: "100%", sm: 160 } }}
            >
                {filterOptions.map((option) =>
                (<MenuItem
                    key={option}
                    value={option}>
                    {option}
                </MenuItem>)
                )}
            </Select>
            <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                size="small"
                sx={{ width: { xs: "100%", sm: 160 } }}>
                {sortOptions.map((opt) =>
                (
                    <MenuItem
                        key={opt}
                        value={opt}>
                        {opt}
                    </MenuItem>
                ))}
            </Select>
        </Stack>
    )
}