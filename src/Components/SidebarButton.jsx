function SidebarButton({ icon }) {
  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-md bg-white">
      <img src={icon} alt="" aria-hidden="true" className="h-8 w-8" />
    </div>
  );
}

export default SidebarButton;
