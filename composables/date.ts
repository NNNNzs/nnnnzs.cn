import dayjs from "dayjs";

export const dateFormat = (date: string | undefined | Date) => {
  if (!date) return "";
  return dayjs(date).format("MM月 DD日, YYYY");
};