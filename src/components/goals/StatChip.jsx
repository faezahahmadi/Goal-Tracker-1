import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

export default function StatChip({ icon, label, value }) {
    return (
        <Card>
            <CardContent sx={{ p: 1.8 }}>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Box>{icon}</Box>
                    <Typography variant="body2" color="text.secondary">
                        {label}
                    </Typography>
                </Stack>
                <Typography variant="h5" fontWeight={800} sx={{ mt: 1 }}>
                    {value}
                </Typography>
            </CardContent>
        </Card>
    );
}
