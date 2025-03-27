/**
 * Loading component that displays a bouncing "Chargement..." text
 * Used as a loading indicator while data is being fetched
 *
 * @component
 * @returns {JSX.Element} A section with animated loading text
 */
function Loading() {
  return (
    <section className="animate-bounce text-center text-3xl font-medium">
      Chargement...
    </section>
  );
}

export default Loading;
