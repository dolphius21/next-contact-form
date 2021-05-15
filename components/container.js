const Container = ({ children, ...props }) => {
  return (
    <div className="nes-container is-rounded" id="max-width">
      {children}
    </div>
  );
};

export default Container;
