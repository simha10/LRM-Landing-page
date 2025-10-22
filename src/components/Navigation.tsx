import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Info, 
  Building, 
  Folder, 
  Eye, 
  Mail, 
  Menu, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { name: "Home", href: "#hero", icon: Home },
  { name: "About", href: "#about", icon: Info },
  { name: "Services", href: "#services", icon: Building },
  { name: "Projects", href: "#projects", icon: Folder },
  { name: "Vision", href: "#vision", icon: Eye },
  { name: "Contact", href: "#contact", icon: Mail },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const location = useLocation();
  const isMobile = useIsMobile();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle scroll to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.href.slice(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const height = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Adjust for fixed header
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  const handleNavClick = (href: string) => {
    const sectionId = href.slice(1);
    
    if (location.pathname !== "/") {
      // If we're not on the home page, navigate to home first
      window.location.href = `/${href}`;
    } else {
      // If we're on the home page, scroll to section
      scrollToSection(sectionId);
      // Close mobile menu after navigation
      if (isMobile) {
        setIsOpen(false);
      }
    }
  };

  const NavContent = () => (
    <nav className="flex flex-col h-full pt-4">
      <div className="flex flex-col space-y-2 px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const sectionId = item.href.slice(1);
          const isActive = activeSection === sectionId;
          
          return (
            <Button
              key={item.name}
              variant={isActive ? "secondary" : "ghost"}
              className={`justify-start px-4 py-3 rounded-lg text-left font-libre-baskerville transition-all duration-300 ${
                isActive 
                  ? "bg-gradient-to-r from-accent to-secondary text-accent-foreground font-bold shadow-lg" 
                  : "text-foreground hover:bg-accent/20 hover:text-accent-foreground"
              }`}
              onClick={() => handleNavClick(item.href)}
            >
              <Icon className="mr-3 h-5 w-5" />
              {item.name}
            </Button>
          );
        })}
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop Navigation */}
      <div className="hidden md:flex fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-lg">
        <div className="container flex items-center justify-between h-20 px-6">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-libre-baskerville font-bold text-2xl tracking-tight bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              LRM Consultants
            </span>
          </Link>
          
          <div className="flex items-center space-x-2">
            {navItems.map((item) => {
              const sectionId = item.href.slice(1);
              const isActive = activeSection === sectionId;
              
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  size="sm"
                  className={`px-4 py-2 rounded-full font-libre-baskerville font-medium transition-all duration-300 nav-link ${
                    isActive 
                      ? "bg-gradient-to-r from-accent/20 to-secondary/20 text-accent-foreground font-bold" 
                      : "text-foreground hover:bg-accent/10"
                  }`}
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.name}
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border shadow-lg">
        <div className="container flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center space-x-2">
            <span className="font-libre-baskerville font-bold text-xl tracking-tight bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
              LRM Consultants
            </span>
          </Link>
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0 w-64 bg-gradient-to-b from-background to-card border-l border-accent/30">
              <div className="flex flex-col h-full">
                <div className="border-b border-border p-4 bg-gradient-to-r from-accent/10 to-secondary/10">
                  <span className="font-libre-baskerville font-bold text-xl bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
                    LRM Consultants
                  </span>
                </div>
                <NavContent />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Spacer to prevent content overlap with fixed navbar */}
      <div className="h-20 md:h-20"></div>
    </>
  );
};

export default Navigation;