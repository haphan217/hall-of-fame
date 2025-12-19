export const PlayIcon: React.FC<React.SVGProps<SVGSVGElement>> = (
  props,
  width = 24,
  height = 24
) => (
  <svg
    width={width}
    height={height}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 5v14l11-7z"
    />
  </svg>
);
