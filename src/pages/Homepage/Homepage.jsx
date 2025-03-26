import { Link } from "react-router-dom";
import usePageTitle from "../../Hooks/usePageTitle";

function Homepage() {
  usePageTitle("Accueil - SportSee");

  return (
    <div className="flex flex-col items-center gap-10">
      <h1 className="text-2xl">Choix de l'utilisateur :</h1>
      <Link
        className="bg-primary hover:bg-primary-dark rounded-full px-4 py-2 font-bold text-white hover:no-underline"
        to="/profile-mocked/12"
      >
        Profil n° 12 (données mockées)
      </Link>
      <Link
        className="bg-primary hover:bg-primary-dark rounded-full px-4 py-2 font-bold text-white hover:no-underline"
        to="/profile-mocked/18"
      >
        Profil n° 18 (données mockées)
      </Link>
      <Link
        className="bg-primary hover:bg-primary-dark rounded-full px-4 py-2 font-bold text-white hover:no-underline"
        to="/profile/12"
      >
        Profil n° 12 (API)
      </Link>
      <Link
        className="bg-primary hover:bg-primary-dark rounded-full px-4 py-2 font-bold text-white hover:no-underline"
        to="/profile/18"
      >
        Profil n° 18 (API)
      </Link>
    </div>
  );
}

export default Homepage;
