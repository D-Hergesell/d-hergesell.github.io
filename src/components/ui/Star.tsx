interface StarProps {
  className?: string;
}

/** Estrela angular de 4 pontas usada como ornamento */
export function Star({ className = '' }: StarProps) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M12 0l2.6 9.4L24 12l-9.4 2.6L12 24l-2.6-9.4L0 12l9.4-2.6L12 0z" />
    </svg>
  );
}
