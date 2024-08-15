'use client';
import { Cat, Dog } from 'lucide-react';
import dynamic from 'next/dynamic';
const Map = dynamic(() => import('@/components/maps'), { ssr: false });

export default function PostDetails(props: any) {
  return (
    <div className="relative z-[9998] flex h-full flex-col bg-stone-200">
      <Map pinnedLocation={props.post.location} />
      <div className="absolute bottom-0 left-0 z-[99999] flex w-full flex-col">
        <div className="h-1/2 overflow-scroll p-5 px-5">
          <div className="rounded-xl bg-white p-5">
            <div className="max-w-full">
              <h1 className="mb-4 text-2xl font-bold">{props.post.name}</h1>

              <p className="py-2"> {props.post.description}</p>
              <div className="flex">
                <p className="px-2">一緒にに行けるどうぶつ</p>

                {props.post.animals.includes('犬') ? <Dog /> : ''}
                {props.post.animals.includes('猫') ? <Cat /> : ''}
              </div>

              <p className="py-2"> {props.post.keywords}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}