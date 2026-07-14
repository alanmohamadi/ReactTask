export const ChangeFormatDate = (data: number | any) => {
  if (!data) return "";
  const dateStr = data?.toString();
  if (dateStr.length !== 8) return "";
  const year = dateStr.slice(0, 4);
  const month = dateStr.slice(4, 6);
  const day = dateStr.slice(6, 8);
  return `${year}/${month}/${day}`;
}
