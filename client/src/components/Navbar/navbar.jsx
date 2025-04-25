import { Fragment, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ShoppingCartIcon, UserIcon, BellIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/', current: true },
 // { name: 'Products', href: '/products', current: false },
  { name: 'About', href: '/about', current: false },
  { name: 'Contact', href: '/contact', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  // Determine which nav item is active based on current path
  const navWithActive = navigation.map(item => ({
    ...item,
    current: location.pathname === item.href
  }));

  return (
    <Disclosure as="nav" className="bg-gradient-to-r from-green-500 to-green-600 shadow-md">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-20 items-center justify-between">
              {/* Hamburger Menu (Mobile Only) */}
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              {/* Left Side: Logo + Nav Links */}
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                {/* Logo */}
                <div className="flex flex-shrink-0 items-center">
                  <Link to="/" className="flex items-center">
                    <span className="text-white font-bold text-2xl tracking-tight">
                      Agri<span className="text-green-900">Mart</span>
                    </span>
                  </Link>
                </div>

                {/* Navigation links */}
                <div className="hidden sm:ml-8 sm:block">
                  <div className="flex space-x-4">
                    {navWithActive.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-green-700 text-white'
                            : 'text-white hover:bg-green-600 hover:text-white',
                          'rounded-md px-4 py-2 text-sm font-medium transition-all duration-200'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Side: Search, Cart, Notifications, Profile */}
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 gap-2">
                {/* Search */}
                <div className="relative hidden md:block">
                  {isSearchOpen ? (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 flex">
                      <input
                        type="text"
                        placeholder="Search products..."
                        className="w-64 rounded-l-full py-2 px-4 focus:outline-none"
                      />
                      <button 
                        className="bg-green-700 text-white rounded-r-full px-4 py-2 hover:bg-green-800 transition-colors"
                      >
                        <MagnifyingGlassIcon className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsSearchOpen(true)}
                      className="rounded-full bg-green-600 p-2 text-white hover:bg-green-700 transition-colors"
                    >
                      <MagnifyingGlassIcon className="h-5 w-5" />
                    </button>
                  )}
                </div>

                {/* Cart */}
                <Link
                  to="/cart"
                  className="relative rounded-full bg-green-600 p-2 text-white hover:bg-green-700 transition-colors"
                >
                  <span className="sr-only">View cart</span>
                  <ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
                    3
                  </span>
                </Link>

                {/* Notifications */}
                <button
                  type="button"
                  className="rounded-full bg-green-600 p-2 text-white hover:bg-green-700 transition-colors"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-5 w-5" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-2">
                  <div>
                    <Menu.Button className="flex rounded-full bg-green-700 text-sm focus:outline-none focus:ring-2 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-9 w-9 rounded-full object-cover border-2 border-green-300"
                        src="/profile.png"
                        alt="User profile"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/profile"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'flex items-center px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            <UserIcon className="mr-2 h-5 w-5 text-gray-500" />
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/orders"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'flex items-center px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            <svg className="mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 17l3 3 3-3"></path>
                              <path d="M9 10l3-3 3 3"></path>
                              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                            </svg>
                            Orders
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/settings"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'flex items-center px-4 py-2 text-sm text-gray-700'
                            )}
                          >
                            <svg className="mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="3"></circle>
                              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                            </svg>
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <div className="border-t border-gray-200 my-1"></div>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? 'bg-gray-100' : '',
                              'flex items-center px-4 py-2 text-sm text-red-600'
                            )}
                          >
                            <svg className="mr-2 h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                              <polyline points="16 17 21 12 16 7"></polyline>
                              <line x1="21" y1="12" x2="9" y2="12"></line>
                            </svg>
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navWithActive.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-green-700 text-white'
                      : 'text-white hover:bg-green-600 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
              <div className="pt-4 pb-3 border-t border-green-700">
                <div className="flex items-center px-3">
                  <div className="flex-shrink-0">
                    <img className="h-10 w-10 rounded-full" src="/profile.png" alt="User" />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">John Doe</div>
                    <div className="text-sm font-medium text-green-200">john@example.com</div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  <Disclosure.Button
                    as={Link}
                    to="/profile"
                    className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-green-600"
                  >
                    Your Profile
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/orders"
                    className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-green-600"
                  >
                    Orders
                  </Disclosure.Button>
                  <Disclosure.Button
                    as={Link}
                    to="/settings"
                    className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-green-600"
                  >
                    Settings
                  </Disclosure.Button>
                  <Disclosure.Button
                    as="button"
                    className="block rounded-md px-3 py-2 text-base font-medium text-white hover:bg-green-600 w-full text-left"
                  >
                    Sign out
                  </Disclosure.Button>
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;