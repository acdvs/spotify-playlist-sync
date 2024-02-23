import cx from 'classnames';

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
    className={cx(
      sign === '+' ? 'text-green-500' : 'text-red-500',
      visible ? 'opacity-100' : 'opacity-0',
      'font-bold transition-opacity',
    )}
  >
    {sign}
    {value}
  </p>
);

export default Diff;
