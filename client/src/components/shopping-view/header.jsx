import { Gem, Headset, HousePlug, LogOut, Menu, Search, ShoppingCart, UserCog } from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Logo from './../../assets/logo.png'
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { logoutUser } from "@/store/auth-slice";
// import UserCartWrapper from "./cart-wrapper";
import { useEffect, useRef, useState } from "react";
// import { fetchCartItems } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";
import './css/shop.css'

function MenuItems({ onClose }) {

  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();



  function handleNavigate(getCurrentMenuItem) {
    // close the sheet if callback provided
    onClose && onClose();

    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
        getCurrentMenuItem.id !== "products" &&
        getCurrentMenuItem.id !== "search"
        ? {
          origin: [getCurrentMenuItem.id],
        }
        : null;

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
        new URLSearchParams(`?origin=${getCurrentMenuItem.id}`)
      )
      : navigate(getCurrentMenuItem.path);
  }

  return (
    <nav className="flex flex-col mb-3 lg:mb-0 lg:items-center gap-6 lg:flex-row">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        // <Label
        //   onClick={() => handleNavigate(menuItem)}
        //   className="text-md font-medium cursor-pointer shop-heading-font"
        //   key={menuItem.id}
        // >
        //   {menuItem.label}
        // </Label>
        <Label
          onClick={() => handleNavigate(menuItem)}
          key={menuItem.id}
          className="
    relative
    inline-block
    cursor-pointer
    shop-heading-font
    font-medium
    text-md

    after:content-['']
    after:absolute
    after:left-0
    after:bottom-0
    after:h-0.5
    after:bg-current
    after:w-0
    after:transition-all
    after:duration-300
    
    hover:after:w-full
  "
        >
          {menuItem.label}
        </Label>

      ))}
    </nav>
  );
}

function HeaderRightContent() {
  // const { user } = useSelector((state) => state.auth);
  // const { cartItems } = useSelector((state) => state.shopCart);
  // const [openCartSheet, setOpenCartSheet] = useState(false);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  // function handleLogout() {
  //   dispatch(logoutUser());
  // }

  // useEffect(() => {
  //   dispatch(fetchCartItems(user?.id));
  // }, [dispatch]);

  // console.log(cartItems, "sangam");

  return (
    <div className="flex lg:items-center lg:flex-row flex-col gap-4">
      {/* <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}> */}
      <Button
        // onClick={() => setOpenCartSheet(true)}
        // variant="outline"
        size="icon"
        className="relative"
      >
        <ShoppingCart className="w-6 h-6" />
        <span className="absolute top-[-5px] right-[2px] font-bold text-sm">
          {/* {cartItems?.items?.length || 0} */}
        </span>
        <span className="sr-only">User cart</span>
      </Button>
      {/* <UserCartWrapper
          setOpenCartSheet={setOpenCartSheet}
          cartItems={
            cartItems && cartItems.items && cartItems.items.length > 0
              ? cartItems.items
              : []
          }
        />
      </Sheet> */}

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black">
            <AvatarFallback className="bg-black text-white font-extrabold">
              {/* {user?.userName[0].toUpperCase()} */} SM
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" className="w-56">
          <DropdownMenuLabel>Logged in as SM {/* {user?.userName} */}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem /* onClick={() => navigate("/shop/account")} */ >
            <UserCog className="mr-2 h-4 w-4" />
            Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem /* onClick={handleLogout} */ >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function ShoppingHeader() {

  // const { isAuthenticated } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  console.log(open, "open")
  
  const bottomNavRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY < 100) {
        // back at top of page → normal flow
        setIsFixed(false);
        return;
      }

      if (bottomNavRef.current) {
        const { top } = bottomNavRef.current.getBoundingClientRect();
        // once its top would go off‑screen, fix it
        setIsFixed(top <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const middleNavRef = useRef(null);
  const [isFixedMid, setIsFixedMid] = useState(false);

  useEffect(() => {
    const THRESHOLD = 20; // px from top when it should switch back

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const width  = window.innerWidth;

      // only enable on small & medium (under lg / 1024px)
      if (width >= 1024) {
        setIsFixedMid(false);
        return;
      }

      if (scrollY < THRESHOLD) {
        setIsFixedMid(false);
        return;
      }

      if (middleNavRef.current) {
        const { top } = middleNavRef.current.getBoundingClientRect();
        setIsFixedMid(top <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll); // recalc on resize
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-screen border-b bg-background">
      <div className="h-[45px] bg-[#F3F3BF] text-center shop-heading-font uppercase flex md:flex lg:flex xl:flex items-center justify-center text-[1rem] md:text-lg lg:text-lg font-bold">Handpicked Natural Gemstones | Trusted by 10K+</div>

      <div ref={middleNavRef} className={`
          flex h-25 items-center justify-between
          px-4 md:px-6

          transition-transform duration-300 ease-out z-40
          ${isFixedMid
            ? 'fixed top-0 left-0 w-full bg-background shadow-md'
            : 'relative'}
          lg:relative
        `}>
        <div className="flex items-center gap-2 lg:ml-10">
          <div className="sm:block md:flex lg:flex gap-5 items-center justify-center space-x-2 text-gray-600">

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Menu className="h-6 w-6" onClick={() => setOpen(false)} />
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs">
                <p className="ms-5 mt-5">
                  <MenuItems onClose={() => setOpen(false)} />
                </p>
              </SheetContent>
            </Sheet>

            <div className="hidden md:flex lg:flex gap-3">
              <Headset className="w-7 h-7" />
              <div className="leading-tight">
                <p className="text-[#35AC75] font-bold">+91 99838 86963</p>
                <p className="text-sm text-gray-500 hidden md:block lg:block xl:block">Contact Us</p>
              </div>
            </div>
          </div>
        </div>
        <Link to={'/shop/home'}><img data-aos="fade-right" src={Logo} alt="logo" className="cursor-pointer w-29 h-19 md:w-40 md:h-25 lg:w-40 lg:h-25" srcset="" /></Link>
        <div className="flex sm:space-x-3 md:space-x-8 lg:space-x-8">
          {/* Search */}
          <Link to={'/shop/search'}>
            <button
              className="
            flex flex-col items-center
            p-3 rounded-lg
            transition
            hover:bg-gray-100
            focus:outline-none focus:ring-2 focus:ring-green-300
          "
            >
              <Search className="w-7 h-7 text-[#35AC75] transition-transform group-hover:scale-110" />
              <span className="mt-1 text-sm font-medium text-gray-700">Search</span>
            </button></Link>
          {/* Products */}
          <Link to={'/shop/listing'}>
            <button
              className="
            flex flex-col items-center
            p-3 rounded-lg
            transition
            hover:bg-gray-100
            focus:outline-none focus:ring-2 focus:ring-green-300
          "
            >
              <Gem className="w-7 h-7 text-[#35AC75] transition-transform group-hover:scale-110" />
              <span className="mt-1 text-sm font-medium text-gray-700">Products</span>
            </button></Link>
        </div>
      </div>

      <div
      ref={bottomNavRef}
        className={`
          hidden lg:flex h-16 items-center justify-between
          px-4 md:px-6 bg-background shadow-md
          transition-transform duration-300 ease-out z-50

          ${isFixed ? "fixed top-0 left-0 w-full" : "relative"}
        `}
      >
        <Link to="/shop/home" className="flex items-center gap-2">
        </Link>

        <div className="hidden lg:block">
          <MenuItems />
        </div>

        <div className="hidden lg:block">
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;