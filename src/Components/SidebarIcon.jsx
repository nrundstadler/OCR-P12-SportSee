/**
 * A component that displays a sport activity icon in the sidebar
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} props.icon - URL or path to the icon image to display
 * @returns {JSX.Element} A square container with centered icon
 */
function SidebarIcon({ icon }) {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white">
      <img src={icon} alt="" aria-hidden="true" className="h-8 w-8" />
    </div>
  );
}

export default SidebarIcon;
