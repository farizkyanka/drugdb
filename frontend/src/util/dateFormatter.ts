export default function dateFormatter(dateString: string) {
  const d: Date = new Date(dateString);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()} at ${
    d.getHours() < 10 ? "0" + d.getHours() : d.getHours()
  }:${d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes()}`;
}
