/* eslint-disable @typescript-eslint/no-explicit-any */
function Divider({
  size = 1,
  color,
  ...restProps
}: {
  size?: number;
  color?: string;
  [x: string]: any;
}) {
  const style = {
    backgroundColor: color || 'var(--colors-green-main)',
    height: `${size}px` || '1px',
  };

  return <div style={style} {...restProps} />;
}

export default Divider;
