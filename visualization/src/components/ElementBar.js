export default function ElementBar({ height }) {
  const style = {
    height: `${height}%`,
  };

  return <div className="bar" style={style}></div>;
}
