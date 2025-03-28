import { useParams } from "react-router-dom";
import { useGetData } from "../../Hooks/useGetData";
import { useDelayedLoading } from "../../Hooks/useDelayedLoading";
import usePageTitle from "../../Hooks/usePageTitle";
import Error from "../../components/Error";
import Loading from "../../components/Loading";
import DailyActivityChart from "../../Components/Charts/DailyActivityChart";

function Profile({ useMockData }) {
  usePageTitle("Profil - SportSee");

  const { id } = useParams();
  const userId = /^\d+$/.test(id) ? Number(id) : 0;

  // Fetch the User data
  const { isLoading, hasError, data } = useGetData(userId, useMockData);

  // Control the loading component display based on loading duration
  const showLoading = useDelayedLoading(isLoading, 400, 800);

  // Show the loading component
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

  // Display profile if data is loaded without errors
  if (!isLoading && !hasError) {
    return (
      <>
        <header>
          <h1 className="mb-8 text-5xl font-medium">
            Bonjour{" "}
            <span className="text-primary">
              {data.userData.userInfos.firstName}
            </span>
          </h1>
          <p className="text-lg">
            Félicitation ! Vous avez explosé vos objectifs hier 👏
          </p>
        </header>
        <section className="mt-12 flex flex-col gap-8 xl:flex-row">
          <div className="grid flex-1 grid-cols-3 grid-rows-[300px_263px] gap-7">
            <div className="col-span-3 bg-neutral-100">
              <DailyActivityChart data={data.activityData.sessions} />
            </div>
            <div className="bg-amber-300">Graph 2</div>
            <div className="bg-amber-400">Graph 3</div>
            <div className="bg-amber-500">Graph 4</div>
          </div>
          <div className="flex justify-between gap-7 xl:w-[258px] xl:flex-col">
            <div className="h-[124px] flex-1 rounded-sm bg-neutral-100 xl:flex-initial"></div>
            <div className="h-[124px] flex-1 rounded-sm bg-neutral-100 xl:flex-initial"></div>
            <div className="h-[124px] flex-1 rounded-sm bg-neutral-100 xl:flex-initial"></div>
            <div className="h-[124px] flex-1 rounded-sm bg-neutral-100 xl:flex-initial"></div>
          </div>
        </section>
      </>
    );
  }
}

export default Profile;
