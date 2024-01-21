import Form from "@/components/form";
import Header from "@/components/header";

const Page = () => {
  return (
    <>
      <div className="relative">
        <Header />
        <div className="top-gradient"></div>
        <div className="py-14 md:py-20">
          <h1 className="text-2xl md:text-4xl text-center px-8">
            Instantly share code, notes, and snippets.
          </h1>
        </div>
      </div>
      <main>
        <div className="max-w-screen-lg px-4 md:px-8 pb-8 mx-auto">
          <Form />
        </div>
      </main>
    </>
  );
};

export default Page;
