import ErrorPage from "~/src/pages/ErrorPage";

export default function Error() {
  return (
  <ErrorPage />
);
}
export function meta() {
  return [
    { title: "Error" },
    { name: "description", content: "An error occurred while processing your request." },
  ];
}
