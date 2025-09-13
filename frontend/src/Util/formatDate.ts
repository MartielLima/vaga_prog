export default function formatDate(d: Date) {
  return d.toISOString().split("T")[0];
}