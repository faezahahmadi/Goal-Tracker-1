import { Stack, Typography } from "@mui/material";

export default function TimeInfo({ icon, label, value }) {
    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Stack direction="row" spacing={1} alignItems="center">
                {icon}
                <Typography variant="body2" color="text.secondary">
                    {label}
                </Typography>
            </Stack>
            <Typography variant="body2" fontWeight={800}>
                {value}
            </Typography>
        </Stack>
    );
}
