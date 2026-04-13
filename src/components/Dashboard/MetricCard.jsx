import { Box, Card, Grid, Typography } from "@mui/material";

export default function MetricCard({ title, value, icon, color, label }) {
    return (
        <Card
            sx={{
                borderRadius: 2,
                borderLeft: `6px solid ${color}`,
                boxShadow: 4,
                height: "130px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 3,
            }}>

            <Box justifyContent={"space-between"} mb={2}>
                <Typography variant="body2" color="text.secondary" fontWeight={"bold"}>
                    {title}
                </Typography>

                <Typography variant="h4" fontWeight="bold">
                    {value}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    {label}
                </Typography>

            </Box>
            <Box
            >
                {icon}
            </Box>
        </Card>
    )

}
