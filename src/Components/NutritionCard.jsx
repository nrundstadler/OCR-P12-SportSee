import calorieIcon from "../assets/images/iconsNutrition/calorieIcon.svg";
import proteinIcon from "../assets/images/iconsNutrition/proteinIcon.svg";
import carbohydrateIcon from "../assets/images/iconsNutrition/carbohydrateIcon.svg";
import lipidIcon from "../assets/images/iconsNutrition/lipidIcon.svg";

/**
 * Component that displays a nutrition information card with an icon and value
 * @component
 * @param {Object} props - Component props
 * @param {('calorieCount'|'proteinCount'|'carbohydrateCount'|'lipidCount')} props.type - Type of nutrition data to display
 * @param {number} props.value - Value to display for the nutrition type
 * @returns {JSX.Element|null} A card displaying nutrition information or null if type is invalid
 *
 * @example
 * // Display calorie count
 * <NutritionCard type="calorieCount" value={1800} />
 *
 * // Display protein count
 * <NutritionCard type="proteinCount" value={155} />
 */
const NutritionCard = ({ type, value }) => {
  const NUTRITION_INFO = {
    calorieCount: {
      icon: calorieIcon,
      bgColorIcon: "#fbeaea",
      labelFR: "Calories",
      unit: "kCal",
    },
    proteinCount: {
      icon: proteinIcon,
      bgColorIcon: "#e9f4fb",
      labelFR: "Protéines",
      unit: "g",
    },
    carbohydrateCount: {
      icon: carbohydrateIcon,
      bgColorIcon: "#faf6e5",
      labelFR: "Glucides",
      unit: "g",
    },
    lipidCount: {
      icon: lipidIcon,
      bgColorIcon: "#fbeaef",
      labelFR: "Lipides",
      unit: "g",
    },
  };

  const info = NUTRITION_INFO[type];

  // Return null if type is not found in NUTRITION_INFO
  if (!info) return null;

  return (
    <div className="flex h-[124px] flex-1 flex-row items-center gap-6 rounded-sm bg-neutral-50 pl-6 xl:flex-initial">
      <div
        className="flex h-15 w-15 items-center justify-center rounded-md bg-white"
        style={{
          backgroundColor: info.bgColorIcon,
        }}
      >
        <img
          src={info.icon}
          alt={`${info.labelFR} : ${value}${info.unit}`}
          aria-hidden="true"
          className="h-8 w-8"
        />
      </div>
      <div>
        <span className="text-xl font-bold text-[#282D30]">
          {value.toLocaleString("en-US")}
          {info.unit}
        </span>
        <br />
        <span className="font-medium text-[#9B9EAC]">{info.labelFR}</span>
      </div>
    </div>
  );
};

export default NutritionCard;
