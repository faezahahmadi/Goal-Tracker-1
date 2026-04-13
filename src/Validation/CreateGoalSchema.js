import * as yup from "yup";
import { useLanguage } from "../context/LanguageContext";
export function CreateGoalSchema() {
  const { t } = useLanguage();
  return yup.object({
    title: yup.string().required(t("titleRequired")),
    category: yup.string().required(t("categoryRequired")),
    goalType: yup.string().required(t("goalTypeRequired")),
    target: yup.number(t("targetNumber")).required(t("targetRequired")),
    startDate: yup.date().required(t("startDateRequired")),
  });
}
