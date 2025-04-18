import { useParams } from "react-router-dom";
import { useGetData } from "../../Hooks/useGetData";
import { useDelayedLoading } from "../../Hooks/useDelayedLoading";
import usePageTitle from "../../Hooks/usePageTitle";
import Error from "../../Components/Error";
import Loading from "../../Components/Loading";
import DailyActivityChart from "../../Components/Charts/DailyActivityChart";
import AverageSessionsChart from "../../Components/Charts/AverageSessionsChart";
import NutritionCard from "../../Components/NutritionCard";
import PerformanceChart from "../../Components/Charts/PerformanceChart";
import ScoreChart from "../../Components/Charts/ScoreChart";

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
              {data.userMainData.userInfos.firstName}
            </span>
          </h1>
          <p className="text-lg">
            Félicitation ! Vous avez explosé vos objectifs hier 👏
          </p>
        </header>
        <section className="mt-12 flex flex-col gap-8 xl:flex-row">
          <div className="grid flex-1 grid-cols-3 grid-rows-[300px_263px] gap-7">
            <div className="col-span-3">
              <DailyActivityChart data={data.activityData.sessions} />
            </div>
            <div>
              <AverageSessionsChart data={data.averageSessionData.sessions} />
            </div>
            <div>
              <PerformanceChart data={data.performanceData} />
            </div>
            <div>
              <ScoreChart scorePercentage={data.userMainData.scorePercentage} />
            </div>
          </div>
          <div className="flex justify-between gap-7 xl:w-[258px] xl:flex-col">
            <NutritionCard
              type="calorieCount"
              value={data.userMainData.keyData.calorieCount}
            />
            <NutritionCard
              type="proteinCount"
              value={data.userMainData.keyData.proteinCount}
            />
            <NutritionCard
              type="carbohydrateCount"
              value={data.userMainData.keyData.carbohydrateCount}
            />
            <NutritionCard
              type="lipidCount"
              value={data.userMainData.keyData.lipidCount}
            />
          </div>
        </section>
      </>
    );
  }
}

export default Profile;
