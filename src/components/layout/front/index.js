import Header from "./Header";

const FrontLayout = ({ children }) => {
  return (
    <>
   
      <Header />
      {children}
    </>
  );
};

export default FrontLayout;
