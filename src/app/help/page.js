import Link from "next/link";
import Login from "@/app/components/Login_comp/Login";

const Help = () => {
  return (
    <>
      <h1>help </h1>
      <Link href={"/"}>Click to return</Link>
      <Login fromParent={"sent from help page"} />
    </>
  );
};
export default Help;