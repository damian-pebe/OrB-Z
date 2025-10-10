import { isAxiosError } from "axios";
import { useTranslation } from "react-i18next";
import useCustomSnackbar from "./useCustomSnackbar";

export default function useErrorHandler() {
  const { enqueueSnackbar } = useCustomSnackbar();
  const { t } = useTranslation();
  const errorHandler = (error: unknown) => {
    let message;
    if (isAxiosError(error)) {
      message = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      message = error.message;
    } else {
      message = t("error.something_went_wrong");
    }
    enqueueSnackbar({ message, variant: "error" });

    /* Here we can log the error to an external service like Sentry */
  };
  return { errorHandler };
}
