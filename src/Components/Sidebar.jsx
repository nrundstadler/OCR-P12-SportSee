import SidebarIcon from "./SidebarIcon";

import icon_yoga from "../assets/images/icon_yoga.svg";
import icon_swimming from "../assets/images/icon_swimming.svg";
import icon_cycling from "../assets/images/icon_cycling.svg";
import icon_bodybuilding from "../assets/images/icon_bodybuilding.svg";

/**
 * Decorative sidebar displaying sport activity icons and copyright
 * @component
 * @returns {JSX.Element} A fixed sidebar with icons and copyright text
 */
function Sidebar() {
  const currentYear = new Date().getFullYear();

  return (
    <aside className="fixed flex h-screen w-29 flex-col items-center justify-center gap-5 bg-black">
      <SidebarIcon icon={icon_yoga} />
      <SidebarIcon icon={icon_swimming} />
      <SidebarIcon icon={icon_cycling} />
      <SidebarIcon icon={icon_bodybuilding} />

      <small className="absolute bottom-28 w-max -rotate-90 text-xs font-medium text-white">
        Copyright, SportSee {currentYear}
      </small>
    </aside>
  );
}

export default Sidebar;
