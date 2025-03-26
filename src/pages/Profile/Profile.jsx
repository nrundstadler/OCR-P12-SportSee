import { useParams } from "react-router-dom";
import { useGetData } from "../../Hooks/useGetData";
import { useDelayedLoading } from "../../Hooks/useDelayedLoading";
import usePageTitle from "../../Hooks/usePageTitle";
import Error from "../../components/Error";
import Loading from "../../components/Loading";

function Profile({ useMockData }) {
  usePageTitle("Profil - SportSee");

  const { id } = useParams();
  const userId = /^\d+$/.test(id) ? Number(id) : 0;

  // Fetch the User data
  const { isLoading, hasError, data } = useGetData(userId, useMockData);

  // Use the custom hook to manage delayed loading
  const showLoading = useDelayedLoading(isLoading, 400, 800);

  // Handle loading state (if loading takes longer than 400ms, show the loading component for at least 800ms)
  if (showLoading) {
    return <Loading />;
  }

  // Handle invalid user ID
  if (!userId) {
    return <Error title="404" subtitle="L'utilisateur n'a pas été trouvé." />;
  }

  // Handle error fetching data
  if (hasError) {
    return (
      <Error title="500" subtitle="Échec de la récupération des données." />
    );
  }

  // Handle successful data fetch
  if (!isLoading && !hasError) {
    return (
      <>
        <header>
          <h1 className="mb-10 text-5xl font-medium">
            Bonjour{" "}
            <span className="text-primary">
              {data?.userData?.userInfos?.firstName}
            </span>
          </h1>
          <p className="text-lg">
            Félicitation ! Vous avez explosé vos objectifs hier 👏
          </p>
        </header>
      </>
    );
  }
}

export default Profile;
