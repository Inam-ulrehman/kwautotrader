import {
  FaHome,
  FaEnvelope,
  FaRegAddressBook,
  FaDollarSign,
  FaProductHunt,

  // FaSignInAlt,
} from 'react-icons/fa'
// ========logo =========== //
export const logo =
  'https://res.cloudinary.com/inam6530/image/upload/v1667486202/inamwebsolutions/Inam_n9s4i4.svg'
// ========Nav Bar=========== //

export const navbar = [
  { id: 1, path: '/', title: 'Home', icon: <FaHome /> },
  { id: 2, path: '/about', title: 'About', icon: <FaEnvelope /> },
  { id: 3, path: '/products', title: 'Products', icon: <FaProductHunt /> },
  { id: 4, path: '/prices', title: 'Pricing', icon: <FaDollarSign /> },
  { id: 5, path: '/contact', title: 'Contact', icon: <FaRegAddressBook /> },
]

// =======Dashboard========
export const dashboardNavLink = [
  { id: 1, title: 'dashboard', path: '/dashboard' },
  { id: 2, title: 'Orders', path: '/dashboard/orders' },
  { id: 3, title: 'Profile', path: '/dashboard/profile' },
  { id: 4, title: 'Change password', path: '/dashboard/changepassword' },
]

// ======== Stripe  ==========

export const StripePaymentStatus =
  'http://localhost:3000/dashboard/paymentstatus'
