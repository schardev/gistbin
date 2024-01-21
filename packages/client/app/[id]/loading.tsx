const Loading = () => {
  return (
    <div className="grid gap-y-4 place-content-center place-items-center min-h-[70vh]">
      <svg
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
        className="w-10 h-10"
        fill="currentColor">
        <path
          className="animate-spin origin-center"
          d="M2,12A11.2,11.2,0,0,1,13,1.05C12.67,1,12.34,1,12,1a11,11,0,0,0,0,22c.34,0,.67,0,1-.05C6,23,2,17.74,2,12Z"
        />
      </svg>
      <p className="text-foreground-muted">Loading gist</p>
    </div>
  );
};

export default Loading;
