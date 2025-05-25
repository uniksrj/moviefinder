import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
// import Header from 'app/src/include/'

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Movie Finder" },
    { name: "description", content: "Here you can find any movies and tv series" },
  ];
}

export default function Home() {
  return (
  <Welcome />
);
}
