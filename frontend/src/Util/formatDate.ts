export default function formatDate(d: Date) {
  return d.toISOString().split("T")[0];
}

export const parseDate = (str: string) => {
  const [day, month, year] = str.split("/").map(Number);
  return new Date(year, month - 1, day);
};
