'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useActionContext } from '@/context/actionContext';
import { useMarkerContext } from '@/context/markerContext';
import { useRouter } from 'next/navigation';

import { Map, Pen, House, Heart, User } from 'lucide-react';

const list = [
  {
    title: 'Map',
    href: '/maps',
    icon: (state: string, pathname?: string) => (
      <Map strokeWidth={state === 'false' && pathname === '/maps' ? 2.5 : 2} />
    ),
  },
  {
    title: 'Post',
    href: '/posts',
    icon: (state: string, _pathname?: string) => (
      <Pen strokeWidth={state === 'true' ? 2.5 : 2} />
    ),
  },
  {
    title: 'Home',
    href: '/',
    icon: (pathname: string) => (
      <House strokeWidth={pathname === '/' ? 2.5 : 2} />
    ),
  },
  {
    title: 'Favorite',
    href: '/favorites',
    icon: (pathname: string) => (
      <Heart strokeWidth={pathname === '/favorites' ? 2.5 : 2} />
    ),
  },
  {
    title: 'User',
    href: '/users/me',
    icon: (pathname: string) => (
      <User strokeWidth={pathname === '/users/me' ? 2.5 : 2} />
    ),
  },
];

export default function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const { markerState, setMarkerState } = useMarkerContext();
  const { buttonState, toggleButtonState, disabledButtonState } =
    useActionContext();

  function toggle() {
    router.push('/maps');
    toggleButtonState();
  }

  function togglePage() {
    if (markerState) {
      markerState.remove();
      setMarkerState(null);
    }

    disabledButtonState();
  }

  return (
    <footer className="flex max-h-fit justify-center bg-white px-5 text-center text-zinc-900 md:hidden">
      <div className="flex w-full max-w-md justify-between p-3">
        {list.map((item, index) =>
          item.title === 'Post' || item.title === 'Map' ? (
            <button
              key={index}
              onClick={item.title === 'Map' ? disabledButtonState : toggle}
              className="cursor-pointer rounded-full bg-white p-2 px-4"
            >
              {item.icon(buttonState ? 'true' : 'false', pathname)}
            </button>
          ) : (
            <Link
              key={index}
              href={item.href}
              onClick={togglePage}
              className="cursor-pointer rounded-full bg-white p-2 px-4"
            >
              {item.icon(pathname)}
            </Link>
          ),
        )}
      </div>
    </footer>
  );
}
