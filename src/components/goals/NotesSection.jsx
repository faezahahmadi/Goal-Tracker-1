import { useState } from "react";
import {
    Box,
    Button,
    Card,
    CardContent,
    IconButton,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useGoals } from "../../context/GoalContext";

function formatDate(iso) {
    if (!iso) return "";
    return new Date(iso).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export default function NotesSection({ goal }) {
    const { addNote, updateNote, deleteNote } = useGoals();
    const [draft, setDraft] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editingText, setEditingText] = useState("");

    const notes = goal.notes || [];

    const handleCreate = () => {
        if (!draft.trim()) return;
        addNote(goal.id, draft);
        setDraft("");
    };

    const startEdit = (note) => {
        setEditingId(note.id);
        setEditingText(note.text);
    };

    const saveEdit = () => {
        updateNote(goal.id, editingId, editingText);
        setEditingId(null);
        setEditingText("");
    };

    return (
        <Card sx={{ mt: 2 }}>
            <CardContent>
                <Typography fontWeight={600} sx={{ mb: 2 }}>
                    Notes & Journal
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={1} sx={{ mb: 2 }}>
                    <TextField
                        placeholder="Write a note about this goal..."
                        value={draft}
                        onChange={(e) => setDraft(e.target.value)}
                        fullWidth
                        size="small"
                        multiline
                        maxRows={4}
                    />
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleCreate}
                        disabled={!draft.trim()}
                        sx={{ flexShrink: 0 }}
                    >
                        Create note
                    </Button>
                </Stack>

                {notes.length === 0 && (
                    <Typography variant="body2" color="text.secondary">
                        No notes yet. Jot down how things are going!
                    </Typography>
                )}

                <Stack spacing={1.2}>
                    {notes.map((note) => (
                        <Box
                            key={note.id}
                            sx={{
                                p: 1.5,
                                borderRadius: 2,
                                bgcolor: "action.hover",
                            }}
                        >
                            {editingId === note.id ? (
                                <Stack spacing={1}>
                                    <TextField
                                        value={editingText}
                                        onChange={(e) => setEditingText(e.target.value)}
                                        multiline
                                        size="small"
                                        autoFocus
                                        fullWidth
                                    />
                                    <Stack direction="row" spacing={1}>
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={saveEdit}
                                        >
                                            <CheckIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            onClick={() => setEditingId(null)}
                                        >
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            ) : (
                                <Stack
                                    direction="row"
                                    justifyContent="space-between"
                                    alignItems="flex-start"
                                    spacing={1}
                                >
                                    <Box sx={{ minWidth: 0 }}>
                                        <Typography
                                            variant="body2"
                                            sx={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}
                                        >
                                            {note.text}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            {formatDate(note.updatedAt)}
                                        </Typography>
                                    </Box>
                                    <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
                                        <IconButton
                                            size="small"
                                            onClick={() => startEdit(note)}
                                        >
                                            <EditIcon fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            color="error"
                                            onClick={() => deleteNote(goal.id, note.id)}
                                        >
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    </Stack>
                                </Stack>
                            )}
                        </Box>
                    ))}
                </Stack>
            </CardContent>
        </Card>
    );
}
