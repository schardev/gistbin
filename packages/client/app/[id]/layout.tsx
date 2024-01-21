import Header from "@/components/header";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="border-b border-b-background-muted">
        <Header />
      </div>
      {children}
    </>
  );
};

export default Layout;
