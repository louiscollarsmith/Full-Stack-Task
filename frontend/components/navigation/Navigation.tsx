import { ShoppingCartOutlined, ShoppingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

interface NavigationProps {
  onCartClick: () => void;
}

const Navigation = (props: NavigationProps) => {
  return (
    <div className="flex items-center justify-between h-20 w-full border-b px-40">
      <h1 className="font-bold text-xl">Louis / Abhi</h1>
      <ShoppingCartOutlined
        className="text-3xl hover:text-blue-500 cursor-pointer"
        onClick={props.onCartClick}
      />
    </div>
  );
};
export default Navigation;
