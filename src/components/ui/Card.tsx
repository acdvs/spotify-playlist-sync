import clsx from 'clsx';

function Card({
  text,
  filled,
  noAlign,
  className,
  children,
}: {
  text?: string;
  filled?: boolean;
  noAlign?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        className,
        filled ? 'lg:bg-zinc-900' : 'lg:border-2 lg:border-zinc-700',
        !noAlign && 'items-center justify-center',
        'flex flex-col flex-1 p-7 rounded-lg',
      )}
    >
      {text && <p className="mb-5 text-white text-center">{text}</p>}
      {children}
    </div>
  );
}

export default Card;
