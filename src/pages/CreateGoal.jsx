import {
    Container, TextField, Typography,
    Paper, Stack, Button,
    MenuItem, Box, InputAdornment,
    IconButton
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateGoalSchema } from "../Validation/CreateGoalSchema";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import { useGoals } from "../context/GoalContext";
import { useEffect, useMemo } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function CreateGoal({ isModal, onClose }) {
    const { addGoal,
        clearEditGoal,
        updateGoal,
        editGoal
    } = useGoals();

    const { t } = useLanguage();
    const navigate = useNavigate();

    const { register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isValid } } = useForm({
            resolver: yupResolver(CreateGoalSchema()),
            mode: "all",
            defaultValues: {
                title: "",
                category: "",
                goalType: "",
                target: 0,
                startDate: ""
            }
        });
    const onSubmit = (data) => {
        if (editGoal) {
            updateGoal({ ...editGoal, ...data });
            clearEditGoal();
        } else {
            addGoal(data);
        }
        if (isModal && onClose)
            onClose();
        else
            navigate("/goalsList")
        console.log(data);
    }
    function handleReset() {
        reset();
        navigate(-1);
    }


    useEffect(() => {
        if (editGoal) {
            reset({
                title: editGoal.title || "",
                category: editGoal.category || "",
                goalType: editGoal.goalType || "",
                target: editGoal.target || 0,
                startDate: editGoal.startDate ?
                    new Date(editGoal.startDate).toISOString().split("T")[0]
                    : ""
            })
        };
    }, [editGoal, reset])

    const categories = [
        { id: "health", name: t("health") },
        { id: "study", name: t("study") },
        { id: "work", name: t("work") },
        { id: "personal", name: t("personal") }];

    const goalType = [
        { id: "daily", name: t("daily") },
        { id: "countBased", name: t("countBased") },
        { id: "timeBased", name: t("timeBased") }
    ];
    const dateTimeFieldSx = {
        "& input::-webkit-calendar-picker-indicator": {
            opacity: 0,
            width: 0,
            position: "absolute",
        },
    };
    const openNativePicker = (event) => {
        const fieldRoot = event.currentTarget.closest(".MuiFormControl-root");
        const input = fieldRoot?.querySelector("input");
        if (!input) return;
        if (typeof input.showPicker === "function") {
            input.showPicker();
        } else {
            input.focus();
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Paper elevation={7} sx={{ p: 3 }}>
                <Typography sx={{ p: 0.8 }} variant="h4" fontWeight="600" >{editGoal ? t("editGoal") : t("CreateNewGoal")}</Typography>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3} sx={{ p: 2 }} >
                        <TextField
                            label={t("goalTitle")}
                            name="title"
                            fullWidth
                            {...register("title")}
                        />
                        {errors.title && <Box color="red" fontSize={13}>
                            {errors.title.message}</Box>}

                        <Controller
                            name="category"
                            control={control}
                            render={({ field }) => (<TextField
                                select
                                label={t("goalCategory")}
                                fullWidth
                                {...field}>
                                {categories.map((cat) => (
                                    <MenuItem key={cat.id}
                                        value={cat.id}>
                                        {t(cat.name)}
                                    </MenuItem>
                                ))} </TextField>
                            )}>
                        </Controller>

                        {errors.category && <Box color="red" fontSize={13}>
                            {errors.category.message}</Box>}

                        <Controller
                            name="goalType"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    select
                                    label={t("goalType")}
                                    fullWidth
                                    {...field}>
                                    {goalType.map((type) => (
                                        <MenuItem key={type.id}
                                            value={type.id}>
                                            {type.name}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            )} />

                        {errors.goalType && <Box color="red" fontSize={13}>
                            {errors.goalType.message}</Box>}

                        <TextField label={t("goalTarget")}
                            name="target"
                            type="number"
                            fullWidth
                            {...register("target", { valueAsNumber: true })}
                        />
                        {errors.target && <Box color="red" fontSize={13}>
                            {errors.target.message}
                        </Box>}

                        <Controller
                            name="startDate"
                            control={control}

                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="date"
                                    label={t("startDate")}
                                    fullWidth
                                    error={!!errors.startDate}
                                    helperText={errors.startDate?.message}
                                    InputLabelProps={{ shrink: true }}
                                    sx={dateTimeFieldSx}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    size="small"
                                                    edge="end"
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    onClick={openNativePicker}
                                                >
                                                    <CalendarMonthRoundedIcon
                                                        sx={{
                                                            fontSize: 20,
                                                        }} />
                                                </IconButton>
                                            </InputAdornment>),
                                    }} />
                            )} />
                    </Stack>
                    <Stack direction="row" spacing={3}>
                        <Button type="submit" variant="contained" disabled={!isValid}>
                            {editGoal ? t("updateGoal") : t("createGoal")}
                        </Button>
                        <Button onClick={handleReset} variant="outlined"> {t("cancel")}</Button>
                    </Stack>
                </form>
            </Paper>
        </Container>

    );
}