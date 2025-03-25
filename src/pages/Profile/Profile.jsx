import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/");
    } else {
      document.title = "Profil - SportSee";
    }
  }, [id, navigate]);

  return (
    <div>
      <header>
        <h1 className="mb-10 text-5xl font-medium">
          Bonjour <span className="text-primary">Thomas</span>
        </h1>
        <p className="text-lg">
          Félicitation ! Vous avez explosé vos objectifs hier 👏
        </p>
      </header>
    </div>
  );
}

export default Profile;
