import { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Stack,
    Box,
    Typography,
} from "@mui/material";
import { useCategories } from "../../context/CategoryContext";

const SWATCHES = [
    "#1954d2",
    "#2e7d32",
    "#ef6c00",
    "#8e24aa",
    "#c62828",
    "#00838f",
    "#6d4c41",
    "#546e7a",
];

export default function CreateCategoryModal({ open, onClose, onCreated }) {
    const { addCategory } = useCategories();
    const [name, setName] = useState("");
    const [color, setColor] = useState(SWATCHES[0]);

    const handleClose = () => {
        setName("");
        setColor(SWATCHES[0]);
        onClose();
    };

    const handleCreate = () => {
        if (!name.trim()) return;
        const created = addCategory(name, color);
        handleClose();
        if (onCreated && created) onCreated(created);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth>
            <DialogTitle>+ Create Category</DialogTitle>
            <DialogContent>
                <Stack spacing={2} sx={{ mt: 1 }}>
                    <TextField
                        label="Category name"
                        value={name}
                        autoFocus
                        fullWidth
                        onChange={(e) => setName(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleCreate();
                        }}
                    />
                    <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            Color
                        </Typography>
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {SWATCHES.map((swatch) => (
                                <Box
                                    key={swatch}
                                    onClick={() => setColor(swatch)}
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        borderRadius: "50%",
                                        bgcolor: swatch,
                                        cursor: "pointer",
                                        border: color === swatch ? "3px solid" : "3px solid transparent",
                                        borderColor: color === swatch ? "text.primary" : "transparent",
                                        transition: "transform 0.15s",
                                        "&:hover": { transform: "scale(1.1)" },
                                    }}
                                />
                            ))}
                        </Stack>
                    </Box>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" disabled={!name.trim()} onClick={handleCreate}>
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}
