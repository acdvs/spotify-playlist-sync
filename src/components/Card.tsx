import cx from 'classnames';

const Card = ({
  text,
  filled,
  className,
  children,
}: React.PropsWithChildren & {
  text?: string;
  filled?: boolean;
  className?: string;
}) => (
  <div
    className={cx(
      className,
      filled ? 'bg-zinc-900' : 'border-2 border-zinc-700',
      'flex flex-col items-center justify-center p-7 rounded-lg',
    )}
  >
    {text && <p className="mb-5 text-zinc-400">{text}</p>}
    {children}
  </div>
);

export default Card;
