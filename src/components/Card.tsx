import cx from 'classnames';

const Card = ({
  text,
  filled,
  noAlign,
  className,
  children,
}: React.PropsWithChildren & {
  text?: string;
  filled?: boolean;
  noAlign?: boolean;
  className?: string;
}) => (
  <div
    className={cx(
      className,
      filled ? 'bg-zinc-900' : 'border-2 border-zinc-700',
      noAlign === undefined && 'items-center justify-center',
      'flex flex-col p-7 rounded-lg',
    )}
  >
    {text && <p className="mb-5 text-white text-center">{text}</p>}
    {children}
  </div>
);

export default Card;
