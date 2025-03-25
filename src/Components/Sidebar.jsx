import SidebarButton from "./SidebarButton";

import icon_yoga from "../assets/images/icon_yoga.svg";
import icon_swimming from "../assets/images/icon_swimming.svg";
import icon_cycling from "../assets/images/icon_cycling.svg";
import icon_bodybuilding from "../assets/images/icon_bodybuilding.svg";

function Sidebar() {
  const currentYear = new Date().getFullYear();

  return (
    <aside className="fixed flex h-screen w-29 flex-col items-center justify-center gap-5 bg-black">
      <SidebarButton icon={icon_yoga} />
      <SidebarButton icon={icon_swimming} />
      <SidebarButton icon={icon_cycling} />
      <SidebarButton icon={icon_bodybuilding} />

      <small className="absolute bottom-28 w-max -rotate-90 text-xs font-medium text-white">
        Copyright, SportSee {currentYear}
      </small>
    </aside>
  );
}

export default Sidebar;
