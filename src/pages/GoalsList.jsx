import {
    Typography, Container, Paper,
    Grid,
    Box,
    Divider

} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import GoalsListHeader from "../components/GoalsListHeader";
import GoalCard from "../components/GoalCard";
import { useGoals } from "../context/GoalContext";
import { filterMap } from "../Data/GoalOption";
import { useLanguage } from "../context/LanguageContext";


export default function GoalsList() {
    const { goals } = useGoals();
    const [filter, setFilter] = useState("All");
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState("Newest");
    const trimmedSearch = search.trim();
    const navigate = useNavigate();
    const { t } = useLanguage();

    const filteredGoals = [...goals]
        .filter((goal) => {
            if (filter === "All") return true;
            return goal.status === filter
        })
        .filter((goal) => {
            if (!trimmedSearch) return true;
            return goal.title.toLowerCase().includes(trimmedSearch.toLowerCase())
        }
        )
        .sort((a, b) => {
            if (sortBy === "Newest") {
                return
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
            if (sortBy === "Progress") {
                return (b.progress / b.target) - (a.progress / a.target);
            }
            if (sortBy === "Category") {
                return a.category.localeCompare(b.category);
            }
            return 0;
        });



    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box justifyContent="space-between" sx={{ mb: 1 }}  >
                <Typography sx={{ p: 0.8 }} variant="h3" fontWeight="600" >{t("goalList")}</Typography>
                <Typography variant="body1" color="text.secondary">{t("goalSubtitle")}</Typography>
            </Box>
            <Divider />

            <Paper elevation={7} sx={{ p: 3, mt: 5 }}>
                <GoalsListHeader
                    search={trimmedSearch}
                    setSearch={setSearch}
                    filter={filter}
                    setFilter={setFilter}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />
                <Grid container spacing={2} >
                    {filteredGoals.map((goal) => (
                        <Grid key={goal.id} item xs={12} sm={6} md={4}>
                            <GoalCard
                                goal={goal}>
                            </GoalCard>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
        </Container>
    );
}