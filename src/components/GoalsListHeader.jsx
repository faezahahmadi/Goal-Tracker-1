import { MenuItem, Select, Stack, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search"
import { useLanguage } from "../context/LanguageContext";

export default function GoalsListHeader({ filter, setFilter, search, setSearch, sortBy, setSortBy }) {
    const { t } = useLanguage();
    const filterOptions = ["All", "Active", "Paused", "Completed"];
    const sortOptions = ["Newest", "Progress", "Category"];

    return (
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 3 }}>
            <SearchIcon
                size="large" />
            <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={t("searchByTitle")}
                variant="outlined"
                size="small" />

            <Select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                size="small"
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
                size="small">
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