import { Link } from "react-router-dom";
import usePageTitle from "../Hooks/usePageTitle";

/**
 * Error component to display error pages with customizable title and subtitle
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.title="Erreur"] - Title displayed in large text. Can be used to show HTTP error codes ("404", "500"...). Optional.
 * @param {string} [props.subtitle="Une erreur s'est produite."] - Subtitle displayed below the title. Optional.
 * @returns {JSX.Element} Error page with title, subtitle and link to homepage
 */
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
