import { useState } from "react";
import { Box, Button, Container, Divider, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CategoryCard from "../components/CategoryCard";
import { useGoals } from "../context/GoalContext";
import { useCategories } from "../context/CategoryContext";
import { useLanguage } from "../context/LanguageContext";
import CreateCategoryModal from "../components/Categories/CreateCategoryModal";

export default function Categories() {
    const { goals } = useGoals();
    const { categories, deleteCategory } = useCategories();
    const { t } = useLanguage();
    const [modalOpen, setModalOpen] = useState(false);

    const categoryData = categories.map((cat) => {
        const catGoals = goals.filter((g) => g.category === cat.id);
        const activeGoals = catGoals.filter((g) => g.status === "Active").length;
        const completedGoals = catGoals.filter((g) => g.status === "Completed").length;
        const avgProgress =
            catGoals.length === 0
                ? 0
                : Math.round(
                    catGoals.reduce((sum, g) => {
                        const progress = Number(g.progress) || 0;
                        const target = Number(g.target) || 1;
                        return sum + (progress / target) * 100;
                    }, 0) / catGoals.length
                );
        return {
            id: cat.id,
            name: cat.name,
            color: cat.color,
            isDefault: cat.isDefault,
            goalCount: catGoals.length,
            activeGoals,
            completedGoals,
            avgProgress,
        };
    });

    const handleDelete = (cat) => {
        if (cat.goalCount > 0) {
            alert("This category still has goals in it. Move or delete those goals first.");
            return;
        }
        deleteCategory(cat.id);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4, }}>
            <Box
                sx={{ mb: 1, display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "space-between", alignItems: "flex-start" }}
            >
                <Box>
                    <Typography sx={{ p: 0.8 }} variant="h3" fontWeight="600" >{t("categoryTitle")}</Typography>
                    <Typography variant="body1" color="text.secondary">{t("categorySubtitle")}</Typography>
                </Box>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => setModalOpen(true)}
                    sx={{ height: "fit-content" }}
                >
                    Create category
                </Button>
            </Box>
            <Divider />
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
                {categoryData.map(cat => (
                    <Grid item xs={12} sm={6} md={4} key={cat.id}>
                        <CategoryCard
                            category={cat}
                            onDelete={!cat.isDefault ? () => handleDelete(cat) : null}
                        />
                    </Grid>
                ))}
            </Grid>

            <CreateCategoryModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </Container>
    );
}
