import { Link } from "react-router-dom";
import usePageTitle from "../Hooks/usePageTitle";

function Error({ title = "Erreur", subtitle = "Une erreur s'est produite." }) {
  usePageTitle(`${title} - SportSee`);

  return (
    <section className="flex flex-col items-center gap-14">
      <h1 className="text-9xl">{title}</h1>
      <h2>{subtitle}</h2>
      <Link to="/">Retourner sur la page d&rsquo;accueil</Link>
    </section>
  );
}

export default Error;
