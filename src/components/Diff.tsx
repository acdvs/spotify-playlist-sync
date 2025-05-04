import clsx from 'clsx';

const Diff = ({
  value,
  sign,
  visible,
}: {
  value?: number;
  sign: '+' | '-';
  visible: boolean;
}) => (
  <p
    className={clsx(
      sign === '+' ? 'text-green-500' : 'text-red-500',
      visible ? 'opacity-100' : 'opacity-0',
      'w-10 text-center font-bold transition-opacity',
    )}
  >
    {sign}
    {value}
  </p>
);

export default Diff;
